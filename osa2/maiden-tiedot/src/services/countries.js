import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getCoordinates = cityName => {
  const coordinateBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct'
  const request = axios.get(`${coordinateBaseUrl}?q=${cityName}&limit=1&appid=${apiKey}`)
  return request.then(response => response.data)
}

const getWeatherData = (lat, lon) => {
  const weatherDataUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const request = axios.get(`${weatherDataUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, getCoordinates, getWeatherData, create, update, deletePerson }