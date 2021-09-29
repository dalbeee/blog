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
exports.PostsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var PostsController = /** @class */ (function () {
    function PostsController(postsService) {
        this.postsService = postsService;
    }
    PostsController.prototype.getAll = function () {
        return this.postsService.getAll();
    };
    PostsController.prototype.getById = function (id) {
        return this.postsService.getById(id);
    };
    PostsController.prototype.getBySlug = function (slug) {
        return this.postsService.getBySlug(slug);
    };
    PostsController.prototype.createPost = function (req, post) {
        console.log('requser', req.user);
        return this.postsService.createPost(req.user, post);
    };
    // @UseGuards(JwtAuthGuard)
    // @Delete(':id')
    // deletePost(@Param('id') id: number) {
    //   return this.postsService.deletePost(id);
    // }
    PostsController.prototype.deletePostBySlug = function (slug) {
        return this.postsService.deletePostBySlug(slug);
    };
    __decorate([
        (0, common_1.Get)()
    ], PostsController.prototype, "getAll");
    __decorate([
        (0, common_1.Get)('/getById/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], PostsController.prototype, "getById");
    __decorate([
        (0, common_1.Get)(':slug'),
        __param(0, (0, common_1.Param)('slug'))
    ], PostsController.prototype, "getBySlug");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)('/create'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Body)())
    ], PostsController.prototype, "createPost");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(':slug'),
        __param(0, (0, common_1.Param)('slug'))
    ], PostsController.prototype, "deletePostBySlug");
    PostsController = __decorate([
        (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
        (0, common_1.Controller)('posts')
    ], PostsController);
    return PostsController;
}());
exports.PostsController = PostsController;
