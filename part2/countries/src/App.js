import axios from "axios";
import { useState } from "react";
import Country from "./components/Country";

const App = () => {
  let result
  const APIKEY = process.env.REACT_APP_API_KEY
  const [search, setSearch] = useState('')
  const [view, setView] = useState('')
  const [data, setData] = useState([])
  const [countryWeather, setCountryWeather] = useState(null)
  
  const handleSearch = (countryName) => {
    setSearch(countryName)
    axios.get(`https://restcountries.com/v2/name/${countryName}`)
    .then(res => {
      const dataLength = res.data.length
      
      if(dataLength === 0) setView('none')
      if(dataLength === 1) {
        handleShowCountry(res.data[0])
      }
      else if(dataLength <= 10) {
        setView('many')
        setData(res.data)
      }
      else setView('toomany')
    })
  }
  
  const handleShowCountry = (country) => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
      .then(res => {
        //It's not pretty, but it's the way I managed to make sure I get all the data I need from the APIs so I can send it to the Components without them breaking
        //I think there's something called async await that would be useful here
        setCountryWeather(res.data)
        console.log(res.data);
        setData(country)
        setView('one')
      })
  } 

  switch(view){
    case 'none':
      result = <p>There are no matches</p>
      break;
    case 'one':
        result = <Country country={data} weather={countryWeather}/>
        break;
    case 'many':
        result = data.map((c) => (
            <div key={`${c.name}-div`}>
                <p key={`${c.name}-p`}>{c.name}</p>
                <button 
                    key={`${c.name}-button`}
                    type="button" 
                    onClick={() => handleShowCountry(c)}
                >
                    Show
                </button>
            </div>
        ))
        break;
    case 'toomany':
        result = <p>Too many matches, specify another filter</p> 
        break;
    default:
        result = null;
        break;
  } 
    
  return(
    <div>
      <p>Find countries:</p> 
      <input value={search} onChange={e => handleSearch(e.target.value)} />
      {result}
    </div>
  )
}

export default App;
