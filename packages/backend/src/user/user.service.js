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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var UserService = /** @class */ (function () {
    function UserService(userRepository) {
        this.userRepository = userRepository;
    }
    UserService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log('error from user > findAll', error_1.message);
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findByName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({ username: username }, { relations: ['posts', 'comments'] })];
                    case 1:
                        result = _a.sent();
                        // TODO httpException 을 던져서 스택에서 못잡으면 500 에러를 띄운다 -> 어떻게 에러를 계속 전달?
                        // if (!result)
                        //   throw new HttpException({ target: 'id', message: 'id not found' }, 400);
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error from user > findByName', error_2.message);
                        throw Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, error_3, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1:
                        newUser = _a.sent();
                        console.log(newUser);
                        return [2 /*return*/, newUser];
                    case 2:
                        error_3 = _a.sent();
                        message = [];
                        console.log('error from user > createUser', error_3.message);
                        if (error_3 instanceof typeorm_1.QueryFailedError)
                            message.push({ code: 401, message: 'duplicate' });
                        throw new common_1.HttpException({ error: message }, common_1.HttpStatus.CONFLICT);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO 마무리
    UserService.prototype.deleteUser = function (_a) {
        var username = _a.username;
        return __awaiter(this, void 0, void 0, function () {
            var userData, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({ username: username })];
                    case 1:
                        userData = _b.sent();
                        userData.posts = null;
                        return [4 /*yield*/, this.userRepository.save(userData)];
                    case 2:
                        result = _b.sent();
                        console.log(result);
                        return [4 /*yield*/, this.userRepository["delete"]({ username: username })];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        error_4 = _b.sent();
                        console.log('error from user > deleteUser', error_4.message);
                        throw new Error(error_4.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)('USER_REPOSITORY'))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
