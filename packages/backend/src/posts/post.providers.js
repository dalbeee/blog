"use strict";
exports.__esModule = true;
exports.postRepository = void 0;
var Post_entity_1 = require("./Post.entity");
exports.postRepository = {
    provide: 'POST_REPOSITORY',
    useFactory: function (connection) { return connection.getRepository(Post_entity_1.Post); },
    inject: ['DATABASE_CONNECTION']
};
