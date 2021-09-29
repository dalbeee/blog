"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var user_module_1 = require("./user/user.module");
var post_module_1 = require("./posts/post.module");
var comment_module_1 = require("./comment/comment.module");
var auth_module_1 = require("./auth/auth.module");
var upload_module_1 = require("./upload/upload.module");
var db_module_1 = require("./db/db.module");
var nest_winston_1 = require("nest-winston");
var winston = require("winston");
var core_1 = require("@nestjs/core");
var httpException_filter_1 = require("./filter/httpException.filter");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                nest_winston_1.WinstonModule.forRoot({
                    transports: [
                        new winston.transports.File({
                            filename: './log/error.log',
                            level: 'error'
                        }),
                        new winston.transports.File({ filename: './log/combined.log' }),
                        new winston.transports.Console({
                            format: winston.format.combine(winston.format.simple(), nest_winston_1.utilities.format.nestLike())
                        }),
                    ]
                }),
                db_module_1.DatabaseModule,
                user_module_1.UsersModule,
                post_module_1.PostsModule,
                comment_module_1.CommentsModule,
                auth_module_1.AuthModule,
                upload_module_1.UploadModule,
            ],
            providers: [
                {
                    provide: core_1.APP_FILTER,
                    useClass: httpException_filter_1.HttpExceptionFilter
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
