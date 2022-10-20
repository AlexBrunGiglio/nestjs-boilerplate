"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIS = void 0;
__exportStar(require("./auth.service"), exports);
const auth_service_1 = require("./auth.service");
__exportStar(require("./files.service"), exports);
const files_service_1 = require("./files.service");
__exportStar(require("./logs.service"), exports);
const logs_service_1 = require("./logs.service");
__exportStar(require("./referential.service"), exports);
const referential_service_1 = require("./referential.service");
__exportStar(require("./stats.service"), exports);
const stats_service_1 = require("./stats.service");
__exportStar(require("./users.service"), exports);
const users_service_1 = require("./users.service");
__exportStar(require("./usersRoles.service"), exports);
const usersRoles_service_1 = require("./usersRoles.service");
exports.APIS = [auth_service_1.AuthService, files_service_1.FilesService, logs_service_1.LogsService, referential_service_1.ReferentialService, stats_service_1.StatsService, users_service_1.UsersService, usersRoles_service_1.UsersRolesService];
