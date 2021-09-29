"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var nest_winston_1 = require("nest-winston");
var HttpExceptionFilter = /** @class */ (function () {
    function HttpExceptionFilter(logger) {
        this.logger = logger;
    }
    HttpExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var status = exception.getStatus();
        var message = exception.getResponse();
        this.logger.warn({ message: JSON.stringify(message), status: status });
        var result = {
            isError: true,
            message: message,
            status: status
        };
        response.status(status).json(result);
    };
    HttpExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.HttpException),
        __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER))
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
}());
exports.HttpExceptionFilter = HttpExceptionFilter;
