const Search = ({ nameFilter, handleFilterChange }) => {
    return (
        <div>Search: <input value={nameFilter} onChange={handleFilterChange} /></div>
    )
}

export default Search