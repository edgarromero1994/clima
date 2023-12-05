import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
const api = {
  key: "6a8d0feea0f48fa08a9bb3c9b23b32e5",
  base: "https://api.openweathermap.org/data/2.5/"
};

const weatherConditions = {
  Thunderstorm: "Tormenta",
  Drizzle: "Llovizna",
  Rain: "Lluvia",
  Snow: "Nieve",
  Mist: "Niebla",
  Smoke: "Humo",
  Haze: "Neblina",
  Dust: "Polvo",
  Fog: "Niebla",
  Sand: "Arena",
  Ash: "Ceniza",
  Squall: "Chubasco",
  Tornado: "Tornado",
  Clear: "Despejado",
  Clouds: "Nublado"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weatherConditions[weather.weather[0].main]}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}


export default App;
