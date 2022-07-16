const Persons = ({ personsFiltered, deletePerson }) => {
    return (
        <ul>
            {personsFiltered.map(person =>
                <li>
                    {person.name}: {person.number}
                    <button onClick={() => deletePerson(person.id)}>x</button>
                </li>
            )}
        </ul>
    )
}

export default Persons