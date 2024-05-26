const url = `https://api.weatherapi.com/v1/forecast.json?key=2c2c2077ae0a4a33ac1142821242205&q=yaounde?days=3`;
const dateInfo = document.querySelector(".date-info");

const promise = fetch(url, { mode: "cors" });

promise
  .then((data) => data.json())
  .then((data) => {
    const conditionText = document.querySelector(".condition-text");
    conditionText.textContent = data.current.condition.text;

    const conditionIcon = document.querySelector(".condition-icon");
    conditionIcon.src = data.current.condition.icon;

    const temperature = document.querySelector(".temperature");
    temperature.innerHTML = `<h3 class= 'current-temp'>${data.current.temp_c} <sup class='deg'>0</sup>C</h3>`;

    const cityName = document.querySelector(".city-name");
    cityName.textContent = `${data.location.name}, ${data.location.country}`;

    const hourForecast = document.querySelector(".hour-forecast");
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

    console.log(data.forecast.forecastday[0].hour);
  });

//   data.forecast.forecastday[0].hour[0].time.split(" ")[1];
// data.forecast.forecastday[0].hour[0].temp_c;

//   current date
const date = new Date();
dateInfo.textContent = date.toDateString();
