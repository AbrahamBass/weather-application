import {useEffect, useState} from 'react'
import axios from 'axios'
import '../Style/HomeStyle.css'


const GetCountry = () => {
  const [country, setCountry] = useState([])
  const [city, setCity] = useState([])
  const [tiempo, setTiempo] = useState(null)

  function Ciudades(valor){
    const options = {
      params: {type: 'CITY',  country: valor , limit: '100' },
      headers: {
        'X-RapidAPI-Key': 'e75be9e2c0msh735b62e4460221cp1f868cjsn6190b616aa80',
        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
      }
    }
  
    axios.get('https://spott.p.rapidapi.com/places', options)
      .then((res) => {
        setCity(res.data)
      })
  }

  function Tiempo(cit){
    const KEY = '4f4a5c6b6772d75a3237e6ccfbf50e7d'
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cit}&appid=${KEY}&units=metric`)
      .then((res) => {
        setTiempo(res.data)
      })
  }

  useEffect(() => {
    const data = axios.get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountry(res.data)
      })
  }, [])


  const handleChangeCountry = (e) => {
    const country = e.currentTarget.value
    Ciudades(country)
  }

  const handleChangeCity = (e) => {
    const city = e.currentTarget.value
    Tiempo(city)
  }

  return (
    <div className="contenedor-time">
    
    <h1 className='titulo'>Weather Application</h1>

     <select onChange={handleChangeCountry} className='select-country'>
      <option value="select">Select The Country</option>
      {
          country.map((item, i) => {
            return (
              <option value={item.cca2} key={i} className='opt-selec'>{item.name.common}</option>
            )
          })
        }
     </select>

    
        <select onChange={handleChangeCity} className='select-city'>
          <option value="select">Select The City</option>
        {
          city.map((item, i) => {
            return (
              <>
                <option value={item.name} Key={i} >{item.name}</option> 
              </>
            )
          })
        }
        </select>

       
          <div className='temperatura'>
            {
              tiempo && (
                <div>
                  <div className='flex'>
                    <h2 className='tiempo'>{tiempo.main.temp}°</h2>
                    <img src={`http://openweathermap.org/img/wn/${tiempo.weather[0].icon}@2x.png`} alt="img" className='img'/>
                  </div>
                  <h3 className='ciudad'>{tiempo.name}</h3>
                </div>
              )
            }
          </div>

          <div className='data-time'>
            {
              tiempo && (
                <div className='elect'>
                  <div className='parra'>
                  <p>FeelsLike: </p>
                  <p style={{marginTop: '10px'}}>Humidity: </p>
                  <p style={{marginTop: '10px'}} >Pressure: </p>
                  <p style={{marginTop: '10px'}} >Lat:</p>
                  <p style={{marginTop: '10px'}} >Lon:</p>
                  </div>

                  <div className='valor'>
                  <p> {tiempo.main.feels_like}</p>
                  <p style={{marginTop: '10px'}} >{tiempo.main.humidity}</p>
                  <p style={{marginTop: '10px'}} >{tiempo.main.pressure}</p>
                  <p style={{marginTop: '10px'}} >{tiempo.coord.lat}</p>
                  <p style={{marginTop: '10px'}} >{tiempo.coord.lon}</p>
                  </div>
                </div>
              )
            }
          </div>
       
        <div className="fixed"></div>
    </div>
  )
}

export default GetCountry