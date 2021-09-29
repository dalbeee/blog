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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PostsService = void 0;
var common_1 = require("@nestjs/common");
var User_entity_1 = require("../user/User.entity");
var helper = require("../utils");
var typeorm_1 = require("typeorm");
var uuid = require("uuid");
var PostsService = /** @class */ (function () {
    function PostsService(postsRepository, usersRepository) {
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
    }
    PostsService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.postsRepository.find({});
                        return [4 /*yield*/, this.postsRepository.find({
                                relations: ['user', 'comments'],
                                order: { createdAt: 'DESC' }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log('error from posts > getAll', error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostsService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var getPostResult, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postsRepository.findOne({ id: id }, { relations: ['user', 'comments', 'comments.user'] })];
                    case 1:
                        getPostResult = _a.sent();
                        // const getPostResultByBuilder = await this.postsRepository
                        //   .createQueryBuilder('post')
                        //   .where('post.id = :id', { id })
                        //   .leftJoinAndSelect('post.user', 'user')
                        //   .leftJoinAndSelect('post.comments', 'comment')
                        //   .leftJoinAndSelect('comments.user', 'user')
                        //   .getMany();
                        // console.log(getPostResultByBuilder);
                        // return getPostResultByBuilder;
                        return [2 /*return*/, getPostResult];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error from posts > getById', error_2.message);
                        message = [];
                        if (error_2 instanceof typeorm_1.QueryFailedError)
                            message.push({ message: 'post not found', status: 400 });
                        throw new common_1.HttpException({ message: message }, error_2.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostsService.prototype.getBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var getPostResult, error_3, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postsRepository.findOne({ slug: slug }, { relations: ['user', 'comments', 'comments.user'] })];
                    case 1:
                        getPostResult = _a.sent();
                        return [2 /*return*/, getPostResult];
                    case 2:
                        error_3 = _a.sent();
                        console.log('error from posts > getBySlug', error_3.message);
                        message = [];
                        if (error_3 instanceof typeorm_1.QueryFailedError)
                            message.push({ message: 'post not found', status: 400 });
                        throw new common_1.HttpException({ message: message }, error_3.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO slug에 uuid 들어간것 수정하기
    PostsService.prototype.createPost = function (_a, post) {
        var username = _a.username;
        return __awaiter(this, void 0, void 0, function () {
            var regexSelectImage, userResult, newPost, thumbnail, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        regexSelectImage = /!\[.*?\]\((.*?)\)g/;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        console.log(' from posts > createPost', post);
                        return [4 /*yield*/, this.usersRepository.findOne({ username: username })];
                    case 2:
                        userResult = _b.sent();
                        newPost = this.postsRepository.create(post);
                        newPost.user = userResult;
                        // newPost.slug = helper.slugify(post.title);
                        newPost.slug = uuid.v4();
                        // get thumbnail from content
                        try {
                            thumbnail = post.content
                                .match(/!\[.*?\]\((.*?\))/g)[0]
                                .replace(/!\[.*?\]\((.*?)\)/, '$1');
                            console.log(thumbnail);
                            newPost.thumbnail = thumbnail;
                        }
                        catch (error) {
                            console.log(error.messsage);
                            newPost.thumbnail = '';
                        }
                        newPost.description = helper.description(post.content);
                        return [4 /*yield*/, this.postsRepository.save(newPost)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        error_4 = _b.sent();
                        console.log('error from posts > createPost', error_4.message);
                        throw new common_1.HttpException(error_4.message, common_1.HttpStatus.CONFLICT);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostsService.prototype.deletePostBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postsRepository["delete"]({ slug: slug })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        console.log('error from posts > deletePostBySlug', error_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostsService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)('POST_REPOSITORY')),
        __param(1, (0, common_1.Inject)('USER_REPOSITORY'))
    ], PostsService);
    return PostsService;
}());
exports.PostsService = PostsService;
