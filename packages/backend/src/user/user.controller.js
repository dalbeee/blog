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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.findAll = function () {
        return this.usersService.findAll();
    };
    UsersController.prototype.findById = function (username) {
        return this.usersService.findByName(username);
    };
    UsersController.prototype.createUser = function (user) {
        return this.usersService.createUser(user);
    };
    __decorate([
        (0, common_1.Get)()
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':username'),
        __param(0, (0, common_1.Param)('username'))
    ], UsersController.prototype, "findById");
    __decorate([
        (0, common_1.Post)('/create'),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "createUser");
    UsersController = __decorate([
        (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
        (0, common_1.Controller)('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
