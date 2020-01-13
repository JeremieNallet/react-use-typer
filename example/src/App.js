import React from "react";
import useTyper from "typer";

const App = () => {
    const myText = useTyper(["hello", "itsme"], { typeSpeed: 1 });
    return <div>{myText}</div>;
};
export default App;
