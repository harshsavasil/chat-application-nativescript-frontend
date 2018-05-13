"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
var PushNotifications = require("nativescript-push-notifications");
var index_1 = require("./core/index");
var index_2 = require("./core/index");
var AppComponent = (function () {
    function AppComponent(router, databaseService) {
        this.router = router;
        this.databaseService = databaseService;
        this.pushSettings = {
            senderID: index_2.Config.fcmSenderID,
            // tslint:disable-next-line:max-line-length
            notificationCallbackAndroid: function (stringifiedData, fcmNotification) {
                var notificationBody = fcmNotification && fcmNotification.getBody();
                alert('Message received!\n' + notificationBody + '\n' + stringifiedData);
            },
        };
        var userId = application_settings_1.getString('userId');
        if (userId) {
            this.router.navigate(['/home']);
        }
        this.databaseService.createTables();
        PushNotifications.register(this.pushSettings, function (token) {
            application_settings_1.setString('pushToken', token);
        }, function (error) {
            alert(error);
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ns-app',
            templateUrl: 'app.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            index_1.DataBaseService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQUE0RDtBQUM1RCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsbUVBQXFFO0FBQ3JFLHNDQUErQztBQUMvQyxzQ0FBc0M7QUFNdEM7SUFVRSxzQkFDVSxNQUFjLEVBQ2QsZUFBZ0M7UUFEaEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVZsQyxpQkFBWSxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxjQUFNLENBQUMsV0FBVztZQUM1QiwyQ0FBMkM7WUFDM0MsMkJBQTJCLEVBQUUsVUFBQyxlQUF1QixFQUFFLGVBQW9CO2dCQUN6RSxJQUFNLGdCQUFnQixHQUFHLGVBQWUsSUFBSSxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3RFLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDLENBQUM7WUFDM0UsQ0FBQztTQUNGLENBQUM7UUFLQSxJQUFNLE1BQU0sR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxLQUFhO1lBQzFELGdDQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDUCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF4QlUsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNsQyxDQUFDO3lDQVlrQixlQUFNO1lBQ0csdUJBQWU7T0FaL0IsWUFBWSxDQXlCeEI7SUFBRCxtQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdmFyLXJlcXVpcmVzXG5jb25zdCBTcWxpdGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtc3FsaXRlJyk7XG5pbXBvcnQgKiBhcyBQdXNoTm90aWZpY2F0aW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJ2FwcC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgcHJpdmF0ZSBwdXNoU2V0dGluZ3MgPSB7XG4gICAgc2VuZGVySUQ6IENvbmZpZy5mY21TZW5kZXJJRCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgbm90aWZpY2F0aW9uQ2FsbGJhY2tBbmRyb2lkOiAoc3RyaW5naWZpZWREYXRhOiBzdHJpbmcsIGZjbU5vdGlmaWNhdGlvbjogYW55KSA9PiB7XG4gICAgICBjb25zdCBub3RpZmljYXRpb25Cb2R5ID0gZmNtTm90aWZpY2F0aW9uICYmIGZjbU5vdGlmaWNhdGlvbi5nZXRCb2R5KCk7XG4gICAgICBhbGVydCgnTWVzc2FnZSByZWNlaXZlZCFcXG4nICsgbm90aWZpY2F0aW9uQm9keSArICdcXG4nICsgc3RyaW5naWZpZWREYXRhKTtcbiAgICB9LFxuICB9O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhQmFzZVNlcnZpY2UsXG4gICkge1xuICAgIGNvbnN0IHVzZXJJZCA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgaWYgKHVzZXJJZCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuY3JlYXRlVGFibGVzKCk7XG4gICAgUHVzaE5vdGlmaWNhdGlvbnMucmVnaXN0ZXIodGhpcy5wdXNoU2V0dGluZ3MsICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRTdHJpbmcoJ3B1c2hUb2tlbicsIHRva2VuKTtcbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuIl19