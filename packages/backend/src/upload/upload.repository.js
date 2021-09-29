"use strict";
exports.__esModule = true;
exports.uploadRepository = void 0;
var upload_entity_1 = require("./upload.entity");
exports.uploadRepository = {
    provide: 'UPLOAD_REPOSITORY',
    useFactory: function (connection) { return connection.getRepository(upload_entity_1.Upload); },
    inject: ['DATABASE_CONNECTION']
};
