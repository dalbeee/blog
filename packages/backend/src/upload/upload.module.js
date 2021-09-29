"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadModule = void 0;
var common_1 = require("@nestjs/common");
var db_module_1 = require("../db/db.module");
var upload_controller_1 = require("./upload.controller");
var upload_service_1 = require("./upload.service");
var upload_repository_1 = require("./upload.repository");
var UploadModule = /** @class */ (function () {
    function UploadModule() {
    }
    UploadModule = __decorate([
        (0, common_1.Module)({
            imports: [db_module_1.DatabaseModule],
            controllers: [upload_controller_1.UploadController],
            providers: [upload_service_1.UploadService, upload_repository_1.uploadRepository]
        })
    ], UploadModule);
    return UploadModule;
}());
exports.UploadModule = UploadModule;
