let apiKey = "d2d364245ddfe22c2a703ddbe56731d6";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";   
        document.querySelector(".city").innerHTML = data.name;   
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";   
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
        
        if(data.weather[0].main == "rain"){
            weatherIcon.src = "images/rain.png"
            
        }
        else if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Humidity"){
            weatherIcon.src = "images/humidity.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }
        else if(data.weather[0].main == "Wind"){
            weatherIcon.src = "images/wind.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
            // document.querySelector(".card").style.backgroundImage = "url('images/clear.jpg')";
        }
        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "images/haze.png"
        }

        document.querySelector(".weather").style.display = "block"


    } catch (error) {
        console.error(error);
        alert("Could not fetch weather data. Please check the city name and try again.");
    }
}

function handleSearch() {
    const city = searchBox.value
    if (city) {
        checkWeather(city);
        
    } else {
        alert("Please enter a city name.");
    }
}

searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});
