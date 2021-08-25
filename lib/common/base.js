"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
    }
    BaseComponent.prototype.__report = function (reportData) {
        if (process && process.send) {
            var name_1 = reportData.name, content = reportData.content;
            process.send({
                action: 'resource',
                data: {
                    name: name_1,
                    content: JSON.stringify(content),
                },
            });
            return content;
        }
    };
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUFjQSxDQUFDO0lBYlcsZ0NBQVEsR0FBbEIsVUFBbUIsVUFBMkM7UUFDNUQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNuQixJQUFBLE1BQUksR0FBYyxVQUFVLEtBQXhCLEVBQUUsT0FBTyxHQUFLLFVBQVUsUUFBZixDQUFnQjtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0osSUFBSSxRQUFBO29CQUNKLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztpQkFDakM7YUFDRixDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFkRCxJQWNDIn0=