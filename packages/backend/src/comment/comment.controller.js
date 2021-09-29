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
exports.CommentsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var common_2 = require("@nestjs/common");
var CommentsController = /** @class */ (function () {
    function CommentsController(commentService) {
        this.commentService = commentService;
    }
    CommentsController.prototype.getAll = function () {
        return this.commentService.getAll();
    };
    // @UseGuards(JwtAuthGuard)
    // @Post('/create')
    // test() {
    //   console.log('test');
    //   return;
    // }
    CommentsController.prototype.createCommentToPostBySlug = function (req, postSlug, comment) {
        return this.commentService.createCommentToPostBySlug(req.user, postSlug, comment);
    };
    CommentsController.prototype.deleteComment = function (req, commentId) {
        return this.commentService.deleteComment(req.user, commentId);
    };
    __decorate([
        (0, common_1.Get)()
    ], CommentsController.prototype, "getAll");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)('/create/:postSlug'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Param)('postSlug')),
        __param(2, (0, common_1.Body)())
    ], CommentsController.prototype, "createCommentToPostBySlug");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(':commentId'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Param)('commentId'))
    ], CommentsController.prototype, "deleteComment");
    CommentsController = __decorate([
        (0, common_2.UseInterceptors)(common_2.ClassSerializerInterceptor),
        (0, common_1.Controller)('comments')
    ], CommentsController);
    return CommentsController;
}());
exports.CommentsController = CommentsController;
