// create Overview View
function Overview () {
    View.apply(this, arguments);
}

// overview functions and prototype
Overview.prototype = Object.create(View.prototype);
Overview.prototype.render = function () {
    $('main').empty();
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
        $('.report').removeClass('selected');
        $(this).toggleClass('selected');
    });
};