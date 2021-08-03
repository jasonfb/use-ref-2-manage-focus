import React,  {useState, useRef} from 'react'



const WeatherApp = (props) => {
  const [zip, setZip] = useState(undefined);
  const zipCodeRef  = useRef();

  const weather_forecast = "";

  return (
    <>
    <h2>
      welcome to the weather app
    </h2>

    <br />
      Input your zipcode:
      
      <input name={"zip"}
             ref={zipCodeRef}
             value={zip}/>

      <br />
      {weather_forecast}

    <br/>
    </>
  )


}


export default WeatherApp