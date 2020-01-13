import { useState, useEffect, useCallback, useRef } from "react";
import { speed, getAnyText } from "./utils";

const useTyper = (
    words = [""],
    { typeSpeed = 100, eraseSpeed = 50, eraseDelay = 1000, typeDelay = 1000, once = false }
) => {
    const [visibleText, setVisibleText] = useState("");
    const [loop, setLoop] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [isArray, setIsArray] = useState(false);
    const clearSleep = useRef();

    const animateFrame = useCallback(async ms => {
        const startTime = window.performance.now();
        while (window.performance.now() - startTime <= speed(ms)) {
            await new Promise(r => window.requestAnimationFrame(r));
        }
    }, []);

    useEffect(() => {
        const sleep = ms => new Promise(r => (clearSleep.current = setTimeout(r, ms)));

        setIsArray(words instanceof Array ? true : false);

        let wordIndex = loop % words.length;
        const currentWord = getAnyText(words)[wordIndex];

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

            if (deleting && visibleText === "") {
                await sleep(eraseDelay);
                setDeleting(false);
                setLoop(loop => (isArray ? loop + 1 : (loop = 0)));
            }
        };

        deleting ? eraser() : typer();

        return () => clearTimeout(clearSleep.current);
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
