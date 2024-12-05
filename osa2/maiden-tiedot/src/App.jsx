import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>
        {text}
      </button>
    </>
  )
}

const Country = (props) => {
  return (
    <div>
      <p>
        <span>{props.name}</span> 
        <Button handleClick={() => props.showCountry(props.name)} text="Show" />
      </p>
    </div>
  )
}

const Language = (props) => {
  return (
    <li>{props.language}</li>
  )
}

const WeatherInformation = (props) => {
  const [degrees, setDegrees] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')

  //console.log('Weather props: ', props)

  countryService
    .getWeatherData(props.latlng[0], props.latlng[1])
    .then(weatherData => {
      //console.log('Weather data: ', weatherData)
      setDegrees(weatherData.main.temp)
      setWind(weatherData.wind.speed)
      setIcon(weatherData.weather[0].icon)
    })
  //console.log('Icon: ', icon)
  return (
    <div>
      <h2>Weather in {props.capital[0]} </h2>
      <p>Temperature {degrees} Celsius </p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
      <p>Wind {wind} m/s </p>
    </div>
  )
}

const CountryInformation = (props) => {
  console.log('Props: ', props)

  return (
    <div>
      <h1>{props.name}</h1>
      <p>
        <span>Capital: {props.capital}</span><br/>
        <span>Area: {props.area}</span>
      </p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(props.languages).map(language => 
          <Language key={language} language={language} />
        )}
      </ul>
      <img src={props.flag} alt="Flag of the Country" />
      <WeatherInformation capital={props.capital} latlng={props.latlng} />
    </div>
  )
}

const Countries = ({countries, countryNames, showCountry}) => {

  //console.log('CountryNames: ', countryNames)

  if (countryNames.length <= 10 && countryNames.length > 1) {

    return (
      <div>
        {countryNames.map(country =>
          <Country key={country} name={country} showCountry={showCountry} />
        )}
      </div>
    )
  } else if (countryNames.length === 1) {

    const targetCountry = countries.filter(country => country.name.common === countryNames[0])
    //console.log('Target country: ', targetCountry)

    return (
      <div>
        {targetCountry.map(country =>
          <CountryInformation key={country} name={country.name.common} area={country.area}
          capital={country.capital} languages={country.languages} flag={country.flags.png}
          latlng={country.latlng} />
        )}
      </div>
    )
     
  } else {
    return (
      <div>
        <p>
          <span>{'Too many matches, specify another filter!'}</span>
        </p>
      </div>
    )
  }
}

const Filter = ({handleChange, filteredName}) => {

  return (
    <div>
      Find countries: <input 
      value={filteredName}
      onChange={handleChange} 
      />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {message}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [countryNames, setCountryNames] = useState([]) 
  const [filteredName, setFilteredName] = useState('')

  const hook = () => {
    //console.log('effect run, countries are now', countries)
    countryService
      .getAll()
      .then(initialCountries => {
        //console.log('Country objects: ', initialCountries)
        const countryCommonNames = initialCountries.map(country => country.name.common)
        //console.log('The name of the countries: ', countryCommonNames)
        setCountries(initialCountries)
        setCountryNames(countryCommonNames)
      })
  }
  
  useEffect(hook, [])

  console.log('Hi there!')

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value)
    addFilteredCountries(event.target.value)
  }

  const addFilteredCountries = (filteredName) => {
    const countriesToShow = countryNames.filter(countryName => 
      countryName.toLowerCase().includes(filteredName.toLowerCase())
    )
    console.log('Countries to show: ', countriesToShow)
    setCountryNames(countriesToShow)
  }

  const showCountry = countryName => {
    const chosenCountry = countryNames.filter(name => name === countryName)
    setCountryNames(chosenCountry)
  }

  return (
    <div>  
      <Filter handleChange={handleFilteredNameChange} filteredName={filteredName} />
      <Countries countries={countries} countryNames={countryNames} showCountry={showCountry} />
    </div>
  )
}

export default App