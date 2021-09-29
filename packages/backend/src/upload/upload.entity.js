"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Upload = void 0;
var typeorm_1 = require("typeorm");
var Upload = /** @class */ (function () {
    function Upload() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Upload.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Upload.prototype, "fileName");
    __decorate([
        (0, typeorm_1.Column)()
    ], Upload.prototype, "path");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'datetime' })
    ], Upload.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt', type: 'datetime' })
    ], Upload.prototype, "updatedAt");
    Upload = __decorate([
        (0, typeorm_1.Entity)()
    ], Upload);
    return Upload;
}());
exports.Upload = Upload;
