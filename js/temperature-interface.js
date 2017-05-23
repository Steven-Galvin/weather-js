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
