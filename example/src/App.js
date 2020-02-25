import React from "react";
import useTyper from "typer";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const Route1 = () => {
    const myAnimatedText = useTyper("hello", {
        typeSpeed: 100,
        eraseSpeed: 40,
        typeDelay: 1000,
        eraseDelay: 1000,
        once: false
    });
    return <div>{myAnimatedText}</div>;
};

const Route2 = () => {
    const myAnimatedText = useTyper("hello2", {
        typeSpeed: 100,
        eraseSpeed: 40,
        typeDelay: 1000,
        eraseDelay: 1000,
        once: false
    });
    return <div>{myAnimatedText}</div>;
};

const App = () => {
    return (
        <BrowserRouter>
            <Link to="/1">Hello1</Link>
            <Link to="/2">Hello2</Link>
            <Switch>
                <Route path="/1" component={Route1}></Route>
                <Route path="/2" component={Route2}></Route>
            </Switch>
        </BrowserRouter>
    );
};
export default App;
