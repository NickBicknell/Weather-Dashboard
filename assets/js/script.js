function initForecast() {
    var cityEl = $('#city-search');
    var searchBtnEl = $('#search-btn');
    var currentWeatherEl = $('current-weather');
    var cityNameEl = $('#city-name');
    var weatherImgEl = $('#weather-img');
    var tempEl = $('#temperature');
    var windEl = $('#wind');
    var humidityEl = $('#humidity');
    var historyEl = $('#history');
    var fiveDayEl = $('#five-day-section');



    var APIKey = "0f8eb1c52701ff5bf5bc1daccc4a58ba";

    function getCurrentWeather(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + APIKey;
        $.ajax({
            url: requestURL,
            method: 'GET',
        }).then(function(response) {
                console.log(response);
                currentWeatherEl.removeClass("d-none");
                var currentDate = new Date(response.data.dt * 1000);
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                cityNameEl.text(response.data.name + "(" + month + "/" + day + "/" + year + ")");
                var weatherIcon = response.data.weather[0].icon;
                weatherImgEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                weatherImgEl.attr("alt", response.data.weather[0].description);
                tempEl.text("Temperature: " + k2f(response.data.main.temp) + " U+000B0");
                windEl.text("Wind: " + response.data.wind.speed + " MPH");
                humidityEl.text("Humidity: " + response.data.main.humidity + " %");

            });
    }

    $(searchBtnEl).on("click", function () {
        var cityName = cityEl.value;
        getCurrentWeather(cityName);

    });

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    };

};

initForecast();