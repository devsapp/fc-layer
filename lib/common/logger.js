"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18n_1 = __importDefault(require("./i18n"));
var core_1 = require("@serverless-devs/core");
var ComponentLogger = /** @class */ (function () {
    function ComponentLogger() {
    }
    ComponentLogger.setContent = function (content) {
        ComponentLogger.CONTENT = content;
    };
    ComponentLogger.log = function (m, color) {
        core_1.Logger.log(i18n_1.default.__(m) || m, color);
    };
    ComponentLogger.info = function (m) {
        core_1.Logger.info(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.debug = function (m) {
        core_1.Logger.debug(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.error = function (m) {
        core_1.Logger.error(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.warning = function (m) {
        core_1.Logger.warn(ComponentLogger.CONTENT, i18n_1.default.__(m) || m);
    };
    ComponentLogger.success = function (m) {
        core_1.Logger.log(i18n_1.default.__(m) || m, 'green');
    };
    ComponentLogger.CONTENT = '';
    return ComponentLogger;
}());
exports.default = ComponentLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBMEI7QUFDMUIsOENBQStDO0FBRS9DO0lBQUE7SUE2QkEsQ0FBQztJQTNCVSwwQkFBVSxHQUFqQixVQUFrQixPQUFPO1FBQ3JCLGVBQWUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RDLENBQUM7SUFDTSxtQkFBRyxHQUFWLFVBQVcsQ0FBQyxFQUFFLEtBQTZHO1FBQ3ZILGFBQU0sQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLG9CQUFJLEdBQVgsVUFBWSxDQUFDO1FBQ1QsYUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLHFCQUFLLEdBQVosVUFBYSxDQUFDO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLHFCQUFLLEdBQVosVUFBYSxDQUFDO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLHVCQUFPLEdBQWQsVUFBZSxDQUFDO1FBQ1osYUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdNLHVCQUFPLEdBQWQsVUFBZSxDQUFDO1FBQ1osYUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBMUJNLHVCQUFPLEdBQUcsRUFBRSxDQUFDO0lBNEJ4QixzQkFBQztDQUFBLEFBN0JELElBNkJDO2tCQTdCb0IsZUFBZSJ9