"use strict";
exports.__esModule = true;
exports.userRepository = void 0;
var User_entity_1 = require("./User.entity");
exports.userRepository = {
    provide: 'USER_REPOSITORY',
    useFactory: function (connection) { return connection.getRepository(User_entity_1.User); },
    inject: ['DATABASE_CONNECTION']
};
