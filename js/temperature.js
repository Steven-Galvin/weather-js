var apiKey = require('./../.env').apiKey;

function Temperature(){
}

Temperature.prototype.getTemperature = function(city, tempType, displayTemperature) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey) .then(function(response) {
    var temp = 0;
    var response = response.main.temp;
    function getTemp(response){
      if (tempType === "fahrenheit") {
        temp = 1.8 * (parseInt(response) - 273) + 32;
      } else if (tempType === "celsius") {
        temp = parseInt(response) - 273;
      }
      return temp;
    };
    displayTemperature(city, tempType, temp);
  }).fail(function(error) {
    $('.showTemperature').text(error.responseJSON.message);
  });
}

exports.temperatureModule = Temperature;
