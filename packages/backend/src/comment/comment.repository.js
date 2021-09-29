"use strict";
exports.__esModule = true;
exports.commentRepository = void 0;
var comment_entity_1 = require("./comment.entity");
exports.commentRepository = {
    provide: 'COMMENT_REPOSITORY',
    useFactory: function (connection) { return connection.getRepository(comment_entity_1.Comment); },
    inject: ['DATABASE_CONNECTION']
};
