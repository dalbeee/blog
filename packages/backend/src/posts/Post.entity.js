"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Post = void 0;
var category_entity_1 = require("../category/category.entity");
var comment_entity_1 = require("../comment/comment.entity");
var tag_entity_1 = require("../tag/tag.entity");
var upload_entity_1 = require("../upload/upload.entity");
var User_entity_1 = require("../user/User.entity");
var typeorm_1 = require("typeorm");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Post.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 5000 })
    ], Post.prototype, "content");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "thumbnail");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "slug");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'datetime' })
    ], Post.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt', type: 'datetime' })
    ], Post.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.posts; })
    ], Post.prototype, "user");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return category_entity_1.Category; }, function (category) { return category.posts; })
    ], Post.prototype, "category");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return tag_entity_1.Tag; }, { nullable: true })
    ], Post.prototype, "tags");
    __decorate([
        (0, typeorm_1.JoinColumn)(),
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.post; }, {
            cascade: true,
            onDelete: 'SET NULL'
        })
    ], Post.prototype, "comments");
    Post = __decorate([
        (0, typeorm_1.Entity)()
    ], Post);
    return Post;
}());
exports.Post = Post;
