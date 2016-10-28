// convert to F
function convertTemp(temp) {
    return Math.round(temp * (9 / 5) - 459.67);
}

// convert degrees to cardinal direction
function cardinal(deg) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
}

// choose which image to use for weather description
function insertImage (main) {
    if (main === 'Clear') {
        return 'images/clear.svg';
    } else if (main === 'Clouds') {
        return 'images/cloudy.svg';
    } else {
        return 'images/rain.svg';
    }
}