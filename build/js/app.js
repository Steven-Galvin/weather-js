(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "c718ecb66ef914dce55c5908514933c6";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Temperature(){
}

Temperature.prototype.getTemperature = function(city, tempType, displayTemperature) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey) .then(function(response) {
    var temp = 0;
    getTemp(response)
    function getTemp(response){
      console.log(response);
      if (tempType === "fahrenheit") {
        temp = 1.8 * (parseInt(response.main.temp) - 273) + 32;
      } else if (tempType === "celsius") {
        temp = parseInt(response.main.temp) - 273;
      }
      return temp;
    };
    displayTemperature(city, tempType, temp);
  }).fail(function(error) {
    $('.showTemperature').text(error.responseJSON.message);
  });
}

exports.temperatureModule = Temperature;

},{"./../.env":1}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Weather(){
}

Weather.prototype.getWeather = function(city, displayWeather) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey) .then(function(response) {
    displayWeather(city, response.main.humidity, response.wind.speed);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
}

exports.weatherModule = Weather;

},{"./../.env":1}],4:[function(require,module,exports){
var Temperature = require('./../js/temperature.js').temperatureModule;

var displayTemperature = function(city, tempType, temp) {
  $('.showTemperature').text("The current temperature in " + city + " is " + temp + " degrees " + tempType + ".");
}


$(document).ready(function() {
  var currentTemperatureObject = new Temperature();
  $('#find-temperature').click(function() {
    var city = $('#city').val();
    var tempType = $('input[name=temp-type]:checked').val();
    currentTemperatureObject.getTemperature(city, tempType, displayTemperature)
  });
});

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

},{"./../js/temperature.js":2,"./../js/weather.js":3}]},{},[4]);
