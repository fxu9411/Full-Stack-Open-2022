import Weather from "./Weather"

const Country = ({ countryFiltered }) => {
    if (countryFiltered.length === 1) {
        const n = countryFiltered[0].languages.length
        return (
            <div>
                <h1>{countryFiltered[0].name.official}</h1>
                <p>Capital: {countryFiltered[0].capital}</p>
                <p>Area: {countryFiltered[0].area}</p>
                <h2>Languages</h2>
                {Object.values(countryFiltered[0].languages).map(language =>
                    <li>{language}</li>
                )}
                <h2>Flag</h2>
                <img src={countryFiltered[0].flags.png} />
                <Weather capital={countryFiltered[0].capital} lat={countryFiltered[0].latlng[0]} lon={countryFiltered[0].latlng[1]} />
            </div>
        )
    } else if (countryFiltered.length >= 10) {
        return (
            "Too many matches, specify another filter"
        )
    } else {
        return (
            countryFiltered.map(country =>
                <p>{country.name.official}</p>)
        )
    }
}

export default Country