import React, { useState } from 'react'

const WheatherCard = ({waether,temperature}) => {

    const [StateTemperarure, setStateTemperarure] = useState(true)

    const handlerTemperatureF = () =>{
      setStateTemperarure(!StateTemperarure)
    }

    const max = (waether?.main.temp_max - 273.15).toFixed();
    const min = (waether?.main.temp_min - 273.15).toFixed();

  return (
    <article className='Article_'>
        <h1 className='Title_'>Weather App</h1>
        <h4 className='NameCity'> Ciudad {waether?.name}, {waether?.sys.country}</h4>
        <section className='Info_'>
          <header>
            <img className="imgCondition" src={`https://openweathermap.org/img/wn/${waether?.weather[0].icon}@4x.png`} alt='' />
          </header>
        <ul>
            <li>Weather Condition: <b>{waether?.weather[0].description}</b></li>
            <li>Wind Speed: <b>{waether?.wind.speed} m/s</b></li>
            <li>Cloud Porcentage: <b>{waether?.clouds.all}%</b></li>
           <li>Atmospheric Pressure : <b>{waether?.main.pressure} hPa</b></li>
           <li>Temperature max <b> {
          StateTemperarure
          ? `${max} °C`
          : `${max * 9/5+32} °F`
          }</b></li>
          <li>Temperature min <b> {
          StateTemperarure
          ? `${min} °C`
          : `${min * 9/5+32} °F`
          }</b></li>
        </ul>
        </section>
        <h2>This is the temperature now<br></br> <span className='temperature'>{
          StateTemperarure
          ? `${temperature?.celcius} °C`
          : `${temperature?.farenheit} °F`
          }</span></h2>
        <button className='Butoom_' onClick={handlerTemperatureF}>Changue to {StateTemperarure ? '°F': '°C'}</button>
    </article>
  )
}

export default WheatherCard