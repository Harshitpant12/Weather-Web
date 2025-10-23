import { countryNames } from "./cocuntry-names.js"
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityNameDisplay = document.getElementById("city-text")
    const weatherIcon = document.getElementById("weatherIcon");
    const temperatureDisplay = document.getElementById("temperature")
    const weatherDisplay = document.getElementById("weather")
    const displayHumidity = document.getElementById("humidity")
    const minTempDisplay = document.getElementById("min-temp")
    const maxTempDisplay = document.getElementById("max-temp")
    const descriptionDisplay = document.getElementById("description")
    const errorMessage = document.getElementById("error-message")

    const API_KEY = "ENTER_YOUR_OPENWEATHER_API_KEY"; //env variables

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;

        //server may throw an error
        //server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        
        const response = await fetch(url)
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("City Not found")
        }

        const data = await response.json()
        return data
    }

    function displayWeatherData(data){
        console.log(data);
        const  {name, main, weather, sys} = data
        cityNameDisplay.textContent = `${name}, ${countryNames[sys.country] || sys.country}`
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
        weatherIcon.src = iconUrl;
        weatherIcon.alt = weather[0].description
        temperatureDisplay.textContent = `Temperature : ${main.temp}`
        weatherDisplay.textContent = `Weather : ${weather[0].description}`
        displayHumidity.textContent = `Humidity : ${main.humidity}`
        minTempDisplay.textContent = `Minimum Temperature: ${main.temp_min}`
        maxTempDisplay.textContent = `Maximum Temperature: ${main.temp_max}`
        descriptionDisplay.textContent = `So the weather can be described as ${weather[0].description} and feels like ${main.feels_like}`


        //unlocking display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

})
