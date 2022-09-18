const Country = ({country, weather}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
            </ul>
            <img src={country.flag} alt={`${country.demonym} flag`} />
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`${weather.weather[0].description} icon`}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country