const apiKey = 'b457a582093a49542cd7b514701843e3';
var container = $('#container')
var currentWeather = document.getElementById('main-forecast')
var cityName;
var latitude;
var longitude;

$('#city-input').submit(function (event) {
    event.preventDefault();
    var input = $("#city-name").val();
    console.log(input);
    cityName = input;
    console.log(cityName);
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
    console.log(`${latitude}   ${longitude}`);     
    getApi();
    });    
}

function getApi() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    console.log(requestUrl);
    
    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);    
    console.log(data.list[0].main.humidity);
    console.log(data.list[0].main.temp);
    console.log(data.list[0].wind.speed);
    console.log(data.city.name);

    var date = dayjs(data.list[0].dt_txt.split(' ')[0]).format('MM/DD/YYYY');
    var icon = data.list[0].weather[0].icon; 
    currentWeather.innerHTML= `${cityName} ${date} <img src = 'https://openweathermap.org/img/wn/${icon}@2x.png' class= "weather-icon"></img>`;
    
    

    console.log(data.list[0].weather[0].icon)
    console.log(data.list[0].dt_txt)
    console.log(date);
    
    })
}

