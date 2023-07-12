function initForecast() {
    var cityEl = $('#city-search');
    var searchBtnEl = $('#search-btn');
    var currentWeatherEl = $('#current-weather');
    var cityNameEl = $('#city-name');
    var weatherImgEl = $('#weather-img');
    var tempEl = $('#temperature');
    var windEl = $('#wind');
    var humidityEl = $('#humidity');
    var fiveDayEl = $('#five-day-section');

    var forecastDateEl = $('.date');
    var forecastTempEl = $('.temperature');
    var forecastWindEl = $('.wind');
    var forecastHumidityEl = $('.humidity');
    var forecastImgEl = $('.weather-img');
    var historyEl = $('#history');
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    var APIKey = "0f8eb1c52701ff5bf5bc1daccc4a58ba";

    function getCurrentWeather(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: requestURL,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            currentWeatherEl.removeClass("d-none");
            var currentDate = new Date(response.dt * 1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            cityNameEl.text(response.name + "(" + month + "/" + day + "/" + year + ")");
            var weatherIcon = response.weather[0].icon;
            weatherImgEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            weatherImgEl.attr("alt", response.weather[0].description);
            tempEl.text("Temperature: " + response.main.temp + " °");
            windEl.text("Wind: " + response.wind.speed + " MPH");
            humidityEl.text("Humidity: " + response.main.humidity + " %");

        });

    };
    function getForecast(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: requestURL,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            fiveDayEl.removeClass("d-none");
            var forecastCardEl = $('.five-forecast');
            for (i = 0; i < forecastCardEl.length; i += 8) {
                var forecastDate = new Date(response.list[i].dt_txt);
                var forecastDay = forecastDate.getDate();
                var forecastMonth = forecastDate.getMonth() + 1;
                var forecastYear = forecastDate.getFullYear();
                forecastDateEl.text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
                forecastTempEl.text("Temperature: " + response.list[i].main.temp + " °");
                forecastWindEl.text("Wind: " + response.list[i].wind.speed + " MPH");
                forecastHumidityEl.text("Humidity: " + response.list[i].main.humidity + " %");
                var forecastIcon = response.list[i].weather[0].icon;
                forecastImgEl.attr("src", "https://openweathermap.org/img/wn/" + forecastIcon + ".png");
            }
        });
    };

    $(searchBtnEl).on("click", function () {
        var cityName = cityEl.val();
        getCurrentWeather(cityName);
        getForecast(cityName);
        searchHistory.push(cityName)
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderHistory();
    });

    function renderHistory() {
        historyEl.text("");
        for (i = 0; i < searchHistory.length; i++) {
            var searchItem = $('#document').append("button");
            searchItem.attr("type", "text");
            searchItem.attr("readonly", true);
            searchItem.attr("value", searchHistory[i]);
            searchItem.attr("class", "form-control")
            $(searchItem).on("click", function () {
                getCurrentWeather(searchItem.val());
            });
            historyEl.append(searchItem);
        };
    };

    renderHistory();


};

initForecast();