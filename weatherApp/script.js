const apiKey = "d2d364245ddfe22c2a703ddbe56731d6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");

const iconMap = {
    Rain: "images/rain.png",
    Clouds: "images/clouds.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Snow: "images/snow.png",
    Clear: "images/clear.png",
    Haze: "images/haze.png"
};

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";

        document.querySelector(".wind").innerHTML =
            Math.round(data.wind.speed) + " km/h";

        const weatherMain = data.weather[0].main;
        weatherIcon.src = iconMap[weatherMain] || "images/clear.png";

        weatherSection.style.display = "block";
    } catch (error) {
        alert("Could not fetch weather data. Please check the city name.");
        weatherSection.style.display = "none";
    }
}

function handleSearch() {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
        searchBox.value = "";
    } else {
        alert("Please enter a city name.");
    }
}

searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});