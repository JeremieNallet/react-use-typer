import React from "react";
import useTyper from "typer";

const App = () => {
    const myAnimatedText = useTyper(["First.", "Second.", "third. Etc, ..."], {
        typeSpeed: 2,
        eraseSpeed: 50,
        typeDelay: 1000,
        eraseDelay: 1000,
        once: false
    });
    return <div>{myAnimatedText}</div>;
};
export default App;
