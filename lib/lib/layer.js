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
    function Layer() {
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