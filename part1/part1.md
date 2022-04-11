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
