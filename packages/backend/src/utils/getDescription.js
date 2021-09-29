"use strict";
exports.__esModule = true;
exports.getDescription = void 0;
var exclude = [];
var getDescription = function (string) {
    // console.log('getDescrpition', string);
    var data = string;
    data = data.trim();
    try {
        exclude.map(function (exc) { return (data = data.replace(exc, data)); });
        data = data.substr(0, 100);
        return data;
    }
    catch (error) {
        console.log('error', error.mssage);
        throw new Error(error.message);
    }
};
exports.getDescription = getDescription;
