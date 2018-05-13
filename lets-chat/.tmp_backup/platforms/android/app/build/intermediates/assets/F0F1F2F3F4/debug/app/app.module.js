"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var platform = require("platform");
var nativescript_angular_2 = require("nativescript-angular");
var nativescript_floatingactionbutton_1 = require("nativescript-floatingactionbutton");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var core_2 = require("./core");
var index_1 = require("./core/index");
nativescript_angular_2.registerElement('Fab', function () { return nativescript_floatingactionbutton_1.Fab; });
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent,
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                core_2.CoreModule,
                nativescript_angular_1.NativeScriptHttpModule,
            ],
            declarations: [
                app_component_1.AppComponent,
            ],
            providers: [
                { provide: core_1.NgModuleFactoryLoader, useClass: router_1.NSModuleFactoryLoader },
                { provide: 'platform', useValue: platform },
                index_1.DataBaseService,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA,
            ],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FDaUQ7QUFDakQsNkRBQThEO0FBQzlELGdGQUE4RTtBQUM5RSxzREFBb0U7QUFDcEUsbUNBQXFDO0FBRXJDLDZEQUF1RDtBQUN2RCx1RkFBd0Q7QUFDeEQsMkRBQXdEO0FBQ3hELGlEQUErQztBQUMvQywrQkFBb0M7QUFDcEMsc0NBQStDO0FBRS9DLHNDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSx1Q0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0FBd0JsQztJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBdEJyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDUCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsaUJBQVU7Z0JBQ1YsNkNBQXNCO2FBQ3ZCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsNEJBQXFCLEVBQUUsUUFBUSxFQUFFLDhCQUFxQixFQUFFO2dCQUNuRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtnQkFDM0MsdUJBQWU7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsdUJBQWdCO2FBQ2pCO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsXG4gICAgICAgICBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5pbXBvcnQgeyBGYWIgfSBmcm9tICduYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b24nO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5cbnJlZ2lzdGVyRWxlbWVudCgnRmFiJywgKCkgPT4gRmFiKTtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgIENvcmVNb2R1bGUsXG4gICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICBBcHBDb21wb25lbnQsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIHsgcHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH0sXG4gICAgICB7IHByb3ZpZGU6ICdwbGF0Zm9ybScsIHVzZVZhbHVlOiBwbGF0Zm9ybSB9LFxuICAgICAgRGF0YUJhc2VTZXJ2aWNlLFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgTk9fRVJST1JTX1NDSEVNQSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=