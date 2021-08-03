import React,  {useState, useRef, useEffect} from 'react'



const WeatherApp = (props) => {
  const [zip, setZip] = useState(undefined);
  const [forecast, setForecast] = useState("")
  const zipCodeRef  = useRef();

  const [imperialOrMetric, setImperialOrMetric] = useState("imperial")

  const dotenv = require('dotenv').config()

  const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY

  const fetchForecast = (zipCode) => {
    fetch(`//api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)

          if (Number(result.cod) === 200) {

            let k_temp = result.list[0].main.temp;

            const converted_temp = (imperialOrMetric === "imperial" ?
              Math.trunc((k_temp - 273.15 ) * 9/5 + 32) : k_temp - 273.15
            );

            let fc = `Currently ${converted_temp} °F: ${ result.list[0].weather[0].description}`;
            setForecast(fc)
          } else {
            setForecast(result.message)
          }
          zipCodeRef.current.focus()
        }
      )
  }

  useEffect(() => {
    fetchForecast(zipCodeRef.current.value)
  }, [zip, imperialOrMetric])

  const handleMeasurementChange = (event) => {
    setImperialOrMetric(event.target.value)
  }

  return (
    <>
    <h2>
      welcome to the weather app
    </h2>

    <br />

      <input name={"imperial_or_metric"}
             value={"imperial"}
             id={"imperial"}
             type={"radio"}
             onChange={handleMeasurementChange} />
      <label htmlFor={"imperial"}>Imperial</label>

      <input name={"imperial_or_metric"}
             value={"metric"}
             type={"radio"}
             id={"metric"}
             onChange={handleMeasurementChange} />

      <label htmlFor={"metric"}>Metric</label>

      <br />
      Input your zipcode:

      <input name={"zip"}
             ref={zipCodeRef}
             onChange={(event) => setZip(event.target.value)}
      />

      <br />
      {forecast}

    <br/>
    </>
  )


}


export default WeatherApp