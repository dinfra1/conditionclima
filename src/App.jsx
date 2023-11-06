import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css'
import WheatherCard from './components/WheatherCard';
import Louding from './components/Louding';
import SearchCity from './components/SearchCity';

function App() {
  
  const [latlog, setLatlog] = useState()
  const [waether, setWaether] = useState()
  const [temperature, settemperature] = useState()

  useEffect(() => {

    const sucess = pos => {
      const obj = {
        lat: pos.coords.latitude,
        log: pos.coords.longitude
      }
      setLatlog(obj)
    }
    const errr = err => {
      console.log(err);
    }
    navigator.geolocation.getCurrentPosition(sucess,errr)
  },[]) 

  useEffect(() => {
    const ApiKey = "7ff78a04e7f30fd0bfdcc68b8ee108bd"
    if(latlog){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlog.lat}&lon=${latlog.log}&appid=${ApiKey}`)
      .then(res => {
        setWaether(res.data)
        const celcius =(res.data.main.temp - 273.15).toFixed(1)
        const farenheit = (celcius * 9/5+32).toFixed(1);

        settemperature({celcius, farenheit})
      })
      .catch(err => console.log(err))
    }
    }, [latlog])

  const time = waether?.weather[0].main;

  return (
      <body> {
        time === 'Rain' ?
        <img src='./imgFond/invierno.gif' alt='' />
        : time === 'Thunderstorm' ? 
        <img src='./imgFond/verano.gif' alt='' /> 
        : time === 'Clouds' ?
         <img src='./imgFond/nublado.gif' alt='' /> 
        : time === 'Drizzle' ?
        <img src='./imgFond/Drizzle.webp' alt='' />
        : time === 'Snow' ?
        <img src='./imgFond/Snow.gif' alt='' /> :
        <img src='./imgFond/despejado1.gif' alt='' />
      }
    <div className='Container'>
    <div className="App">
    {
      waether 
      ? 
      <WheatherCard waether={waether} 
       temperature={temperature}/>
       :
       <Louding />
    }
      <SearchCity  setLatlog={setLatlog} latlog={latlog}/>
      <h6 className='coop'>Cooperating by Edinson Ramirez with API's</h6>
    </div>
    </div>
    </body>
  )
  }

export default App
