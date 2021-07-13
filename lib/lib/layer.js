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
var tty_table_1 = __importDefault(require("tty-table"));
var path_1 = __importDefault(require("path"));
var client_1 = __importDefault(require("./client"));
var stdout_formatter_1 = __importDefault(require("../common/stdout-formatter"));
var logger_1 = __importDefault(require("../common/logger"));
var inquirer_1 = __importDefault(require("inquirer"));
function promptForConfirmOrDetails(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'prompt',
                            message: message,
                            choices: ['yes', 'no'],
                        }])];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers.prompt === 'yes'];
            }
        });
    });
}
var COMPATIBLE_RUNTIME = [
    'nodejs12',
    'nodejs10',
    'nodejs8',
    'nodejs6',
    'python3',
    'python2.7',
];
var tableShow = function (data) {
    var options = {
        borderStyle: "solid",
        borderColor: "blue",
        headerAlign: "center",
        align: "left",
        color: "cyan",
        width: "100%"
    };
    var showKey = ['layerName', 'description', 'version', 'compatibleRuntime', 'Arn'];
    var header = showKey.map(function (value) { return ({
        value: value,
        headerColor: "cyan",
        color: "cyan",
        align: "left",
        width: "auto",
        formatter: function (value) { return value; },
    }); });
    console.log(tty_table_1.default(header, data, options).render());
};
var Layer = /** @class */ (function () {
    function Layer(_a) {
        var region = _a.region, credentials = _a.credentials;
        client_1.default.setFcClient(region, credentials);
    }
    Layer.prototype.publish = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var layerName, _a, code, _b, description, _c, compatibleRuntime, codeResolvePath, zipPath, outputFileName, zipFilePath, zipFile, Arn;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        layerName = props.layerName, _a = props.code, code = _a === void 0 ? '.' : _a, _b = props.description, description = _b === void 0 ? '' : _b, _c = props.compatibleRuntime, compatibleRuntime = _c === void 0 ? COMPATIBLE_RUNTIME : _c;
                        codeResolvePath = path_1.default.resolve(code);
                        zipPath = path_1.default.join(process.cwd(), '.s', 'layer');
                        outputFileName = "catch-" + new Date().getTime() + ".zip";
                        zipFilePath = path_1.default.join(zipPath, outputFileName);
                        try {
                            fs_extra_1.default.emptyDir(zipPath);
                        }
                        catch (ex) {
                            logger_1.default.debug(ex);
                        }
                        return [4 /*yield*/, core_1.zip({
                                codeUri: codeResolvePath,
                                outputFilePath: zipPath,
                                outputFileName: outputFileName,
                            })];
                    case 1:
                        _d.sent();
                        zipFile = fs_extra_1.default.readFileSync(zipFilePath, 'base64');
                        fs_extra_1.default.removeSync(zipFilePath);
                        logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.create('layer', layerName));
                        return [4 /*yield*/, client_1.default.fcClient.publishLayerVersion(layerName, {
                                code: { zipFile: zipFile },
                                description: description,
                                compatibleRuntime: compatibleRuntime,
                            })];
                    case 2:
                        Arn = (_d.sent()).Arn;
                        logger_1.default.debug("Arn: " + Arn);
                        return [2 /*return*/, Arn];
                }
            });
        });
    };
    Layer.prototype.list = function (_a, table) {
        var prefix = _a.prefix;
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info('Getting layer list');
                        return [4 /*yield*/, client_1.default.fcClient.listLayers({ prefix: prefix })];
                    case 1:
                        list = _b.sent();
                        logger_1.default.debug("layer list: " + JSON.stringify(list));
                        if (table) {
                            tableShow(list);
                        }
                        else {
                            return [2 /*return*/, list.map(function (_a) {
                                    var layerName = _a.layerName, description = _a.description, version = _a.version, compatibleRuntime = _a.compatibleRuntime, Arn = _a.Arn;
                                    return ({ layerName: layerName, Arn: Arn, version: version, description: description, compatibleRuntime: compatibleRuntime });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Layer.prototype.versions = function (_a, table) {
        var layerName = _a.layerName;
        return __awaiter(this, void 0, void 0, function () {
            var versions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.get('layer versions', layerName));
                        return [4 /*yield*/, client_1.default.fcClient.listLayerVersions(layerName)];
                    case 1:
                        versions = _b.sent();
                        if (table) {
                            tableShow(versions);
                        }
                        else {
                            return [2 /*return*/, versions.map(function (_a) {
                                    var layerName = _a.layerName, description = _a.description, version = _a.version, compatibleRuntime = _a.compatibleRuntime, Arn = _a.Arn;
                                    return ({ layerName: layerName, Arn: Arn, version: version, description: description, compatibleRuntime: compatibleRuntime });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Layer.prototype.getVersion = function (_a) {
        var version = _a.version, layerName = _a.layerName;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.get('layer version config', layerName + "." + version));
                        return [4 /*yield*/, client_1.default.fcClient.getLayerVersion(layerName, version)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Layer.prototype.deleteVersion = function (_a) {
        var version = _a.version, layerName = _a.layerName;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!version) {
                            throw new Error('Not fount version');
                        }
                        logger_1.default.info(stdout_formatter_1.default.stdoutFormatter.remove('layer version', layerName + "." + version));
                        return [4 /*yield*/, client_1.default.fcClient.deleteLayerVersion(layerName, version)];
                    case 1:
                        data = (_b.sent()).data;
                        if (data) {
                            logger_1.default.error(data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Layer.prototype.deleteLayer = function (_a) {
        var layerName = _a.layerName, assumeYes = _a.assumeYes;
        return __awaiter(this, void 0, void 0, function () {
            var versions, meg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.versions({ layerName: layerName }, false)];
                    case 1:
                        versions = _b.sent();
                        if (!assumeYes) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.forDeleteVersion(layerName, versions)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        meg = "Whether to delete all versions of " + layerName;
                        tableShow(versions);
                        return [4 /*yield*/, promptForConfirmOrDetails(meg)];
                    case 4:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.forDeleteVersion(layerName, versions)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Layer.prototype.forDeleteVersion = function (layerName, versions) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, versions_1, version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, versions_1 = versions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < versions_1.length)) return [3 /*break*/, 4];
                        version = versions_1[_i].version;
                        return [4 /*yield*/, this.deleteVersion({ version: version, layerName: layerName })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Layer;
}());
exports.default = Layer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTRDO0FBQzVDLHNEQUEyQjtBQUMzQix3REFBOEI7QUFDOUIsOENBQXdCO0FBQ3hCLG9EQUE4QjtBQUU5QixnRkFBeUQ7QUFDekQsNERBQXNDO0FBQ3RDLHNEQUFnQztBQUVoQyxTQUFlLHlCQUF5QixDQUFDLE9BQWU7Ozs7O3dCQUNqQyxxQkFBTSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUMxQyxJQUFJLEVBQUUsTUFBTTs0QkFDWixJQUFJLEVBQUUsUUFBUTs0QkFDZCxPQUFPLFNBQUE7NEJBQ1AsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQzt5QkFDdkIsQ0FBQyxDQUFDLEVBQUE7O29CQUxHLE9BQU8sR0FBUSxTQUtsQjtvQkFFSCxzQkFBTyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBQzs7OztDQUNqQztBQUVELElBQU0sa0JBQWtCLEdBQUc7SUFDekIsVUFBVTtJQUNWLFVBQVU7SUFDVixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxXQUFXO0NBQ1osQ0FBQztBQUVGLElBQU0sU0FBUyxHQUFHLFVBQUMsSUFBSTtJQUNyQixJQUFNLE9BQU8sR0FBRztRQUNkLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFdBQVcsRUFBRSxNQUFNO1FBQ25CLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsTUFBTTtLQUNkLENBQUM7SUFFRixJQUFNLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BGLElBQU0sTUFBTSxHQUFHLE9B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