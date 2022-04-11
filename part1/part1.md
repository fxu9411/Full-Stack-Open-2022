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

- The official name of the JavaScript standard is ECMAScript
- Today, the most popular way to do the transpiling is by using Babel. Transpilation is automatically configured in React applications created with create-react-app.
- Node.js is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine and works practically anywhere

### Variables

- const defines a constant which cannot be changed after
- let defines a normal variable

### Arrays

- Example:
  ```js
  const t = [1, -1, 3];
  t.push(5);
  console.log(t.length); // 4 is printed
  console.log(t[1]); // -1 is printed
  t.forEach((value) => {
    console.log(value); // numbers 1, -1, 3, 5 are printed, each to own line
  });
  ```
- The content of array can be modified even though it is defined as a const; because it is an object so the variable always points to the same object (head of memory address)
- `forEach` receives a function defined using the array syntax as a parameter
- `push` is used to add more element but `concat` is preferred which creates and returns a new array and copy the elements. `const t2 = t.concat(5)`
- `map` method: `const m1 = t.map(value => value * 2)`
- Individual items of an array are easy to assign to variables with the help of the **destructuring assignment**
  ```
  const t = [1, 2, 3, 4, 5]
  const [first, second, ...rest] = t
  console.log(first, second)  // 1, 2 is printed
  console.log(rest)          // [3, 4, 5] is printed
  ```

### Objects

- Define a new object with object literals method
  ```js
  const object1 = {
    name: "Arto Hellas",
    age: 35,
    education: "PhD",
  };
  ```
- The properties of an object are referenced by using the "dot" notation, or by using brackets
  ```js
  console.log(object1.name); // Arto Hellas is printed
  const fieldName = "age";
  console.log(object1[fieldName]); // 35 is printed
  ```
- Set the properties through both methods as well
  ```js
  object1.address = "Helsinki";
  object1["secret number"] = 12341;
  ```

### Functions

- Define an arrow function
  ```js
  const sum = (p1, p2) => {
    console.log(p1);
    console.log(p2);
    return p1 + p2;
  };
  const result = sum(1, 5);
  console.log(result);
  ```
- For single express, the braces are not needed
- Other methods to define a function

  ```js
  function product(a, b) {
    return a * b;
  }
  //or
  const average = function (a, b) {
    return (a + b) / 2;
  };
  ```

### Object method and "this"

- Array functions and functions defined using the `function` keyword vary substantially when it comes to how they behave with respect to the keyword `this`, which refers to the object itself.

```js
const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
  greet: function () {
    console.log("hello, my name is " + this.name);
  },
  doAddition: function (a, b) {
    console.log(a + b);
  },
};

arto.doAddition(1, 4); // 5 is printed

const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15); // 25 is printed
```

- Define a function in an object method then call it directly or store the method reference in a variable

```js
arto.greet(); // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet;
referenceToGreet(); // prints "hello, my name is undefined"
```

- Call the method through the reference, the method will lose the knowledge of what the original `this` was.
- When call the method through a reference the value of `this` becomes the so-called **global object**
- Several mechanisms by which the original `this` can be preserved

```js
setTimeout(arto.greet.bind(arto), 1000);
```

### Class

- Very similar to Java Class

## c. Component State, Event Handler

---

### Component Helper Function

```javascript
const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};
```

- The helper function `bornYear` is defined inside of another function that defines the behavior of our component

### Destructuring

- Previous example we use `props.name` and `props.age` or we can streamline the component by assignning the values of the properties into variables
- Best way is to destructure

```js
const Hello = (props) => {
  const { name, age } = props;
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};
```

- One step further

```js
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};
```

- Instead of assigning the entire props object into a variable called props, and then assigning its properties into the variables `name` and `age`, we assign the value of properties directly into variables by destructuring the props object that is passed to the component function as a parameter

### Page re-rendering

- We can call `refresh()` to re-render the page but it's not the optimal way

### Stateful Component

```js
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  setTimeout(() => setCounter(counter + 1), 1000);

  return <div>{counter}</div>;
};
```

- The function body that defines the component begins with the function call `useState(0)`
- It will add `state` to the component and renders it initialized with the value of zero
- `[counter, setCounter]` is the destructuring assignment syntax
- Refresh every 1000 ms and calls `setCounter` which will increse counter by 1

### Event Handling

```js
const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
    </div>
  );
};
```

- or we can change it to
  ```js
  <button onClick={() => setCounter(counter + 1)}>plus</button>
  ```

### Event Handler is a function

- If we try to define the event handler like the following, it would break the app

  ```js
  <button onClick={setCounter(counter + 1)}>plus</button>
  ```

- An event handler is supposed to be either a function or a function reference
- With `{setCounter(counter + 1)}`, the event handler is actually a function call.
- Reason: When React renders the component for the first time, it executes the function call `setCounter(0+1)`, and changes the value of the component's state to 1. It will cause the component to be re-rendered -> Execute the setCounter again -> Infinite Loop

### Passing state to child components

```js
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text='plus' />
      <Button onClick={setToZero} text='zero' />
      <Button onClick={decreaseByOne} text='minus' />
    </div>
  );
};
```

- The event handler is passed to the `Button` component through the `onClick` prop.

### Changes in state cause re-rendering

1. When the application starts, the code in App is executed. This code uses a useState hook to create the application state, setting an initial value of the variable counter. This component contains the Display component - which displays the counter's value, 0 - and three Button components. The buttons all have event handlers, which are used to change the state of the counter.
2. When one of the buttons is clicked, the event handler is executed. The event handler changes the state of the App component with the setCounter function. **Calling a function which changes the state causes the component to rerender.**
3. So, if a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is rerendered. This causes its subcomponents Display and Button to also be re-rendered. Display receives the new value of the counter, 1, as props. The Button components receive event handlers which can be used to change the state of the counter.

### Refactoring the components

- From
  ```js
  const Display = (props) => {
    return <div>{props.counter}</div>;
  };
  ```
  To
  ```js
  const Display = ({ counter }) => {
    return <div>{counter}</div>;
  };
  ```
- From
  ```js
  const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
  };
  ```
  To
  ```js
  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
  );
  ```

## d. A more complex state, debugging React apps

---

### A note on React version

### Complex State

- If we have two states: `left` and `right`

  ```js
  const [left, setLeft]...
  const [right, setRight]...
  ```

  then we can simplify it to

  ```js
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right,
    };
    setClicks(newClicks);
  };

  const handleRightClick = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
  };
  ```

  Then we can simplify it to

  ```js
  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    };
    setClicks(newClicks);
  };

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
  };
  ```

- `{...clicks}` creates a new object that has copies of all of the properties of the `clicks` object
- Final version:

  ```js
  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });

  const handleRightClick = () =>
    setClicks({ ...clicks, right: clicks.right + 1 });
  ```

- but this one will not work:
  ```js
  const handleLeftClick = () => {
    clicks.left++;
    setClicks(clicks);
  };
  ```
  because **mutate the statement directly is forbidden**

### Handling arrays
