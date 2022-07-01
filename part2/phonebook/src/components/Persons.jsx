const Persons = ({ personsFiltered }) => {
    return (
        <ul>
            {personsFiltered.map(person =>
                <li>{person.name}: {person.number}</li>
            )}
        </ul>
    )
}

export default Persons