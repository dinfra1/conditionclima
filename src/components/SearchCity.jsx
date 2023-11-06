import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SearchCity = ({setLatlog}) => {
    const [search, setSearch] = useState()
    const [enter, setEnter] = useState();
    const [error, setError] = useState();


    useEffect(() => {
      
        if(enter){
        const key = "7ff78a04e7f30fd0bfdcc68b8ee108bd";
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${enter}&limit=5&appid=${key}`)
        .then(res => {
            setSearch(res.data[0])
            const lat = res.data[0].lat;
            const log = res.data[0].lon
            setLatlog({lat, log})
        })
        .catch(err => {
            if(search){
                setError(false)
                console.log("Esta aqui si")
            }else{
                setError(true);
                console.log("Esta aqui else")
            }
        })
    }
    }, [enter])

    const handlerShear = (e) => {
        e.preventDefault();
        setEnter(e.target.name.value.toLowerCase())
    }
    
  return (
    <div className='From_city'>

        <form onSubmit={handlerShear}>
            <input id='name' placeholder='Enter name City' type="text" required />
            <button className='Button_Shear'>Search City</button>
        </form>
        {
            error ? 
            <p className='Error_city'>
                Sorry, the City DOESN'T exist
            </p>
            : ""
        }

    </div>
  )
}

export default SearchCity