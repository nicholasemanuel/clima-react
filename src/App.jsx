import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState({});
  const [weather5Days, setWeather5Days] = useState({});
  const inputRef = useRef();

  async function procurarCidade() {
    const city = inputRef.current.value;
    const apikey = "YOURAPIKEY";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=pt_br&units=metric`;

    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&lang=pt_br&units=metric`;

    const apiInfo = await axios.get(url);
    const apiInfo5Days = await axios.get(url5Days);

    setWeather5Days(apiInfo5Days.data);
    setWeather(apiInfo.data);
  }

  return (
    <div className="container">
      <h1>Previsão do tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade"/>
      <button onClick={procurarCidade}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days}/>}
    </div>
  );
}

export default App;
