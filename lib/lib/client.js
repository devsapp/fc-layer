"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var core = __importStar(require("@serverless-devs/core"));
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
        return __awaiter(this, void 0, void 0, function () {
            var AccountID, AccessKeyID, AccessKeySecret, SecurityToken, fcClient, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret, SecurityToken = credentials.SecurityToken;
                        _a = fc2_1.default.bind;
                        _b = [void 0, AccountID];
                        _c = {
                            region: region
                        };
                        return [4 /*yield*/, this.getFcEndpoint()];
                    case 1:
                        fcClient = new (_a.apply(fc2_1.default, _b.concat([(_c.endpoint = _d.sent(),
                                _c.accessKeyID = AccessKeyID,
                                _c.accessKeySecret = AccessKeySecret,
                                _c.securityToken = SecurityToken,
                                _c.timeout = 6000000,
                                _c)])))();
                        this.fcClient = fcClient;
                        return [2 /*return*/, fcClient];
                }
            });
        });
    };
    Client.getFcEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault, fcEndpoint, enableFcEndpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                    case 2:
                        fcEndpoint = _a.sent();
                        if (!fcEndpoint) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                    case 3:
                        enableFcEndpoint = _a.sent();
                        return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQStCO0FBQy9CLDBEQUE4QztBQUM5Qyw0REFBc0M7QUFFdEMsYUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBZSxLQUFNLEVBQUUsT0FBUTs7Ozs7O29CQUNuRCxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNWLFlBQVksR0FBRyxLQUFLLENBQUM7O3dCQUdYLHFCQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUExRCxHQUFHLEdBQUcsU0FBb0Q7b0JBQ2hFLGdCQUFNLENBQUMsS0FBSyxDQUFDLHVCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7b0JBRW5ELEtBQXdCLEdBQUcsQ0FBQyxJQUFJLEVBQTlCLE1BQU0sWUFBQSxFQUFFLFNBQVMsZUFBQSxDQUFjO29CQUN2QyxJQUFJLFNBQVMsRUFBRTt3QkFDYixLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzt3QkFDNUIsWUFBWSxHQUFHLElBQUksQ0FBQztxQkFDckI7eUJBQU07d0JBQ0wsWUFBWSxHQUFHLEtBQUssQ0FBQztxQkFDdEI7b0JBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozt3QkFDckIsWUFBWTs7d0JBRXBCLHNCQUFPLElBQUksRUFBQzs7OztDQUNiLENBQUE7QUFDRCxhQUFFLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFVBQWUsU0FBUyxFQUFFLE9BQVE7Ozs7OztvQkFDN0QsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDUixLQUFLLEdBQUc7d0JBQ1osWUFBWSxFQUFFLENBQUM7d0JBQ2YsS0FBSyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQTs7d0JBR2EscUJBQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBVyxTQUFTLGNBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUFoRixHQUFHLEdBQUcsU0FBMEU7b0JBQ3RGLGdCQUFNLENBQUMsS0FBSyxDQUFDLHVCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7b0JBRW5ELEtBQTBCLEdBQUcsQ0FBQyxJQUFJLEVBQWhDLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUEsQ0FBYztvQkFDekMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7b0JBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7d0JBQ3JCLEtBQUssQ0FBQyxZQUFZOzt3QkFFMUIsc0JBQU8sSUFBSSxFQUFDOzs7O0NBQ2IsQ0FBQTtBQUNELGFBQUUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQWUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFROzs7Ozt3QkFDbEQscUJBQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBVyxTQUFTLGtCQUFhLE9BQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUFwRyxhQUFhLEdBQUcsU0FBb0Y7b0JBQzFHLGdCQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBRyxDQUFDLENBQUE7b0JBQ2hFLHNCQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUM7Ozs7Q0FDM0IsQ0FBQTtBQUNELGFBQUUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsVUFBZSxTQUFTLEVBQUUsSUFBUyxFQUFFLE9BQVE7SUFBbkIscUJBQUEsRUFBQSxTQUFTOzs7O3dCQUM1RCxxQkFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFXLFNBQVMsY0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQTt3QkFBbEYsc0JBQU8sQ0FBQyxTQUEwRSxDQUFDLENBQUMsSUFBSSxFQUFDOzs7O0NBQzFGLENBQUE7QUFDRCxhQUFFLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLFVBQWUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFROzs7Ozt3QkFDL0QscUJBQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBVyxTQUFTLGtCQUFhLE9BQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE3RixHQUFHLEdBQUcsU0FBdUY7b0JBQ25HLGdCQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7b0JBQ3ZELHNCQUFPLEdBQUcsRUFBQzs7OztDQUNaLENBQUE7QUFFRDtJQUFBO0lBZ0NBLENBQUM7SUE3QmMsa0JBQVcsR0FBeEIsVUFBeUIsTUFBYyxFQUFFLFdBQVc7Ozs7Ozt3QkFFaEQsU0FBUyxHQUlQLFdBQVcsVUFKSixFQUNULFdBQVcsR0FHVCxXQUFXLFlBSEYsRUFDWCxlQUFlLEdBRWIsV0FBVyxnQkFGRSxFQUNmLGFBQWEsR0FDWCxXQUFXLGNBREEsQ0FDQzs2QkFFSyxhQUFFO3NDQUFDLFNBQVM7OzRCQUMvQixNQUFNLFFBQUE7O3dCQUNJLHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBRmhDLFFBQVEsR0FBRyxjQUFJLGFBQUUsY0FFckIsV0FBUSxHQUFFLFNBQTBCO2dDQUNwQyxjQUFXLEdBQUUsV0FBVztnQ0FDeEIsa0JBQWUsR0FBRSxlQUFlO2dDQUNoQyxnQkFBYSxHQUFFLGFBQWE7Z0NBQzVCLFVBQU8sR0FBRSxPQUFPO3lDQUNoQjt3QkFFRixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFFekIsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2pCO0lBRW9CLG9CQUFhLEdBQWxDOzs7Ozs0QkFDb0IscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBMUQsU0FBUyxHQUFHLFNBQThDO3dCQUNyQyxxQkFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUE7O3dCQUFqRSxVQUFVLEdBQVcsU0FBNEM7d0JBQ3ZFLElBQUksQ0FBQyxVQUFVLEVBQUU7NEJBQUUsc0JBQU8sU0FBUyxFQUFDO3lCQUFFO3dCQUNSLHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUFBOzt3QkFBM0UsZ0JBQWdCLEdBQVEsU0FBbUQ7d0JBQ2pGLHNCQUFPLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxJQUFJLGdCQUFnQixLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQzs7OztLQUM1RjtJQUNILGFBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDIn0=