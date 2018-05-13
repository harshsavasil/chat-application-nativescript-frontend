"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var chats_service_1 = require("../core/chats.service");
var index_1 = require("../core/index");
var HomeComponent = (function () {
    function HomeComponent(platform, chatsService, router) {
        this.platform = platform;
        this.chatsService = chatsService;
        this.router = router;
    }
    HomeComponent.prototype.logout = function () {
        application_settings_1.remove('userId');
        this.router.navigate(['/login']);
    };
    HomeComponent.prototype.save_push_token = function () {
        var pushToken = application_settings_1.getString('pushToken');
        var data = {
            token: pushToken,
            user_id: this.userNumber,
        };
        var url = index_1.Config.apiUrl + index_1.Config.savePushTokenUrl;
        if (this.userNumber && pushToken) {
            this.chatsService.commonPostService(url, data).subscribe(function (success) {
                // Toast.makeText('Welcome !!').show();
            }, function (error) {
                alert(error.message);
            });
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
        }),
        __param(0, core_1.Inject('platform')),
        __metadata("design:paramtypes", [Object, chats_service_1.ChatsService,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsNkRBQW9FO0FBRXBFLHVEQUFxRDtBQUNyRCx1Q0FBdUM7QUFPdkM7SUFFRSx1QkFDNkIsUUFBUSxFQUMzQixZQUEwQixFQUMxQixNQUFjO1FBRkssYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQUMzQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3JCLENBQUM7SUFDSiw4QkFBTSxHQUFOO1FBQ0UsNkJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELHVDQUFlLEdBQWY7UUFDRSxJQUFNLFNBQVMsR0FBRyxnQ0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLElBQU0sSUFBSSxHQUFHO1lBQ1gsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3pCLENBQUM7UUFDRixJQUFNLEdBQUcsR0FBRyxjQUFNLENBQUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBTztnQkFDL0QsdUNBQXVDO1lBQ3pDLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ1AsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBekJVLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7UUFJRyxXQUFBLGFBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtpREFDRyw0QkFBWTtZQUNsQixlQUFNO09BTGIsYUFBYSxDQTBCekI7SUFBRCxvQkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgcmVtb3ZlLCBzZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBQdXNoTm90aWZpY2F0aW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IENoYXRzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvY2hhdHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICducy1ob21lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuICBwcml2YXRlIHVzZXJOdW1iZXI6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICApIHt9XG4gIGxvZ291dCgpIHtcbiAgICByZW1vdmUoJ3VzZXJJZCcpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICB9XG4gIHNhdmVfcHVzaF90b2tlbigpIHtcbiAgICBjb25zdCBwdXNoVG9rZW4gPSBnZXRTdHJpbmcoJ3B1c2hUb2tlbicpO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB0b2tlbjogcHVzaFRva2VuLFxuICAgICAgdXNlcl9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgIH07XG4gICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIENvbmZpZy5zYXZlUHVzaFRva2VuVXJsO1xuICAgIGlmICh0aGlzLnVzZXJOdW1iZXIgJiYgcHVzaFRva2VuKSB7XG4gICAgICB0aGlzLmNoYXRzU2VydmljZS5jb21tb25Qb3N0U2VydmljZSh1cmwsIGRhdGEpLnN1YnNjcmliZSgoc3VjY2VzcykgPT4ge1xuICAgICAgICAvLyBUb2FzdC5tYWtlVGV4dCgnV2VsY29tZSAhIScpLnNob3coKTtcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBhbGVydChlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19