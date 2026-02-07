async function getData() {
    let elem = document.getElementById("searchText");
    let cityName = elem.value;
    let city = cityName.trim();
    elem.value = "";

    if (city === "") {
        alert("Please enter valid city");
        return;
    }

    try {

        let API = `https://api.weatherapi.com/v1/forecast.json?key=d1e295e9fbb44496acd131552263101&q=${city}&days=3`;

        let res = await fetch(API);
        let data = await res.json();

        // ✅ If API returns error
        if (data.error) {
            alert(data.error.message);
            return;
        }

        let current = data.current;
        let location = data.location;
        let forecastDays = data.forecast.forecastday;

        let refElem = document.getElementById("ref");

        refElem.innerHTML = `
            <h2>Location: ${location.name}, ${location.country}</h2>
            <h2>${current.condition.text}</h2>
            <img src="https:${current.condition.icon}">
            <h2>Temperature: ${current.temp_c}°C</h2>
            <h2>Humidity: ${current.humidity}%</h2>
            <h2>Wind: ${current.wind_kph} km/h</h2>
            <h1 style="color:red;">3 days Forecast</h1>
        `;

        let forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = "";

        forecastDays.forEach(day => {
            forecastContainer.innerHTML += `
                <div class="card">
                    <h3>${day.date}</h3>
                    <img src="https:${day.day.condition.icon}">
                    <p>${day.day.condition.text}</p>
                    <p>Max: ${day.day.maxtemp_c}°C</p>
                    <p>Min: ${day.day.mintemp_c}°C</p>
                </div>
            `;
        });

    } catch (error) {
        alert("API connection failed");
        console.log(error);
    }
}
