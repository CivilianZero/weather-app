// convert to F
function convertTemp(temp) {
    return Math.round(temp * (9 / 5) - 459.67);
}

// convert degrees to cardinal direction
function cardinal(deg) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
}