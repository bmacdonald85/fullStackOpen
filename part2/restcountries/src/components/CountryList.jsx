const CountryList = ({ countries, searchTerm, handleSelectedCountry }) => {

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCountries.length === 0) {
    return <p>No countries found.</p>;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  return (
    <ul>
      {filteredCountries.map(country => (
        <li key={country.cca3}>
            <span>{country.name.common}</span>
            <button onClick={() => handleSelectedCountry(country.name.common)}>
              Show
            </button>
        </li>
      ))}
    </ul>
  );
}

export default CountryList;