"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tag = void 0;
var Post_entity_1 = require("../posts/Post.entity");
var typeorm_1 = require("typeorm");
var Tag = /** @class */ (function () {
    function Tag() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Tag.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Tag.prototype, "name");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Post_entity_1.Post; }, { nullable: true }),
        (0, typeorm_1.JoinTable)()
    ], Tag.prototype, "posts");
    Tag = __decorate([
        (0, typeorm_1.Entity)()
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
