const CountryDetails = ({ selectedCountry }) => {
    if (!selectedCountry) {
        return
    }
    
    const { name, capital, area, languages, flags } = selectedCountry;
    
    return (
        <div>
        <h2>{name.common}</h2>
        <p><strong>Capital:</strong> {capital[0]}</p>
        <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
        <h3>Languages</h3>
        <ul>
            {Object.values(languages).map(lang => (
            <li key={lang}>{lang}</li>
            ))}
        </ul>
        <img src={flags.png} alt={flags.alt} />
        </div>
    );
}

export default CountryDetails;