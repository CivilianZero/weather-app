var data;
// http request
$.ajax({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=7.899&lon=98.4&cnt=10&mode=json&appid=464dd702fe9c8db2e541721da7d8822a',
    // method: 'GET',
    success: function (results) {
        data = results;
    }
});

// convert to F
function convertTemp(temp) {
    return Math.round(temp * (9 / 5) - 459.67);
}

// convert degrees to cardinal direction
function cardinal(deg) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round((deg / 45) % 8)];
}

// View prototype
function View (tagName, obj) {
    this.element = $('<' + tagName + '/>');
    this.data = obj || null;
}

// add View prototype functions
View.prototype.render = function () {};
View.prototype.bindEvents = function () {};
View.prototype.destroy = function () {
    $(this).remove();
};

// create Overview View
function Overview () {
    View.apply(this, arguments);
}

// overview functions and prototype
Overview.prototype = Object.create(View.prototype);
Overview.prototype.render = function () {};
Overview.prototype.bindEvents = function () {};

// create Daily View
function Daily () {
    View.apply(this, arguments);
}

//daily functions and prototype
Daily.prototype = Object.create(View.prototype);
Daily.prototype.render = function () {};
Daily.prototype.bindEvents = function () {};










