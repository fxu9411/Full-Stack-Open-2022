import axios from 'axios'
import { useState, useEffect } from 'react'
import Country from './components/Country'


const App = () => {

  const url = 'https://restcountries.com/v3.1/all'

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const hook = () => {
    console.log('Effect')
    axios
      .get(url)
      .then(response => {
        console.log('Promise Fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countryFiltered = countries.filter(country => country.name.official.toLowerCase().includes(countryFilter))

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
      <form>
        Find Countries <input value={countryFilter} onChange={handleFilterChange} />
      </form>
      <Country countryFiltered={countryFiltered} />
    </div >
  )
}
export default App;
