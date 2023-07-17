const apiKey = 'b457a582093a49542cd7b514701843e3';
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
    })
}