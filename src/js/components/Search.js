// event listener for input
$('input').keypress(function(e) {
    if (e.which === 13) {
        var lat = $('#lat').val(),
            lon = $('#lon').val();
        makeWeather(lat, lon);
    }
});