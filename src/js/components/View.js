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