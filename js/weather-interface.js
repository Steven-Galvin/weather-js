var Weather = require('./../js/weather.js').weatherModule;

var displayWeather = function(city, humidityData, windSpeedData) {

  $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%. The wind speed is " + windSpeedData + "mph.");
}

$(document).ready(function(){
  var currentWeatherObject = new Weather();
  $('#find-weather').click(function(){
    var city = $('#city').val();
    currentWeatherObject.getWeather(city, displayWeather);
  });
});
