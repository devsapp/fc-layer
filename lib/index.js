"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var core = __importStar(require("@serverless-devs/core"));
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
var help_constant = __importStar(require("./lib/help"));
var stdout_formatter_1 = __importDefault(require("./common/stdout-formatter"));
var layer_1 = __importDefault(require("./lib/layer"));
var client_1 = __importDefault(require("./lib/client"));
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.publish = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, layer, arn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs, 'publish')];
                    case 1:
                        _a = _b.sent(), help = _a.help, props = _a.props;
                        if (help) {
                            core.help(help_constant.PUBLISH);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _b.sent();
                        layer = new layer_1.default();
                        return [4 /*yield*/, layer.publish(props)];
                    case 3:
                        arn = _b.sent();
                        _super.prototype.__report.call(this, {
                            name: 'fc-layer',
                            content: { arn: arn, region: props.region }
                        });
                        return [2 /*return*/, arn];
                }
            });
        });
    };
    ComponentDemo.prototype.list = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, table, layer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs, 'list')];
                    case 1:
                        _a = _b.sent(), help = _a.help, props = _a.props, table = _a.table;
                        if (help) {
                            core.help(help_constant.LIST);
                            return [2 /*return*/];
                        }
                        layer = new layer_1.default();
                        return [4 /*yield*/, layer.list({ prefix: props.prefix }, table)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.versions = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, table, layer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs, 'versions')];
                    case 1:
                        _a = _b.sent(), help = _a.help, props = _a.props, table = _a.table;
                        if (help) {
                            core.help(help_constant.VERSIONS);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _b.sent();
                        layer = new layer_1.default();
                        return [4 /*yield*/, layer.versions({ layerName: props.layerName }, table)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.versionConfig = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, layer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs, 'versionConfig')];
                    case 1:
                        _a = _b.sent(), help = _a.help, props = _a.props;
                        if (help) {
                            core.help(help_constant.VERSION_CONFIG);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _b.sent();
                        layer = new layer_1.default();
                        return [4 /*yield*/, layer.getVersion({ version: props.version, layerName: props.layerName })];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.deleteVersion = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, layer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs, 'deleteVersion')];
                    case 1:
                        _a = _b.sent(), help = _a.help, props = _a.props;
                        if (help) {
                            core.help(help_constant.DELETE_VERSION);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _b.sent();
                        layer = new layer_1.default();
                        return [4 /*yield*/, layer.deleteVersion({ version: props.version, layerName: props.layerName })];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.deleteLayer = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, help, props, layer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs, 'deleteLayer')];
                    case 1:
                        _a = _b.sent(), help = _a.help, props = _a.props;
                        if (help) {
                            core.help(help_constant.DELETE_LAYER);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _b.sent();
                        layer = new layer_1.default();
                        return [4 /*yield*/, layer.deleteLayer({ layerName: props.layerName, assumeYes: props.assumeYes })];
                    case 3:
                        _b.sent();
                        _super.prototype.__report.call(this, {
                            name: 'fc-layer',
                            content: { arn: '', region: props.region }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.handlerInputs = function (inputs, command) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, props, region, layerName, compatibleRuntime, version, endProps, credentials, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                        parsedArgs = core.commandParse(inputs, {
                            boolean: ['help', 'table', 'y'],
                            string: ['region', 'layer-name', 'code', 'description', 'compatible-runtime', 'prefix'],
                            number: ['version-id'],
                            alias: { help: 'h', 'assume-yes': 'y', }
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        if (parsedData.help) {
                            core.reportComponent('fc-layer', { command: command, uid: ((_a = inputs.credentials) === null || _a === void 0 ? void 0 : _a.AccountID) || '' });
                            return [2 /*return*/, { help: true }];
                        }
                        props = inputs.props || {};
                        region = parsedData.region || props.region;
                        if (!region) {
                            throw new Error("Not fount region");
                        }
                        layerName = parsedData['layer-name'] || props.layerName;
                        if (!layerName && command !== 'list') {
                            throw new Error("Not fount layerName");
                        }
                        compatibleRuntime = props.compatibleRuntime;
                        if (parsedData['compatible-runtime']) {
                            compatibleRuntime = parsedData['compatible-runtime'].split(',');
                        }
                        version = parsedData['version-id'] || props.version || props.versionId;
                        if (!version && command === 'versionConfig') {
                            throw new Error("Not fount version");
                        }
                        endProps = {
                            region: region,
                            layerName: layerName,
                            compatibleRuntime: compatibleRuntime,
                            description: parsedData.description || props.description,
                            code: parsedData.code || props.code,
                            prefix: parsedData.prefix || props.prefix,
                            assumeYes: parsedData.y,
                            version: version,
                        };
                        _b = inputs.credentials;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        credentials = _b;
                        core.reportComponent('fc-layer', { command: command, uid: credentials.AccountID });
                        return [4 /*yield*/, client_1.default.setFcClient(region, credentials)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, {
                                parsedArgs: parsedArgs,
                                credentials: credentials,
                                props: endProps,
                                table: parsedData.table,
                            }];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUM5Qyx1REFBMEM7QUFDMUMsMkRBQXFDO0FBRXJDLHdEQUE0QztBQUM1QywrRUFBd0Q7QUFDeEQsc0RBQWdDO0FBQ2hDLHdEQUFrQztBQUVsQztJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVZLCtCQUFPLEdBQXBCLFVBQXFCLE1BQWtCOzs7Ozs0QkFJakMscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUh6QyxLQUdGLFNBQTJDLEVBRjdDLElBQUksVUFBQSxFQUNKLEtBQUssV0FBQTt3QkFHUCxJQUFJLElBQUksRUFBRTs0QkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDakMsc0JBQU87eUJBQ1I7d0JBQ0QscUJBQU0sMEJBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7d0JBRTdCLEtBQUssR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO3dCQUNkLHFCQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUE7O3dCQUFoQyxHQUFHLEdBQUcsU0FBMEI7d0JBQ3RDLGlCQUFNLFFBQVEsWUFBQzs0QkFDYixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLEVBQUUsR0FBRyxLQUFBLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUU7eUJBQ3ZDLENBQUMsQ0FBQzt3QkFFSCxzQkFBTyxHQUFHLEVBQUM7Ozs7S0FDWjtJQUVZLDRCQUFJLEdBQWpCLFVBQWtCLE1BQWtCOzs7Ozs0QkFLOUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUp0QyxLQUlGLFNBQXdDLEVBSDFDLElBQUksVUFBQSxFQUNKLEtBQUssV0FBQSxFQUNMLEtBQUssV0FBQTt3QkFHUCxJQUFJLElBQUksRUFBRTs0QkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDOUIsc0JBQU87eUJBQ1I7d0JBRUssS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7d0JBQ25CLHFCQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFBOzRCQUF4RCxzQkFBTyxTQUFpRCxFQUFDOzs7O0tBQzFEO0lBRVksZ0NBQVEsR0FBckIsVUFBc0IsTUFBa0I7Ozs7OzRCQUtsQyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBQTs7d0JBSjFDLEtBSUYsU0FBNEMsRUFIOUMsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsS0FBSyxXQUFBO3dCQUdQLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNsQyxzQkFBTzt5QkFDUjt3QkFDRCxxQkFBTSwwQkFBZSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBbEMsU0FBa0MsQ0FBQzt3QkFFN0IsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7d0JBQ25CLHFCQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFBOzRCQUFsRSxzQkFBTyxTQUEyRCxFQUFDOzs7O0tBQ3BFO0lBRVkscUNBQWEsR0FBMUIsVUFBMkIsTUFBa0I7Ozs7OzRCQUl2QyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsRUFBQTs7d0JBSC9DLEtBR0YsU0FBaUQsRUFGbkQsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBO3dCQUdQLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUN4QyxzQkFBTzt5QkFDUjt3QkFDRCxxQkFBTSwwQkFBZSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBbEMsU0FBa0MsQ0FBQzt3QkFFN0IsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7d0JBQ25CLHFCQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUE7NEJBQXJGLHNCQUFPLFNBQThFLEVBQUM7Ozs7S0FDdkY7SUFFWSxxQ0FBYSxHQUExQixVQUEyQixNQUFrQjs7Ozs7NEJBSXZDLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxFQUFBOzt3QkFIL0MsS0FHRixTQUFpRCxFQUZuRCxJQUFJLFVBQUEsRUFDSixLQUFLLFdBQUE7d0JBR1AsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ3hDLHNCQUFPO3lCQUNSO3dCQUNELHFCQUFNLDBCQUFlLENBQUMsVUFBVSxFQUFFLEVBQUE7O3dCQUFsQyxTQUFrQyxDQUFDO3dCQUU3QixLQUFLLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQzt3QkFDbkIscUJBQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBQTs0QkFBeEYsc0JBQU8sU0FBaUYsRUFBQzs7OztLQUMxRjtJQUVZLG1DQUFXLEdBQXhCLFVBQXlCLE1BQWtCOzs7Ozs0QkFJckMscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUE7O3dCQUg3QyxLQUdGLFNBQStDLEVBRmpELElBQUksVUFBQSxFQUNKLEtBQUssV0FBQTt3QkFHUCxJQUFJLElBQUksRUFBRTs0QkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDdEMsc0JBQU87eUJBQ1I7d0JBQ0QscUJBQU0sMEJBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7d0JBRTdCLEtBQUssR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO3dCQUMxQixxQkFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFBOzt3QkFBbkYsU0FBbUYsQ0FBQzt3QkFDcEYsaUJBQU0sUUFBUSxZQUFDOzRCQUNiLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFO3lCQUMzQyxDQUFDLENBQUM7Ozs7O0tBQ0o7SUFFYSxxQ0FBYSxHQUEzQixVQUE0QixNQUFrQixFQUFFLE9BQWU7Ozs7Ozs7d0JBQzdELGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO3dCQUV4RCxVQUFVLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFOzRCQUNqRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQzs0QkFDL0IsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsQ0FBQzs0QkFDdkYsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDOzRCQUN0QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxHQUFHLEdBQUc7eUJBQ3pDLENBQUMsQ0FBQzt3QkFFRyxVQUFVLEdBQUcsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxLQUFJLEVBQUUsQ0FBQzt3QkFDMUMsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFOzRCQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLEdBQUcsRUFBRSxPQUFBLE1BQU0sQ0FBQyxXQUFXLDBDQUFFLFNBQVMsS0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUN4RixzQkFBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBQzt5QkFDdkI7d0JBRUssS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUMzQixNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUNqRCxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt5QkFDckM7d0JBQ0ssU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDO3dCQUM5RCxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7NEJBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzt5QkFDeEM7d0JBQ0csaUJBQWlCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3dCQUNoRCxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFOzRCQUNwQyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ2pFO3dCQUVLLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDO3dCQUM3RSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxlQUFlLEVBQUU7NEJBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt5QkFDdEM7d0JBRUssUUFBUSxHQUFXOzRCQUN2QixNQUFNLFFBQUE7NEJBQ04sU0FBUyxXQUFBOzRCQUNULGlCQUFpQixtQkFBQTs0QkFDakIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFdBQVc7NEJBQ3hELElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJOzRCQUNuQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTTs0QkFDekMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUN2QixPQUFPLFNBQUE7eUJBQ1IsQ0FBQTt3QkFFbUIsS0FBQSxNQUFNLENBQUMsV0FBVyxDQUFBO2dDQUFsQix3QkFBa0I7d0JBQUkscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs4QkFBL0MsU0FBK0M7Ozt3QkFBbkYsV0FBVyxLQUF3RTt3QkFDekYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBRTFFLHFCQUFNLGdCQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTdDLFNBQTZDLENBQUM7d0JBRTlDLHNCQUFPO2dDQUNMLFVBQVUsWUFBQTtnQ0FDVixXQUFXLGFBQUE7Z0NBQ1gsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLOzZCQUN4QixFQUFBOzs7O0tBQ0Y7SUFDSCxvQkFBQztBQUFELENBQUMsQUExS0QsQ0FBMkMsY0FBYSxHQTBLdkQifQ==