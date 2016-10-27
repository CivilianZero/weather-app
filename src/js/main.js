var daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

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
    return directions[Math.round(deg / 45) % 8];
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
    var { city: {name, country} } = this.data,
        header = name + ', ' + country;
    $('header > h2').text(header);

    this.data.list.forEach(function (value) {
        var daily = new ForecastView('div', value);

        daily.render();
        $('main').append(daily);
    });
    this.bindEvents();
};

Overview.prototype.bindEvents = function () {
    $('.report').click(function() {
        $(this).toggleClass('selected');
        // $('.conditions-small, .day, .data').addClass('hidden');
        // $('.conditions-large, .date').removeClass('hidden');
        // $('.report').removeClass('selected');
        // $(this).toggleClass('selected');
        // $(this).find('.date, .conditions-large, .conditions-small, .data, .day').toggleClass('hidden');
    });
};

// create ForecastView View
function ForecastView () {
    View.apply(this, arguments);
}

function insertImage (main) {
    if (main === 'Clear') {
        return 'images/clear.svg';
    } else if (main === 'Clouds') {
        return 'images/cloudy.svg';
    } else {
        return 'images/rain.svg';
    }
}

//daily functions and prototype
ForecastView.prototype = Object.create(View.prototype);
ForecastView.prototype.render = function () {
    var { speed, deg, temp: {min, max} } = this.data,
        { weather: [{main}]} = this.data,
        { dt } = this.data,
        direction = cardinal(deg),
        d = new Date(dt * 1000),
        dayN = d.getDay(),
        currentDay = daysOfWeek[dayN],
        date = d.getDate(),
        conditions = main;

    main = insertImage(main);

    min = convertTemp(min);
    max = convertTemp(max);
    var htmlString = `<section class="report">
            <div class="left">
                <div class="date">  
                    <h2>${currentDay}</h2>
                    <h2>${date}</h2>
                </div>
                <div class="conditions-small hidden">
                    <img src="${main}">
                    <h4>${conditions}</h4>
                </div>
            </div>
            <div class="right">
                <div class="conditions-large">
                    <img src="${main}">
                    <h3>${conditions}</h3>
                </div>
                <div class="day hidden">
                    <h2>${currentDay}</h2>
                </div>
                <div class="data hidden">
                    <h4>WIND: ${speed} ${direction}</h4>
                    <h4>HI: ${max}</h4>
                    <h4>LO: ${min}</h4>
                </div>  
            </div>
        </section>`;
    $('main').append(htmlString);
    this.bindEvents();
};