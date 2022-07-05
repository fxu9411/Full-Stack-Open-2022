import { useState, useEffect } from "react";
import axios from 'axios'

const Weather = ({ capital, lat, lon }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [temp, setTemp] = useState(0)
    const [icon, setIcon] = useState('')
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`;

    const hook = () => {
        console.log('Get Weather')
        axios
            .get(url)
            .then(response => {
                setTemp(response.data.main.temp)
                setIcon(response.data.weather[0].icon)
            })
    }
    useEffect(hook, [])
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {temp}&#8451;</p>
            <img src={iconURL} />
        </div>
    )
}

export default Weather;