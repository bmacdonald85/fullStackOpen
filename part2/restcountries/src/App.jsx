import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import CapitalWeather from './components/CapitalWeather'

function App() {
  

  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService.getAll()
      .then(data => {
        setCountries(data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
        setCountries([])
      })
  }, [])

  const handleCountrySearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleSelectedCountry = (countryName) => {
    const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase())
    if (country) {
      countriesService.getByName(countryName)
        .then(data => {
          console.log('Country details:', data)
          setSelectedCountry(data)
        })
        .catch(error => {
          console.error('Error fetching country details:', error)
          setSelectedCountry(null)
        })
      
    } else {
      console.error(`Country not found: ${countryName}`)
      setSelectedCountry(null)
    }
  }

  return (
    <>
      <div>
        <h1>REST Countries</h1>
        <p>Search for a country to see its details.</p>
        <label htmlFor='findCountry'>Find countries: </label>
        <input id="findCountry" type="text" placeholder="Type a country name..." onChange={handleCountrySearch} />
      </div>

      <CountryList countries={countries} searchTerm={searchTerm} handleSelectedCountry={handleSelectedCountry} />

      <CountryDetails selectedCountry={selectedCountry} />

      <CapitalWeather selectedCountry={selectedCountry} />
    </>
  )
}

export default App
