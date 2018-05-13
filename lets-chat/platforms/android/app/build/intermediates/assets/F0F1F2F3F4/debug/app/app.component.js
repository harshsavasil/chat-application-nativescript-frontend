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
                if (messageJSON.created_time) {
                    var insertMsgJson = {
                        sender: 0,
                        created: messageJSON.created_time,
                        contact: messageJSON.from,
                        sent: 2,
                        text: messageJSON.text,
                        message_id: messageJSON._id,
                    };
                    _this.databaseService.insertIntoMessagesWithMessageId(insertMsgJson);
                }
                if (messageJSON.delivered_time) {
                    _this.databaseService.updateStatusOfMessage(2, messageJSON.unique_id);
                    _this.databaseService.updateDeliveryTimeOfMessage(messageJSON.delivered_time, messageJSON.unique_id);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQUE0RDtBQUM1RCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsbUVBQXFFO0FBQ3JFLHNDQUErQztBQUMvQyxzQ0FBc0M7QUFNdEM7SUEyQkUsc0JBQ1UsTUFBYyxFQUNkLGVBQWdDO1FBRjFDLGlCQWNDO1FBYlMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTNCbEMsaUJBQVksR0FBRztZQUNyQixRQUFRLEVBQUUsY0FBTSxDQUFDLFdBQVc7WUFDNUIsMkNBQTJDO1lBQzNDLDJCQUEyQixFQUFFLFVBQUMsZUFBdUIsRUFBRSxlQUFvQjtnQkFDekUsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0RSxLQUFLLENBQUMscUJBQXFCLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDO2dCQUN6RSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBTSxhQUFhLEdBQUc7d0JBQ3BCLE1BQU0sRUFBRSxDQUFDO3dCQUNULE9BQU8sRUFBRSxXQUFXLENBQUMsWUFBWTt3QkFDakMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJO3dCQUN6QixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7d0JBQ3RCLFVBQVUsRUFBRSxXQUFXLENBQUMsR0FBRztxQkFDNUIsQ0FBQztvQkFDRixLQUFJLENBQUMsZUFBZSxDQUFDLCtCQUErQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUMvQixLQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JFLEtBQUksQ0FBQyxlQUFlLENBQUMsMkJBQTJCLENBQzlDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUM7UUFLQSxJQUFNLE1BQU0sR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxLQUFhO1lBQzFELGdDQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDUCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6Q1UsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNsQyxDQUFDO3lDQTZCa0IsZUFBTTtZQUNHLHVCQUFlO09BN0IvQixZQUFZLENBMEN4QjtJQUFELG1CQUFDO0NBQUEsQUExQ0QsSUEwQ0M7QUExQ1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZyB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12YXItcmVxdWlyZXNcbmNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcbmltcG9ydCAqIGFzIFB1c2hOb3RpZmljYXRpb25zIGZyb20gJ25hdGl2ZXNjcmlwdC1wdXNoLW5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgRGF0YUJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnYXBwLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICBwcml2YXRlIHB1c2hTZXR0aW5ncyA9IHtcbiAgICBzZW5kZXJJRDogQ29uZmlnLmZjbVNlbmRlcklELFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBub3RpZmljYXRpb25DYWxsYmFja0FuZHJvaWQ6IChzdHJpbmdpZmllZERhdGE6IHN0cmluZywgZmNtTm90aWZpY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkJvZHkgPSBmY21Ob3RpZmljYXRpb24gJiYgZmNtTm90aWZpY2F0aW9uLmdldEJvZHkoKTtcbiAgICAgIGFsZXJ0KCdNZXNzYWdlIHJlY2VpdmVkIVxcbicgKyBub3RpZmljYXRpb25Cb2R5ICsgJ1xcbicgKyBzdHJpbmdpZmllZERhdGEpO1xuICAgICAgY29uc3QgbWVzc2FnZUpTT04gPSBKU09OLnBhcnNlKHN0cmluZ2lmaWVkRGF0YSk7XG4gICAgICBpZiAobWVzc2FnZUpTT04uY3JlYXRlZF90aW1lKSB7XG4gICAgICAgIGNvbnN0IGluc2VydE1zZ0pzb24gPSB7XG4gICAgICAgICAgc2VuZGVyOiAwLFxuICAgICAgICAgIGNyZWF0ZWQ6IG1lc3NhZ2VKU09OLmNyZWF0ZWRfdGltZSxcbiAgICAgICAgICBjb250YWN0OiBtZXNzYWdlSlNPTi5mcm9tLFxuICAgICAgICAgIHNlbnQ6IDIsXG4gICAgICAgICAgdGV4dDogbWVzc2FnZUpTT04udGV4dCxcbiAgICAgICAgICBtZXNzYWdlX2lkOiBtZXNzYWdlSlNPTi5faWQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmluc2VydEludG9NZXNzYWdlc1dpdGhNZXNzYWdlSWQoaW5zZXJ0TXNnSnNvbik7XG4gICAgICB9XG4gICAgICBpZiAobWVzc2FnZUpTT04uZGVsaXZlcmVkX3RpbWUpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlU3RhdHVzT2ZNZXNzYWdlKDIsIG1lc3NhZ2VKU09OLnVuaXF1ZV9pZCk7XG4gICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZURlbGl2ZXJ5VGltZU9mTWVzc2FnZShcbiAgICAgICAgICBtZXNzYWdlSlNPTi5kZWxpdmVyZWRfdGltZSwgbWVzc2FnZUpTT04udW5pcXVlX2lkKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhQmFzZVNlcnZpY2UsXG4gICkge1xuICAgIGNvbnN0IHVzZXJJZCA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgaWYgKHVzZXJJZCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuY3JlYXRlVGFibGVzKCk7XG4gICAgUHVzaE5vdGlmaWNhdGlvbnMucmVnaXN0ZXIodGhpcy5wdXNoU2V0dGluZ3MsICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRTdHJpbmcoJ3B1c2hUb2tlbicsIHRva2VuKTtcbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuIl19