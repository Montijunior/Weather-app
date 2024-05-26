const url = `https://api.weatherapi.com/v1/forecast.json?key=2c2c2077ae0a4a33ac1142821242205&q=yaounde?days=3`;
const dateInfo = document.querySelector(".date-info");
const conditionText = document.querySelector(".condition-text");
const conditionIcon = document.querySelector(".condition-icon");
const temperature = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const hourForecast = document.querySelector(".hour-forecast");
const logo = document.getElementById("logo");
const mainContainer = document.querySelector(".container");
const footer = document.querySelector("footer");
const loader = document.querySelector(".loader");
const date = new Date();

// for the page on load(use the promise syntax)
function onError() {
  throw new Error("Network failure");
}

function defaultWeather() {
  mainContainer.style.display = "none";
  footer.style.display = "none";

  return fetch(url, { mode: "cors" })
    .then((data) => data.json())
    .then((data) => {
      //remove loader and load page content
      loader.style.display = "none";
      mainContainer.style.display = "block";
      footer.style.display = "block";

      cityName.textContent = `${data.location.name}, ${data.location.country}`;
      dateInfo.textContent = date.toDateString();
      conditionText.textContent = data.current.condition.text;
      conditionIcon.src = data.current.condition.icon;
      temperature.textContent = data.forecast.forecastday[0].day.avgtemp_c;
      data.forecast.forecastday[0].hour.forEach((object) => {
        hourForecast.innerHTML += `
            <div class="timeTemperature">
            <div class="timeTemp">${object.time.split(" ")[1]}</div>
            <div class="tempTime">${
              object.temp_c
            }<span><sup>0</sup>C</span></div>
            </div>
            `;
      });
    })
    .catch(onError);
}

// once the logo is click reload page
logo.addEventListener("click", defaultWeather);
window.onload = defaultWeather();

//Async Await syntax
