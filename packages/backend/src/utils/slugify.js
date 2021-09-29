"use strict";
exports.__esModule = true;
exports.slugify = void 0;
var slugify = function (title) {
    var result = title.trim().split(' ').join('-');
    result = result.replace(/\//g, '-');
    return result;
};
exports.slugify = slugify;
