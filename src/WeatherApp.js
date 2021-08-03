import React,  {useState, useRef, useEffect} from 'react'


const WeatherApp = (props) => {
  const [zip, setZip] = useState(undefined);
  const [forecast, setForecast] = useState("")
  const zipCodeRef  = useRef();

  const weather_forecast = "";

  const OPEN_WEATHER_MAP_API_KEY = "f1fabb26c7c42ec9e4e5c7696e46b32f"

  const fetchForecast = (zipCode) => {
    fetch(`//api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)

          if (Number(result.cod) === 200) {

            let k_temp = result.list[0].main.temp;

            let f_temp = Math.trunc((k_temp - 273.15 ) * 9/5 + 32)
            let fc = `Currently ${f_temp} °F: ${ result.list[0].weather[0].description}`;

            console.log(fc)
            setForecast(fc)

          } else {
            setForecast(result.message)

          }
        }
      )
  }


  useEffect(() => {
    fetchForecast(zipCodeRef.current.value)

  }, [zip])

  const handleKeyPress = (event) => {

    if (zipCodeRef.current)  {
      setZip(zipCodeRef.current.value)
    }
  }

  return (
    <>
    <h2>
      welcome to the weather app
    </h2>

    <br />
      Input your zipcode:

      <input name={"zip"}
             ref={zipCodeRef}
             onChange={handleKeyPress}

      />

      <br />
      {forecast}

    <br/>
    </>
  )


}


export default WeatherApp