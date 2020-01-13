import { useState, useEffect, useCallback } from "react";
import { isEmpty, sleep, speed, getAnyText } from "./utils";

const useTyper = (
    words = [""],
    { typeSpeed = 100, eraseSpeed = 50, eraseDelay = 1000, typeDelay = 1000, once = false }
) => {
    const [visibleText, setVisibleText] = useState("");
    const [loop, setLoop] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [isArray, setIsArray] = useState(false);

    const animateFrame = useCallback(async ms => {
        const startTime = window.performance.now();
        while (window.performance.now() - startTime <= speed(ms)) {
            await new Promise(r => window.requestAnimationFrame(r));
        }
    }, []);

    useEffect(() => {
        let wordIndex = loop % words.length;
        const currentWord = getAnyText(words)[wordIndex];
        setIsArray(words instanceof Array ? true : false);

        const typer = async () => {
            await animateFrame(typeSpeed);
            setVisibleText(currentWord.substring(0, visibleText.length + 1));

            if (!deleting && visibleText === currentWord) {
                await sleep(typeDelay);
                setDeleting(once ? false : true);
            }
        };

        const eraser = async () => {
            await animateFrame(eraseSpeed);
            setVisibleText(currentWord.substring(0, visibleText.length - 1));

            if (deleting && isEmpty(visibleText)) {
                await sleep(eraseDelay);
                setDeleting(false);
                setLoop(loop => (isArray ? loop + 1 : (loop = 0)));
            }
        };

        deleting ? eraser() : typer();

        return () => [sleep, animateFrame];
    }, [
        animateFrame,
        deleting,
        eraseDelay,
        eraseSpeed,
        isArray,
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
