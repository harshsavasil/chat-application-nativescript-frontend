"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_shadow_directive_1 = require("./ng-shadow.directive");
var NgShadowModule = (function () {
    function NgShadowModule() {
    }
    NgShadowModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [
                ng_shadow_directive_1.NativeShadowDirective,
            ],
            exports: [
                ng_shadow_directive_1.NativeShadowDirective,
            ],
            providers: [],
        })
    ], NgShadowModule);
    return NgShadowModule;
}());
exports.NgShadowModule = NgShadowModule;
//# sourceMappingURL=ng-shadow.module.js.map