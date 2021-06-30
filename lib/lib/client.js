"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var logger_1 = __importDefault(require("../common/logger"));
fc2_1.default.prototype.listLayers = function (query, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data, hasNextToken, res, _a, layers, nextToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = [];
                    hasNextToken = false;
                    _b.label = 1;
                case 1: return [4 /*yield*/, Client.fcClient.get('/layers', query, headers)];
                case 2:
                    res = _b.sent();
                    logger_1.default.debug("get /laysers res: " + JSON.stringify(res));
                    _a = res.data, layers = _a.layers, nextToken = _a.nextToken;
                    if (nextToken) {
                        query.nextToken = nextToken;
                        hasNextToken = true;
                    }
                    else {
                        hasNextToken = false;
                    }
                    data = data.concat(layers);
                    _b.label = 3;
                case 3:
                    if (hasNextToken) return [3 /*break*/, 1];
                    _b.label = 4;
                case 4: return [2 /*return*/, data];
            }
        });
    });
};
fc2_1.default.prototype.listLayerVersions = function (layerName, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var data, query, res, _a, layers, nextVersion;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = [];
                    query = {
                        startVersion: 1,
                        limit: 50,
                    };
                    _b.label = 1;
                case 1: return [4 /*yield*/, Client.fcClient.get("/layers/" + layerName + "/versions", query, headers)];
                case 2:
                    res = _b.sent();
                    logger_1.default.debug("get /laysers res: " + JSON.stringify(res));
                    _a = res.data, layers = _a.layers, nextVersion = _a.nextVersion;
                    query.startVersion = nextVersion;
                    data = data.concat(layers);
                    _b.label = 3;
                case 3:
                    if (query.startVersion) return [3 /*break*/, 1];
                    _b.label = 4;
                case 4: return [2 /*return*/, data];
            }
        });
    });
};
fc2_1.default.prototype.getLayerVersion = function (layerName, version, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var versionConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Client.fcClient.get("/layers/" + layerName + "/versions/" + version, null, headers)];
                case 1:
                    versionConfig = _a.sent();
                    logger_1.default.debug("layers version: " + JSON.stringify(versionConfig));
                    return [2 /*return*/, versionConfig.data];
            }
        });
    });
};
fc2_1.default.prototype.publishLayerVersion = function (layerName, body, headers) {
    if (body === void 0) { body = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Client.fcClient.post("/layers/" + layerName + "/versions", body, headers)];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        });
    });
};
fc2_1.default.prototype.deleteLayerVersion = function (layerName, version, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Client.fcClient.delete("/layers/" + layerName + "/versions/" + version, null, headers)];
                case 1:
                    res = _a.sent();
                    logger_1.default.debug("delete version: " + JSON.stringify(res));
                    return [2 /*return*/, res];
            }
        });
    });
};
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setFcClient = function (region, credentials) {
        var AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret, SecurityToken = credentials.SecurityToken;
        var fcClient = new fc2_1.default(AccountID, {
            accessKeyID: AccessKeyID,
            accessKeySecret: AccessKeySecret,
            securityToken: SecurityToken,
            region: region,
            timeout: 6000000,
        });
        this.fcClient = fcClient;
        return fcClient;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsNERBQXNDO0FBRXRDLGFBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQWUsS0FBTSxFQUFFLE9BQVE7Ozs7OztvQkFDbkQsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDVixZQUFZLEdBQUcsS0FBSyxDQUFDOzt3QkFHWCxxQkFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFBOztvQkFBMUQsR0FBRyxHQUFHLFNBQW9EO29CQUNoRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO29CQUVuRCxLQUF3QixHQUFHLENBQUMsSUFBSSxFQUE5QixNQUFNLFlBQUEsRUFBRSxTQUFTLGVBQUEsQ0FBYztvQkFDdkMsSUFBSSxTQUFTLEVBQUU7d0JBQ2IsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7d0JBQzVCLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNMLFlBQVksR0FBRyxLQUFLLENBQUM7cUJBQ3RCO29CQUNELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7d0JBQ3JCLFlBQVk7O3dCQUVwQixzQkFBTyxJQUFJLEVBQUM7Ozs7Q0FDYixDQUFBO0FBQ0QsYUFBRSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxVQUFlLFNBQVMsRUFBRSxPQUFROzs7Ozs7b0JBQzdELElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxHQUFHO3dCQUNaLFlBQVksRUFBRSxDQUFDO3dCQUNmLEtBQUss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