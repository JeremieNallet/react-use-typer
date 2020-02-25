import { useState, useEffect, useRef } from "react";
const useTyper = (
    words = [""],
    {
        typeSpeed = 100,
        eraseSpeed = 50,
        eraseDelay = 1000,
        typeDelay = 1000,
        once = false
    }
) => {
    const [visibleText, setVisibleText] = useState("");
    const [loop, setLoop] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const sleepCleanUp = useRef();
    const rAFcleanUp = useRef();

    const getAnyText = text => (typeof text === "string" ? [text] : [...text]);

    const sleep = async ms => {
        await new Promise(res => (sleepCleanUp.current = setTimeout(res, ms)));
    };

    const animateFrame = async ms => {
        const startTime = window.performance.now();
        while (window.performance.now() - startTime <= ms) {
            await new Promise(resolve => {
                rAFcleanUp.current = window.requestAnimationFrame(resolve);
            });
        }
    };

    useEffect(() => {
        let wordIndex = loop % words.length;
        const currentWord = getAnyText(words)[wordIndex];

        const typeText = async () => {
            await animateFrame(typeSpeed);
            setVisibleText(currentWord.substring(0, visibleText.length + 1));

            if (!isDeleting && visibleText === currentWord) {
                await sleep(eraseDelay);
                setIsDeleting(!once);
            }
        };

        const eraseText = async () => {
            await animateFrame(eraseSpeed);
            setVisibleText(currentWord.substring(0, visibleText.length - 1));

            if (isDeleting && visibleText === "") {
                await sleep(typeDelay);
                setIsDeleting(false);
                setLoop(loop => words instanceof Array && loop + 1);
            }
        };

        isDeleting ? eraseText() : typeText();

        return () => {
            window.cancelAnimationFrame(rAFcleanUp.current);
            clearTimeout(sleepCleanUp.current);
        };
    }, [
        isDeleting,
        eraseDelay,
        eraseSpeed,
        loop,
        once,
        typeDelay,
        typeSpeed,
        visibleText,
        words
    ]);

    return visibleText;
};

export default useTyper;
