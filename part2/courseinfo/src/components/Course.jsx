import { React } from "react";

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => total += part.exercises, 0)
    return (
        <p><b>Number of exercises {sum}</b></p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => parts.map((part, i) => <Part key={i} part={part} />)


const Course = (course) => {
    return (
        <div>
            <Header name={course.course.name} />
            <Content parts={course.course.parts} />
            <Total parts={course.course.parts} />
        </div>
    )
}

export default Course