"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
var PushNotifications = require("nativescript-push-notifications");
var Dialogs = require("ui/dialogs");
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
                // tslint:disable-next-line:max-line-length
                Dialogs.alert('Message received!\n' + notificationBody + '\n' + stringifiedData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQUE0RDtBQUM1RCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsbUVBQXFFO0FBQ3JFLG9DQUFzQztBQUN0QyxzQ0FBK0M7QUFDL0Msc0NBQXNDO0FBTXRDO0lBV0Usc0JBQ1UsTUFBYyxFQUNkLGVBQWdDO1FBRGhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFYbEMsaUJBQVksR0FBRztZQUNyQixRQUFRLEVBQUUsY0FBTSxDQUFDLFdBQVc7WUFDNUIsMkNBQTJDO1lBQzNDLDJCQUEyQixFQUFFLFVBQUMsZUFBdUIsRUFBRSxlQUFvQjtnQkFDekUsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0RSwyQ0FBMkM7Z0JBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1lBQ25GLENBQUM7U0FDRixDQUFDO1FBS0EsSUFBTSxNQUFNLEdBQUcsZ0NBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQUMsS0FBYTtZQUMxRCxnQ0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ1AsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBekJVLFlBQVk7UUFKeEIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEMsQ0FBQzt5Q0Fha0IsZUFBTTtZQUNHLHVCQUFlO09BYi9CLFlBQVksQ0EwQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuaW1wb3J0ICogYXMgUHVzaE5vdGlmaWNhdGlvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXB1c2gtbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgKiBhcyBEaWFsb2dzIGZyb20gJ3VpL2RpYWxvZ3MnO1xuaW1wb3J0IHsgRGF0YUJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnYXBwLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICBwcml2YXRlIHB1c2hTZXR0aW5ncyA9IHtcbiAgICBzZW5kZXJJRDogQ29uZmlnLmZjbVNlbmRlcklELFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBub3RpZmljYXRpb25DYWxsYmFja0FuZHJvaWQ6IChzdHJpbmdpZmllZERhdGE6IHN0cmluZywgZmNtTm90aWZpY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkJvZHkgPSBmY21Ob3RpZmljYXRpb24gJiYgZmNtTm90aWZpY2F0aW9uLmdldEJvZHkoKTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIERpYWxvZ3MuYWxlcnQoJ01lc3NhZ2UgcmVjZWl2ZWQhXFxuJyArIG5vdGlmaWNhdGlvbkJvZHkgKyAnXFxuJyArIHN0cmluZ2lmaWVkRGF0YSk7XG4gICAgfSxcbiAgfTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGRhdGFiYXNlU2VydmljZTogRGF0YUJhc2VTZXJ2aWNlLFxuICApIHtcbiAgICBjb25zdCB1c2VySWQgPSBnZXRTdHJpbmcoJ3VzZXJJZCcpO1xuICAgIGlmICh1c2VySWQpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG4gICAgfVxuICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmNyZWF0ZVRhYmxlcygpO1xuICAgIFB1c2hOb3RpZmljYXRpb25zLnJlZ2lzdGVyKHRoaXMucHVzaFNldHRpbmdzLCAodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgc2V0U3RyaW5nKCdwdXNoVG9rZW4nLCB0b2tlbik7XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBhbGVydChlcnJvcik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==