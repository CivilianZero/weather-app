// http request function
$.ajax({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=7.899&lon=98.4&cnt=10&mode=json&appid=464dd702fe9c8db2e541721da7d8822a',
    success: function (results) {
        var overview = new Overview('main', results);
        overview.render();
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
Overview.prototype.render = function () {
    console.log(this);
    
    var { city: {name} } = this.data;
    $('h1').text(name);

    this.data.list.forEach(function (value) {
        var daily = new ForecastView('div', value);

        daily.render();
        $('main').append(daily);
    });
};

Overview.prototype.bindEvents = function () {};

// create ForecastView View
function ForecastView () {
    View.apply(this, arguments);
}

//daily functions and prototype
ForecastView.prototype = Object.create(View.prototype);
ForecastView.prototype.render = function () {
    var { speed, deg, temp: {min, max} } = this.data,
        { weather: [{main}]} = this.data,
        direction = cardinal(deg),
        d = new Date(),
        dayN = d.getDay(),
        daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        currentDay = daysOfWeek[dayN],
        date = d.getDate();


    min = convertTemp(min);
    max = convertTemp(max);
    var htmlString = `<div class="report">
            <div class="left">
                <div class="date">  
                    <h2>${currentDay}</h2>
                    <h2>${date}</h2>
                </div>
                <div class="conditions-small">
                    <img class="" src="">
                    <h4 class="">COND</h4>
                </div>
            </div>
            <div class="right">
                <div class="conditions-large">
                    <img src="">
                    <h3>CONDITIONS</h3>
                </div>
                <div class="day">
                    <h2>DAY</h2>
                </div>
                <div class="data">
                    <h4 class="wind">WIND: ${speed} ${direction}</h4>
                    <h4 class="hi">HI: ${max}</h4>
                    <h4 class="lo">LO: ${min}</h4>
                </div>  
            </div>
        </div>`;
    $('main').append(htmlString);
};

ForecastView.prototype.bindEvents = function () {};
