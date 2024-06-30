import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const api = {
    key: "d3b4661d2e7a4590c4c39915a4cd190d",
    base: "https://api.openweathermap.org/data/2.5/"
  };

  function handleChange(e) {
    setCity(e.target.value);
  }

  async function handleClick() {
    try {
      // Make the API request using fetch and await the response
      let response = await fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON from the response and await the result
      let data = await response.json();

      // Update the state with the fetched weather data
      setWeather(data);
      setCity("")
      setError('');
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('There has been a problem with your fetch operation:', error);
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  }

  useEffect(()=>{
    if(inputRef.current) {
      inputRef.current.focus();
    }
  },[])

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className='main'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Enter the city'
          name="city"
          onChange={handleChange}
          value={city}
          onKeyDown={(event)=>{
            if(event.key === "Enter") {
              handleClick(event)
            }
          }}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
      {weather ? (
        <div>
          <h1>Current weather in {weather.name}:</h1>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
}

export default App;
