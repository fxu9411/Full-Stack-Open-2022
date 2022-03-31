# Part 1 - Introduction to React

## a. Introduction to React

---

### Component

- The file `App.js` defines a React component with the name App.
- The line in `index.js` renderes the contents into the div element
  ```js
  ReactDOM.render(<App />, document.getElementById("root"));
  ```
- `const App` defines a function which returns a div element
- Any JavaScript code within the curly braces is evaluated and the result of this evaluation is embedded into the defined place in the HTML produced by the component.

### JSX

- JSX returned by React components is compiled into JavaScript
- JSX is much like HTML but JSX can embed dynamic content by writing appropriate JavaScript within curly braces

### Multiple Components

- Core philosophy of React is composing applications from many specialized reusable components
- Define another component and have it inside another component

### props: Passing data to components

```js
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  );
};
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' />
      <Hello name='Daisy' />
    </div>
  );
};
```

- The function defining component has a parameter _props_.
- The parameter receives an object, which has fields corresponding to all the "props" the user of component defines

### Some Notes

- React components names must be capitalized

## b. JavaScript

---
