$(document).ready(function () {

const apiKey = 'b457a582093a49542cd7b514701843e3';
var fiveDay = document.getElementById('five-day-forecast')
var container = document.getElementById('container')
var currentWeather = document.getElementById('main-forecast')
var mainFirstLine = document.getElementById('first-line forecast')
var mainSecondLine = document.getElementById('second-line forecast')
var mainThirdLine = document.getElementById('third-line forecast')
var cityName;
var latitude;
var longitude;

$('#city-input').submit(function (event) {
    event.preventDefault();
    fiveDay.innerHTML = '';
    var input = $("#city-name").val();
    cityName = input;
    getCoordinates();
});

function getCoordinates () {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    latitude = data[0].lat;
    longitude = data[0].lon;   
    getApi();
    });    
}

function getApi() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
   
    
    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);    
 
    var wind = data.list[0].wind.speed
    var temp = data.list[0].main.temp
    var humidity = data.list[0].main.humidity;
    var date = dayjs(data.list[0].dt_txt.split(' ')[0]).format('MM/DD/YYYY');
    var icon = data.list[0].weather[0].icon; 
     
    currentWeather.innerHTML= `${cityName} (${date}) <img src = 'https://openweathermap.org/img/wn/${icon}@2x.png' class= "weather-icon"></img>`;
    mainFirstLine.textContent = `Temp: ${temp}°F`
    mainSecondLine.textContent = `Wind: ${wind} MPH`
    mainThirdLine.textContent = `Humidity: ${humidity}%`   
    
    console.log(data.list.length)
    for (x = 8; x < data.list.length; x++) {
        if(x%8 === 0) {
        var windFive = data.list[x].wind.speed;
        var tempFive = data.list[x].main.temp;
        var humidityFive = data.list[x].main.humidity;
        var dateFive = dayjs(data.list[x].dt_txt.split(' ')[0]).format('MM/DD/YYYY');
        var iconFive = data.list[x].weather[0].icon; 
        $('.container-fiveday').append(`<div class='five-day-stats'>
                                            <p class='forecast'>${dateFive}</p>
                                            <p><img src = 'https://openweathermap.org/img/wn/${iconFive}@2x.png' class="fiveday-icon"></img></p>
                                            <p class='forecast'>Temp: ${tempFive}°F</p>
                                            <p class='forecast'>Wind: ${windFive} MPH</p>
                                            <p class='forecast'>Humidity: ${humidityFive}%</p>
                                        </div>`);
        }                                                 
    };
    
    $('#four-day').text('Four Day Forecast:')
    container.style.border = '2px solid black'
    
    })
}
})
