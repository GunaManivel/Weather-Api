const apiKey = "d92e3b7365d2e22d7605e9aeb27c267e";

let form = document.getElementById("weather-form");
let weatherContainer = document.getElementById("weather-container");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let city = document.getElementById("city").value;
  await getWeather(city);
});

async function getWeather(city) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    let data = await response.json();

    let main = data.weather[0].main;
    let desc = data.weather[0].description;
    let iconcode = data.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let base = data.base;
    let temp = data.main.temp;
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;
    let w_speed = data.wind.speed;

    let card = `
      <div class="card card-with-bg justify-content-center" style='width:50%'>
        <div class="card-body bg-warning" style='border-radius: 10px'>
          <h5 class="card-title text-center fs-1 text-white fw-bold">${
            data.name
          }</h5>
        </div>
        <ul class="list-group list-group-flush fs-3 fw-bold">
          <li class="list-group-item text-center"><img src="${iconurl}" class="card-img-top" alt="icon" style="width: 19%;"></li>
          <li class="list-group-item">Main : ${main}</li> 
          <li class="list-group-item">Desc : ${desc}</li>
          <li class="list-group-item">Base : ${base}</li>
          <li class="list-group-item">Temperature : ${(temp - 273.15).toFixed(
            2
          )}&deg;C</li>
          <li class="list-group-item">Pressure : ${pressure}</li>
          <li class="list-group-item">Humidity : ${humidity}</li>
          <li class="list-group-item">Wind Speed : ${w_speed}</li>
        </ul>
      </div>
    `;

    // Create a new container for the weather card and center it on the page
    let cardContainer = document.createElement("div");
    cardContainer.classList.add(
      "container",
      "d-flex",
      "justify-content-center",
      "mt-5"
    );
    cardContainer.innerHTML = card;

    // Clear previous weather data and append the new card container
    weatherContainer.innerHTML = "";
    weatherContainer.appendChild(cardContainer);

    // Scroll the page to the weather container position
    let weatherContainerPosition =
      weatherContainer.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: weatherContainerPosition, behavior: "smooth" });
  } catch (error) {
    console.error("error fetching the weather data");
  }
}
