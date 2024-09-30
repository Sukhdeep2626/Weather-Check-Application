const apiKey = '6b07590b24msh064df79c813380bp11ff1fjsnf03b310607e0';
const apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json'; 

document.getElementById('searchButton').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    
    fetch(`${apiUrl}?q=${encodeURIComponent(city)}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        if (data && data.location) {
            
            document.getElementById('cityName').textContent = data.location.name;
            document.getElementById('weatherDescription').textContent = data.current.condition.text;
            document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
            document.getElementById('humidity').textContent = `${data.current.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.current.wind_kph} kph`;

            
            updateBackground(data.current.condition.text);
        } else {
            alert("City not found or invalid response");
        }
    })
    .catch(err => console.error("Error fetching weather data:", err));
}


function updateBackground(condition) {
    const body = document.body;
    if (condition.includes("Clear")) {
        body.style.backgroundImage = "url('images/clear-sky.jpg')";
    } else if (condition.includes("Cloudy")) {
        body.style.backgroundImage = "url('images/cloudy.jpg')";
    } else if (condition.includes("Rain")) {
        body.style.backgroundImage = "url('images/rainy.jpg')";
    } else if (condition.includes("Snow")) {
        body.style.backgroundImage = "url('images/snowy.jpg')";
    } else if (condition.includes("Thunderstorm")) {
        body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    } else {
        body.style.backgroundImage = "url('images/default.jpg')";
    }
    
    
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}


