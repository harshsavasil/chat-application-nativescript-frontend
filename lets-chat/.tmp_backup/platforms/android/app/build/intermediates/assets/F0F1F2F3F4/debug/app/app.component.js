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
                // alert('Message received!\n' + notificationBody + '\n' + stringifiedData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQUE0RDtBQUM1RCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsbUVBQXFFO0FBQ3JFLHNDQUErQztBQUMvQyxzQ0FBc0M7QUFNdEM7SUEyQkUsc0JBQ1UsTUFBYyxFQUNkLGVBQWdDO1FBRjFDLGlCQWNDO1FBYlMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTNCbEMsaUJBQVksR0FBRztZQUNyQixRQUFRLEVBQUUsY0FBTSxDQUFDLFdBQVc7WUFDNUIsMkNBQTJDO1lBQzNDLDJCQUEyQixFQUFFLFVBQUMsZUFBdUIsRUFBRSxlQUFvQjtnQkFDekUsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0RSw0RUFBNEU7Z0JBQzVFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFNLGFBQWEsR0FBRzt3QkFDcEIsTUFBTSxFQUFFLENBQUM7d0JBQ1QsT0FBTyxFQUFFLFdBQVcsQ0FBQyxZQUFZO3dCQUNqQyxPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxDQUFDO3dCQUNQLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3QkFDdEIsVUFBVSxFQUFFLFdBQVcsQ0FBQyxHQUFHO3FCQUM1QixDQUFDO29CQUNGLEtBQUksQ0FBQyxlQUFlLENBQUMsK0JBQStCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLEtBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckUsS0FBSSxDQUFDLGVBQWUsQ0FBQywyQkFBMkIsQ0FDOUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7WUFDSCxDQUFDO1NBQ0YsQ0FBQztRQUtBLElBQU0sTUFBTSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFDLEtBQWE7WUFDMUQsZ0NBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXpDVSxZQUFZO1FBSnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ2xDLENBQUM7eUNBNkJrQixlQUFNO1lBQ0csdUJBQWU7T0E3Qi9CLFlBQVksQ0EwQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQTFDRCxJQTBDQztBQTFDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuaW1wb3J0ICogYXMgUHVzaE5vdGlmaWNhdGlvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXB1c2gtbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBEYXRhQmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICdhcHAuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gIHByaXZhdGUgcHVzaFNldHRpbmdzID0ge1xuICAgIHNlbmRlcklEOiBDb25maWcuZmNtU2VuZGVySUQsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIG5vdGlmaWNhdGlvbkNhbGxiYWNrQW5kcm9pZDogKHN0cmluZ2lmaWVkRGF0YTogc3RyaW5nLCBmY21Ob3RpZmljYXRpb246IGFueSkgPT4ge1xuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uQm9keSA9IGZjbU5vdGlmaWNhdGlvbiAmJiBmY21Ob3RpZmljYXRpb24uZ2V0Qm9keSgpO1xuICAgICAgLy8gYWxlcnQoJ01lc3NhZ2UgcmVjZWl2ZWQhXFxuJyArIG5vdGlmaWNhdGlvbkJvZHkgKyAnXFxuJyArIHN0cmluZ2lmaWVkRGF0YSk7XG4gICAgICBjb25zdCBtZXNzYWdlSlNPTiA9IEpTT04ucGFyc2Uoc3RyaW5naWZpZWREYXRhKTtcbiAgICAgIGlmIChtZXNzYWdlSlNPTi5jcmVhdGVkX3RpbWUpIHtcbiAgICAgICAgY29uc3QgaW5zZXJ0TXNnSnNvbiA9IHtcbiAgICAgICAgICBzZW5kZXI6IDAsXG4gICAgICAgICAgY3JlYXRlZDogbWVzc2FnZUpTT04uY3JlYXRlZF90aW1lLFxuICAgICAgICAgIGNvbnRhY3Q6IG1lc3NhZ2VKU09OLmZyb20sXG4gICAgICAgICAgc2VudDogMixcbiAgICAgICAgICB0ZXh0OiBtZXNzYWdlSlNPTi50ZXh0LFxuICAgICAgICAgIG1lc3NhZ2VfaWQ6IG1lc3NhZ2VKU09OLl9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuaW5zZXJ0SW50b01lc3NhZ2VzV2l0aE1lc3NhZ2VJZChpbnNlcnRNc2dKc29uKTtcbiAgICAgIH1cbiAgICAgIGlmIChtZXNzYWdlSlNPTi5kZWxpdmVyZWRfdGltZSkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTdGF0dXNPZk1lc3NhZ2UoMiwgbWVzc2FnZUpTT04udW5pcXVlX2lkKTtcbiAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlRGVsaXZlcnlUaW1lT2ZNZXNzYWdlKFxuICAgICAgICAgIG1lc3NhZ2VKU09OLmRlbGl2ZXJlZF90aW1lLCBtZXNzYWdlSlNPTi51bmlxdWVfaWQpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhYmFzZVNlcnZpY2U6IERhdGFCYXNlU2VydmljZSxcbiAgKSB7XG4gICAgY29uc3QgdXNlcklkID0gZ2V0U3RyaW5nKCd1c2VySWQnKTtcbiAgICBpZiAodXNlcklkKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuICAgIH1cbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5jcmVhdGVUYWJsZXMoKTtcbiAgICBQdXNoTm90aWZpY2F0aW9ucy5yZWdpc3Rlcih0aGlzLnB1c2hTZXR0aW5ncywgKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgIHNldFN0cmluZygncHVzaFRva2VuJywgdG9rZW4pO1xuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgYWxlcnQoZXJyb3IpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=