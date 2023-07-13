// load forecasts onto page function
function initForecast() {
    // jquery element id selectors
    var cityEl = $('#city-search');
    var searchBtnEl = $('#search-btn');
    var currentWeatherEl = $('#current-weather');
    var cityNameEl = $('#city-name');
    var weatherImgEl = $('#weather-img');
    var tempEl = $('#temperature');
    var windEl = $('#wind');
    var humidityEl = $('#humidity');
    var fiveDayEl = $('#five-day-section');
    var historyEl = $('#history');
    var forecastEl = $('#five-forecast');
    // api key for weather api
    var APIKey = "0f8eb1c52701ff5bf5bc1daccc4a58ba";
    
    // function to get current weather based on city name input
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

    // function to get 5 day forecast 
    function getForecast(cityName) {
        forecastEl.html("");
        var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: requestURL,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            fiveDayEl.removeClass("d-none");
            for (i = 0; i < response.list.length; i += 8) {
                var forecastDate = new Date(response.list[i].dt_txt);
                var forecastDay = forecastDate.getDate();
                var forecastMonth = forecastDate.getMonth() + 1;
                var forecastYear = forecastDate.getFullYear();
                console.log(forecastDate);
                var forecastIcon = response.list[i].weather[0].icon;
                var forecastColumnEl = $("<div>").addClass("col-lg-2 m-3");
                var forecastCardEl = $("<div>").addClass("card bg-info-subtle text-center");
                var forecastCardBodyEl = $("<div>").addClass("card-body");
                var cardDateEl = $("<p>").addClass("fw-bold").text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
                var cardImgEl = $("<img>");
                cardImgEl.attr("src", "https://openweathermap.org/img/wn/" + forecastIcon + ".png");
                cardImgEl.attr("alt", response.list[i].weather[0].description);
                var cardTempEl = $("<p>").text("Temperature: " + response.list[i].main.temp + " °");
                var cardWindEl = $("<p>").text("Wind: " + response.list[i].wind.speed + " MPH");
                var cardHumidityEl = $("<p>").text("Humidity: " + response.list[i].main.humidity + " %");
                forecastCardBodyEl.append(cardDateEl);
                forecastCardBodyEl.append(cardImgEl);
                forecastCardBodyEl.append(cardTempEl);
                forecastCardBodyEl.append(cardWindEl);
                forecastCardBodyEl.append(cardHumidityEl);
                forecastCardEl.append(forecastCardBodyEl);
                forecastColumnEl.append(forecastCardEl);
                forecastEl.append(forecastColumnEl);
            };
        });
    };

    // search button on click event function loading the weather and forecast 
    $(searchBtnEl).on("click", function () {
        var cityName = cityEl.val();
        getCurrentWeather(cityName);
        getForecast(cityName);
        searchHistory.push(cityName);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderHistory();
    });

    // search history/local storage variable
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log("search history: ", searchHistory);

    // local storage/search history function
    function renderHistory() {
        historyEl.text("");
        for (i = 0; i < searchHistory.length; i++) {
            var historyBtn = $("<button>");
            historyBtn.text(searchHistory[i]);
            historyBtn.attr("data-location", searchHistory[i]);
            historyBtn.attr("class", "btn btn-primary my-2 d-block")
            historyBtn.on("click", function () {
                getCurrentWeather($(this).data("location"));
                getForecast($(this).data("location"));
                console.log($(this).data("location"));
            });
            $(historyEl).append(historyBtn);
        };
    };

    renderHistory();
};

initForecast();