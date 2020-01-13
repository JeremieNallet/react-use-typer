export const sleep = ms => new Promise(r => (ms !== null ? setTimeout(r, ms) : r()));

export const isEmpty = str => str !== null && str.trim() === "";

export const verifyValue = num => {
    if (typeof num !== "number") throw new Error("Expected integer.");
    if (num >= 1 && num <= 1000) return num;
    else throw new Error("Expected integer between 1 and 1000 milliseconds.");
};

export const speed = ms => verifyValue(ms);

export const getAnyText = text => (typeof text === "string" ? [text] : [...text]);
