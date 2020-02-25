import React from "react";
import useTyper from "typer";

const App = () => {
    const myAnimatedText = useTyper("hello", {
        typeSpeed: 100,
        eraseSpeed: 40,
        typeDelay: 1000,
        eraseDelay: 1000,
        once: false
    });
    return <div>{myAnimatedText}</div>;
};
export default App;
