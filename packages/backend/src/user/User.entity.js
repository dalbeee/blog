"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var class_transformer_1 = require("class-transformer");
var comment_entity_1 = require("../comment/comment.entity");
var Post_entity_1 = require("../posts/Post.entity");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User(partial) {
        Object.assign(this, partial);
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, class_transformer_1.Exclude)(),
        (0, typeorm_1.Column)()
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "username");
    __decorate([
        (0, class_transformer_1.Exclude)(),
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Post_entity_1.Post; }, function (post) { return post.user; })
    ], User.prototype, "posts");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.user; })
    ], User.prototype, "comments");
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(function () { return ['username', 'email']; })
    ], User);
    return User;
}());
exports.User = User;
