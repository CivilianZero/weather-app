// global variable for picking day of the week
var daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// create ForecastView View
function ForecastView () {
    View.apply(this, arguments);
}

// daily functions and prototype
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
};