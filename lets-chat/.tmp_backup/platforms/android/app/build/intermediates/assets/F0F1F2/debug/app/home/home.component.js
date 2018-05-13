"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var HomeComponent = (function () {
    function HomeComponent(platform, router) {
        this.platform = platform;
        this.router = router;
    }
    HomeComponent.prototype.logout = function () {
        application_settings_1.remove('userId');
        this.router.navigate(['/login']);
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
        }),
        __param(0, core_1.Inject('platform')),
        __metadata("design:paramtypes", [Object, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsNkRBQThDO0FBUTlDO0lBQ0UsdUJBQzZCLFFBQVEsRUFDM0IsTUFBYztRQURLLGFBQVEsR0FBUixRQUFRLENBQUE7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNyQixDQUFDO0lBQ0osOEJBQU0sR0FBTjtRQUNFLDZCQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFSVSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO1FBR0csV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7aURBQ0gsZUFBTTtPQUhiLGFBQWEsQ0FTekI7SUFBRCxvQkFBQztDQUFBLEFBVEQsSUFTQztBQVRZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHJlbW92ZSB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ25zLWhvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ3BsYXRmb3JtJykgcHVibGljIHBsYXRmb3JtLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICkge31cbiAgbG9nb3V0KCkge1xuICAgIHJlbW92ZSgndXNlcklkJyk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gIH1cbn1cbiJdfQ==