// http request function
function makeWeather (lat, lon) { 
    lat = lat || '7.899';
    lon = lon || '98.4';
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=10&mode=json&appid=464dd702fe9c8db2e541721da7d8822a';

    $.ajax({
        url: url,
        success: function (results) {
            var overview = new Overview('main', results);
            overview.render();
        }
    });
}

makeWeather();