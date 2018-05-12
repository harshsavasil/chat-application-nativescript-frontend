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
        var _this = this;
        this.router = router;
        this.databaseService = databaseService;
        this.pushSettings = {
            senderID: index_2.Config.fcmSenderID,
            // tslint:disable-next-line:max-line-length
            notificationCallbackAndroid: function (stringifiedData, fcmNotification) {
                var notificationBody = fcmNotification && fcmNotification.getBody();
                alert('Message received!\n' + notificationBody + '\n' + stringifiedData);
                var messageJSON = JSON.parse(stringifiedData);
                var insertMsgJson = {
                    sender: 0,
                    created: messageJSON.timestamp,
                    contact: messageJSON.from_id,
                    sent: 2,
                    text: messageJSON.text,
                    message_id: messageJSON._id,
                };
                _this.databaseService.insertIntoMessagesWithMessageId(insertMsgJson);
                // this.databaseService.updateMessaeIdOfMessage()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQUE0RDtBQUM1RCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsbUVBQXFFO0FBQ3JFLHNDQUErQztBQUMvQyxzQ0FBc0M7QUFNdEM7SUFxQkUsc0JBQ1UsTUFBYyxFQUNkLGVBQWdDO1FBRjFDLGlCQWNDO1FBYlMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQXJCbEMsaUJBQVksR0FBRztZQUNyQixRQUFRLEVBQUUsY0FBTSxDQUFDLFdBQVc7WUFDNUIsMkNBQTJDO1lBQzNDLDJCQUEyQixFQUFFLFVBQUMsZUFBdUIsRUFBRSxlQUFvQjtnQkFDekUsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0RSxLQUFLLENBQUMscUJBQXFCLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDO2dCQUN6RSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFNLGFBQWEsR0FBRztvQkFDcEIsTUFBTSxFQUFFLENBQUM7b0JBQ1QsT0FBTyxFQUFFLFdBQVcsQ0FBQyxTQUFTO29CQUM5QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87b0JBQzVCLElBQUksRUFBRSxDQUFDO29CQUNQLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtvQkFDdEIsVUFBVSxFQUFFLFdBQVcsQ0FBQyxHQUFHO2lCQUM1QixDQUFDO2dCQUNGLEtBQUksQ0FBQyxlQUFlLENBQUMsK0JBQStCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3BFLGlEQUFpRDtZQUNuRCxDQUFDO1NBQ0YsQ0FBQztRQUtBLElBQU0sTUFBTSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFDLEtBQWE7WUFDMUQsZ0NBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5DVSxZQUFZO1FBSnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ2xDLENBQUM7eUNBdUJrQixlQUFNO1lBQ0csdUJBQWU7T0F2Qi9CLFlBQVksQ0FvQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQXBDRCxJQW9DQztBQXBDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuaW1wb3J0ICogYXMgUHVzaE5vdGlmaWNhdGlvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXB1c2gtbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBEYXRhQmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICdhcHAuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gIHByaXZhdGUgcHVzaFNldHRpbmdzID0ge1xuICAgIHNlbmRlcklEOiBDb25maWcuZmNtU2VuZGVySUQsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIG5vdGlmaWNhdGlvbkNhbGxiYWNrQW5kcm9pZDogKHN0cmluZ2lmaWVkRGF0YTogc3RyaW5nLCBmY21Ob3RpZmljYXRpb246IGFueSkgPT4ge1xuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uQm9keSA9IGZjbU5vdGlmaWNhdGlvbiAmJiBmY21Ob3RpZmljYXRpb24uZ2V0Qm9keSgpO1xuICAgICAgYWxlcnQoJ01lc3NhZ2UgcmVjZWl2ZWQhXFxuJyArIG5vdGlmaWNhdGlvbkJvZHkgKyAnXFxuJyArIHN0cmluZ2lmaWVkRGF0YSk7XG4gICAgICBjb25zdCBtZXNzYWdlSlNPTiA9IEpTT04ucGFyc2Uoc3RyaW5naWZpZWREYXRhKTtcbiAgICAgIGNvbnN0IGluc2VydE1zZ0pzb24gPSB7XG4gICAgICAgIHNlbmRlcjogMCxcbiAgICAgICAgY3JlYXRlZDogbWVzc2FnZUpTT04udGltZXN0YW1wLFxuICAgICAgICBjb250YWN0OiBtZXNzYWdlSlNPTi5mcm9tX2lkLFxuICAgICAgICBzZW50OiAyLFxuICAgICAgICB0ZXh0OiBtZXNzYWdlSlNPTi50ZXh0LFxuICAgICAgICBtZXNzYWdlX2lkOiBtZXNzYWdlSlNPTi5faWQsXG4gICAgICB9O1xuICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuaW5zZXJ0SW50b01lc3NhZ2VzV2l0aE1lc3NhZ2VJZChpbnNlcnRNc2dKc29uKTtcbiAgICAgIC8vIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZU1lc3NhZUlkT2ZNZXNzYWdlKClcbiAgICB9LFxuICB9O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhQmFzZVNlcnZpY2UsXG4gICkge1xuICAgIGNvbnN0IHVzZXJJZCA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgaWYgKHVzZXJJZCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuY3JlYXRlVGFibGVzKCk7XG4gICAgUHVzaE5vdGlmaWNhdGlvbnMucmVnaXN0ZXIodGhpcy5wdXNoU2V0dGluZ3MsICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRTdHJpbmcoJ3B1c2hUb2tlbicsIHRva2VuKTtcbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuIl19