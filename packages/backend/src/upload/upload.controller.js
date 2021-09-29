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
exports.UploadController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var uuid_1 = require("uuid");
var UploadController = /** @class */ (function () {
    function UploadController(uploadService) {
        this.uploadService = uploadService;
    }
    UploadController.prototype.getAllUploadedFiles = function () {
        return this.uploadService.getAllUploadedFiles();
    };
    UploadController.prototype.uploadFile = function (file, req) {
        console.log(req.headers);
        if (!file) {
            throw new common_1.HttpException('not supported file', 400);
        }
        return this.uploadService.saveFileDataToDB(file);
    };
    UploadController.prototype.DeleteFile = function (req) {
        console.log('delete call', req.file);
        return;
    };
    __decorate([
        (0, common_1.Get)()
    ], UploadController.prototype, "getAllUploadedFiles");
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
            storage: (0, multer_1.diskStorage)({
                destination: './uploads',
                filename: function (req, file, cb) {
                    var randomName = (0, uuid_1.v4)();
                    var fileName = randomName + "-" + file.originalname;
                    return cb(null, fileName);
                }
            }),
            limits: { fileSize: 1024 * 1024 * 5 },
            //
            fileFilter: function (req, file, cb) {
                console.log(file.mimetype);
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/))
                    return cb(null, true);
                return cb(null, false);
            }
        })),
        __param(0, (0, common_1.UploadedFile)()),
        __param(1, (0, common_1.Req)())
    ], UploadController.prototype, "uploadFile");
    __decorate([
        (0, common_1.Delete)('upload'),
        __param(0, (0, common_1.Req)())
    ], UploadController.prototype, "DeleteFile");
    UploadController = __decorate([
        (0, common_1.Controller)('upload')
    ], UploadController);
    return UploadController;
}());
exports.UploadController = UploadController;
