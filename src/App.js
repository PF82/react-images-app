import React, { useState, useEffect } from "react";

import zero from '../src/img/background-image.jpg'
import one from "../src/img/thunderstorm.jpg";
import two from "../src/img/shower-rain.jpg";
import three from "../src/img/rain.jpg";
import four from "../src/img/snow.jpg";
import five from "../src/img/fog.jpg";
import six from "../src/img/clear-sky.jpg";
import seven from "../src/img/few-clouds.jpg";
import eight from "../src/img/scattered-clouds.jpg";
import nine from "../src/img/broken-clouds.jpg";
import ten from "../src/img/default-image.jpg";

/*
keys devem ser lidas de um .env file
em react podes criar um .env file (no root folder)
e o nome da variable tem q comecar com "REACT_APP_" etc..
( https://create-react-app.dev/docs/adding-custom-environment-variables/ )
portanto crias um .env e adicionas 
REACT_APP_API_BASE_URL=https://api.openweathermap.org/data/2.5/
REACT_APP_API_KEY=9c61d7516f674d61ce67583b5f1d3f23
depois aqui podes aceder as variables com process.env
*/

const api = {
  // key: process.env.REACT_APP_API_KEY,
  // base: process.env.REACT_APP_API_BASE_URL
  key: '9c61d7516f674d61ce67583b5f1d3f23',
  base: 'https://api.openweathermap.org/data/2.5/'
};
console.log(api)
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  //criei um novo state weatherImg para guardar a imagem
  const [weatherImg, setWeatherImg] = useState(zero); //aqui deixei a "one" imagem by default

  const getWeatherData = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setQuery("");

          console.log(data);
        });
    }
  };

  useEffect(() => {
    if (weather?.weather) {
      //aqui primeiro tens q confirmar se weather object tem uma property chamda weather tambem..
      //tens q confirmar isto antes de correr os outros if.. porque senao crasha..
      // exemplo.. se weather obj por acaso estiver undefined... ele quando for procurar weather.weather[0]
      //e como estivesse a procurar a property weather de undefined.. entao crasha..

      const id = weather?.weather[0]?.id;

      if (id >= 200 && id <= 232) {
        setWeatherImg(one);
      } else if ((id >= 300 && id <= 321) || (id >= 520 && id <= 531)) {
        setWeatherImg(two);
      } else if (id >= 500 && id <= 504) {
        setWeatherImg(three);
      } else if ((id >= 600 && id <= 622) || id === 511) {
        setWeatherImg(four);
      } else if (id >= 701 && id <= 781) {
        setWeatherImg(five);
      } else if (id === 800) {
        setWeatherImg(six);
      } else if (id === 801) {
        setWeatherImg(seven);
      } else if (id === 802) {
        setWeatherImg(eight);
      } else if ((id === 803) & (id === 804)) {
        setWeatherImg(nine);
      } else {
        setWeatherImg(ten);
      }
    }
  }, [weather]); //aqui no useEffect passa se uma array de "dependencies"
  //cada vez que o "weather" state muda, o useEffect corre de novo.. ou seja..
  //o useEffect hook so corre quando as suas dependencias mudarem..

  //para resumir uma timeline do flow da app..
  //1- user poe input e carrega no enter para a search..
  //2- onKeyPress a chamada para a API e feita pela getWeatherData function
  //3- se a chamada para a API for sucessfull o state de weather e actualizado (com setWeather)
  //4- como o weather state foi alterado, o useEffect hook e triggered pela dependencia que tem do weather state
  //5- quando useEffect corre de novo , a imagem certa e guardada (condicionalmente usando os IFs statements) no weatherImg state
  //6- como o state muda, o component e "re-rendered" e entao o css atribui a nova imagem do state weatherImg a  property

  return (
    <div
      style={{
        backgroundImage: `url(${weatherImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <input
        type="text"
        className="search-bar"
        placeholder="Search location..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={getWeatherData}
      />
    </div>
  );
};

export default App;
