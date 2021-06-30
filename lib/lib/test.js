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
var core_1 = require("@serverless-devs/core");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var client_1 = __importDefault(require("./client"));
var index_1 = require("./utils/index");
var logger_1 = __importDefault(require("../common/logger"));
var prefix = 'function-component-system-layer-';
var getLayerName = function (serviceName) { return "" + prefix + serviceName; };
var Layer = /** @class */ (function () {
    function Layer(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Layer.prototype.getLayerConfig = function (serviceName, functionPath) {
        return __awaiter(this, void 0, void 0, function () {
            var layerName, listLayers, _i, listLayers_1, layerItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layerName = getLayerName(serviceName);
                        return [4 /*yield*/, client_1.default.fcClient.listLayers({ prefix: prefix })];
                    case 1:
                        listLayers = _a.sent();
                        for (_i = 0, listLayers_1 = listLayers; _i < listLayers_1.length; _i++) {
                            layerItem = listLayers_1[_i];
                            if (layerItem.layerName === layerName) {
                                return [2 /*return*/, layerItem.Arn];
                            }
                        }
                        return [4 /*yield*/, this.publishLayerVersion(serviceName, functionPath)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Layer.prototype.publishLayerVersion = function (serviceName, functionPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, functionResolvePath, layerModulesPath, layerName, coreVersion, zipPath, zipCatchPath, codeUri, zipFile, Arn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = index_1.getLayerPaths(functionPath), functionResolvePath = _a.functionResolvePath, layerModulesPath = _a.layerModulesPath;
                        layerName = getLayerName(serviceName);
                        coreVersion = index_1.getCoreVerison(functionResolvePath);
                        logger_1.default.debug("layer core version: " + coreVersion + ",modules path: " + layerModulesPath);
                        zipPath = path_1.default.join(process.cwd(), '.s', 'functionComponent');
                        zipCatchPath = path_1.default.join(zipPath, 'catch');
                        codeUri = path_1.default.join(zipCatchPath, 'nodejs', 'node_modules');
                        try {
                            fs_extra_1.default.removeSync(zipPath);
                            fs_extra_1.default.emptyDir(zipPath);
                        }
                        catch (ex) {
                            logger_1.default.debug(ex);
                        }
                        return [4 /*yield*/, fs_extra_1.default.copy(layerModulesPath, codeUri)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, core_1.zip({
                                codeUri: zipCatchPath,
                                outputFilePath: zipPath,
                                outputFileName: 'catch.zip'
                            })];
                    case 2:
                        _b.sent();
                        zipFile = fs_extra_1.default.readFileSync(path_1.default.join(zipPath, 'catch.zip'), 'base64');
                        fs_extra_1.default.removeSync(zipPath);
                        return [4 /*yield*/, client_1.default.fcClient.publishLayerVersion(layerName, {
                                code: { zipFile: zipFile },
                                description: JSON.stringify({ version: coreVersion }),
                                compatibleRuntime: [
                                    'nodejs12',
                                    'nodejs10',
                                    'nodejs8',
                                    'nodejs6',
                                ]
                            })];
                    case 3:
                        Arn = (_b.sent()).Arn;
                        return [2 /*return*/, Arn];
                }
            });
        });
    };
    return Layer;
}());
exports.default = Layer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE0QztBQUM1QyxzREFBMkI7QUFDM0IsOENBQXdCO0FBQ3hCLG9EQUE4QjtBQUM5Qix1Q0FBOEQ7QUFDOUQsNERBQXNDO0FBRXRDLElBQU0sTUFBTSxHQUFHLGtDQUFrQyxDQUFDO0FBQ2xELElBQU0sWUFBWSxHQUFHLFVBQUEsV0FBVyxJQUFJLE9BQUEsS0FBRyxNQUFNLEdBQUcsV0FBYSxFQUF6QixDQUF5QixDQUFDO0FBRTlEO0lBQ0UsZUFBWSxFQUF1QjtZQUFyQixNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBO1FBQy9CLGdCQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUssOEJBQWMsR0FBcEIsVUFBcUIsV0FBVyxFQUFFLFlBQVk7Ozs7Ozt3QkFDdEMsU0FBUyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDekIscUJBQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBekQsVUFBVSxHQUFHLFNBQTRDO3dCQUUvRCxXQUFrQyxFQUFWLHlCQUFVLEVBQVYsd0JBQVUsRUFBVixJQUFVLEVBQUU7NEJBQXpCLFNBQVM7NEJBQ2xCLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0NBQ3JDLHNCQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUM7NkJBQ3RCO3lCQUNGO3dCQUVNLHFCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEVBQUE7NEJBQWhFLHNCQUFPLFNBQXlELEVBQUM7Ozs7S0FDbEU7SUFFSyxtQ0FBbUIsR0FBekIsVUFBMEIsV0FBVyxFQUFFLFlBQVk7Ozs7Ozt3QkFDM0MsS0FHRixxQkFBYSxDQUFDLFlBQVksQ0FBQyxFQUY3QixtQkFBbUIseUJBQUEsRUFDbkIsZ0JBQWdCLHNCQUFBLENBQ2M7d0JBQzFCLFNBQVMsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRXRDLFdBQVcsR0FBRyxzQkFBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBQ3hELGdCQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF1QixXQUFXLHVCQUFrQixnQkFBa0IsQ0FBQyxDQUFDO3dCQUUvRSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7d0JBQzlELFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDM0MsT0FBTyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFFbEUsSUFBSTs0QkFDRixrQkFBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDeEIsa0JBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3ZCO3dCQUFDLE9BQU0sRUFBRSxFQUFFOzRCQUNWLGdCQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNsQjt3QkFDRCxxQkFBTSxrQkFBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXpDLFNBQXlDLENBQUM7d0JBRTFDLHFCQUFNLFVBQUcsQ0FBQztnQ0FDUixPQUFPLEVBQUUsWUFBWTtnQ0FDckIsY0FBYyxFQUFFLE9BQU87Z0NBQ3ZCLGNBQWMsRUFBRSxXQUFXOzZCQUM1QixDQUFDLEVBQUE7O3dCQUpGLFNBSUUsQ0FBQzt3QkFDRyxPQUFPLEdBQUcsa0JBQUcsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQzVFLGtCQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUVSLHFCQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRTtnQ0FDbkUsSUFBSSxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUU7Z0NBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO2dDQUNyRCxpQkFBaUIsRUFBRTtvQ0FDakIsVUFBVTtvQ0FDVixVQUFVO29DQUNWLFNBQVM7b0NBQ1QsU0FBUztpQ0FDVjs2QkFDRixDQUFDLEVBQUE7O3dCQVRNLEdBQUcsR0FBSyxDQUFBLFNBU2QsQ0FBQSxJQVRTO3dCQVdYLHNCQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBQ0gsWUFBQztBQUFELENBQUMsQUE3REQsSUE2REMifQ==