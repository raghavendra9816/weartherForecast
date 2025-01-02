// import React from 'react'
import './Weather.css'
import clear_icon from '../assets/c1.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/d.png'
import humidity_icon from '../assets/h.png'
import rain_icon from '../assets/r.png'
import snow_icon from '../assets/snow.jpeg'
import wind_icon from '../assets/w.png'
import search_icon from '../assets/search1.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

const Weather = () => 
  {
    const inputRef=useRef();
    const [weatherData,setWeatherData]=useState(false);
    const allIcons={
      "01d":clear_icon,
      "01n":clear_icon,
      "02d":cloudy_icon,
      "02n":cloudy_icon,
      "03d":cloudy_icon,
      "03n":cloudy_icon,
      "04d":drizzle_icon,
      "04n":drizzle_icon,
      "09d":rain_icon,
      "09n":rain_icon,
      "010d":rain_icon,
      "010n":rain_icon,
      "013d":snow_icon,
      "013n":snow_icon,
    }
      const search=async (city)=>{
        if(city===""){
          alert("Enter city Name")
          return;
        }
        try
         {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API}`;
            const response=await fetch(url);
            const data=await response.json();
            if(!response.ok){
              alert(data.message);
              return;
            }
            console.log(data);
            const icon=allIcons[data.weather[0].icon] ||clear_icon;
            setWeatherData({
              humidity:data.main.humidity,
              windSpeed:data.wind.speed,
              temperature: Math.floor(data.main.temp),
              location:data.name,
              icon:icon
            })
        } 
          catch (er) {
            setWeatherData(false);
            console.error("Error in Fetching Weather Data"+er);
      }
    }

useEffect(()=>{search("Nepal");},[]);
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search' />
            <img src={search_icon} alt="search"  onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon}alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className="col">
            <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>humidity</span>
          </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Windspeed</span>
          </div>
          </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather
