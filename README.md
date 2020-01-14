# react-use-typer

[![NPM](https://img.shields.io/npm/v/typer.svg)](https://www.npmjs.com/package/use-typer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

(https://media.giphy.com/media/Q8IfctHNsDNzDbvKan/giphy.gif)

## Install

```bash
npm install --save use-typer
```

## Usage

```jsx
import React from "react";
import useTyper from "use-typer";

const MyComponent = () => {
    const myAnimatedText = useTyper(["First.", "Second.", "third. Etc, ..."], {
        typeSpeed: 20,
        eraseSpeed: 50,
        typeDelay: 1000,
        eraseDelay: 1000
    });
    return <div>{myAnimatedText}</div>;
};
```

or :

```jsx
const MyComponent = () => {
    const myAnimatedText = useTyper("Single sentence or word", {
        ...my options,
        once: true // Will be typed once and not erase itself.
    });
    return <div>{myAnimatedText}</div>;
};
```

### Options

| Name       | Type        | Default value | Is Required | Description                                                           |
| ---------- | ----------- | ------------- | ----------- | --------------------------------------------------------------------- |
| [ '...' ]  | string      | [ ] or " "    | Yes         | An array or a string of words you want to be displayed.               |
| typeSpeed  | number (ms) | 100           | No          | Speed at which letters will be typed.                                 |
| eraseSpeed | number (ms) | 50            | No          | Speed at which letters will be erased.                                |
| typeDelay  | number (ms) | 1000          | No          | Delay between words before begins typing.                             |
| eraseDelay | number (ms) | 1000          | No          | Delay between words before begins erasing.                            |
| once       | boolean     | false         | No          | If true the string or the first word in the array will be typed once. |

## License

MIT © [JeremieNallet](https://github.com/JeremieNallet)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
