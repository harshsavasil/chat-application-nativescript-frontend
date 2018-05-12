"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var Observable_1 = require("rxjs/Observable");
var chats_service_1 = require("../core/chats.service");
var database_service_1 = require("../core/database.service");
var index_1 = require("../core/index");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
var HomeComponent = (function () {
    function HomeComponent(platform, chatsService, router, databaseService) {
        this.platform = platform;
        this.chatsService = chatsService;
        this.router = router;
        this.databaseService = databaseService;
        this.userNumber = application_settings_1.getString('userId');
        this.save_push_token();
        this.getChatsFromService();
        this.pushUnsentMessagesToServer();
    }
    HomeComponent.prototype.logout = function () {
        application_settings_1.clear();
        this.router.navigate(['/login']);
    };
    HomeComponent.prototype.save_push_token = function () {
        var _this = this;
        var pushToken = application_settings_1.getString('pushToken');
        var data = {
            token: pushToken,
            user_id: this.userNumber,
        };
        var url = index_1.Config.apiUrl + index_1.Config.savePushTokenUrl;
        if (this.userNumber && pushToken) {
            this.pushTokenSubscription =
                this.chatsService.commonPostService(url, data).subscribe(function (success) {
                    _this.destroyTimerOfPushToken();
                }, function (error) {
                    _this.subscribeToData();
                    alert(error.message);
                });
        }
    };
    HomeComponent.prototype.destroyTimerOfPushToken = function () {
        if (this.pushTokenSubscription) {
            this.pushTokenSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    };
    HomeComponent.prototype.getChatsFromService = function () {
        var _this = this;
        this.chatsSubscription = this.chatsService.getAllChats(this.userNumber)
            .subscribe(function (chats) {
            chats.forEach(function (chat) {
                _this.databaseService.insertIntoChats(chat);
            });
            _this.subscribeToChatsData();
            // tslint:disable-next-line:max-line-length
        }, function (error) {
            alert('Could not fetch contacts list.');
        });
    };
    // getChatMessagesFromService() {
    //   this.lastMessageSyncTime = getString('lastMessageSyncTime', '0');
    //   this.messagesSubscription = this.chatsService.getChatMessages(
    //     this.userNumber, this.lastMessageSyncTime)
    //     .subscribe((messagesJson) => {
    //       const messagesResponse = messagesJson.messages;
    //       messagesResponse.forEach((message) => {
    //         this.databaseService.insertIntoMessages(message);
    //       });
    //       const currentTime = Date.now();
    //       setString('lastMessageSyncTime', currentTime.toString());
    //       this.subscribeToMessagesData();
    //     }, (error) => {
    //       alert(error.message);
    //     });
    // }
    HomeComponent.prototype.pushUnsentMessagesToServer = function () {
        var _this = this;
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
            var selectQuery = 'SELECT * FROM messages WHERE sent = 0';
            db.all(selectQuery).then(function (rows) {
                // tslint:disable-next-line:forin
                for (var row in rows) {
                    var data = {
                        unique_id: rows[row][0],
                        to: rows[row][8],
                        from_id: _this.userNumber,
                        text: rows[row][1],
                        created_time: rows[row][6],
                    };
                    // tslint:disable-next-line:max-line-length
                    _this.unsentMessagesSubscription = _this.chatsService.sendMessage(data)
                        .subscribe(function (success) {
                        if (success.result === 1) {
                            _this.databaseService.updateStatusOfMessage(success.status, success.unique_id);
                            if (success.message_timings.sent_time) {
                                _this.databaseService.updateSentTimeOfMessage(success.message_timings.sent_time, success.unique_id);
                            }
                            if (success.message_timings.delivered_time) {
                                _this.databaseService.updateDeliveryTimeOfMessage(success.message_timings.sent_time, success.unique_id);
                            }
                            if (success.message_id) {
                                _this.databaseService.updateMessaeIdOfMessage(success.message_id, success.unique_id);
                            }
                        }
                    }, function (error) {
                        _this.databaseService.updateStatusOfMessage(error.status, error.unique_id);
                    });
                }
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('Unable to fetch unsent messages from db.');
                return [];
            });
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('Unable to connect to Database 5');
            return [];
        });
        this.subscribeToUnsentMessagesData();
    };
    HomeComponent.prototype.subscribeToData = function () {
        var _this = this;
        this.timerSubscription = Observable_1.Observable.timer(1000).first()
            .subscribe(function () { return _this.save_push_token(); });
    };
    HomeComponent.prototype.subscribeToChatsData = function () {
        var _this = this;
        this.chatstimerSubscription = Observable_1.Observable.timer(5 * 60000).first()
            .subscribe(function () { return _this.getChatsFromService(); });
    };
    HomeComponent.prototype.subscribeToUnsentMessagesData = function () {
        var _this = this;
        this.unsentMessagesSubscription = Observable_1.Observable.timer(10000).first()
            .subscribe(function () { return _this.pushUnsentMessagesToServer(); });
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
            router_1.Router,
            database_service_1.DataBaseService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsNkRBQTJFO0FBRTNFLDhDQUE2QztBQUU3Qyx1REFBcUQ7QUFDckQsNkRBQTJEO0FBQzNELHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFROUM7SUFVRSx1QkFDNkIsUUFBUSxFQUMzQixZQUEwQixFQUMxQixNQUFjLEVBQ2QsZUFBZ0M7UUFIYixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsOEJBQU0sR0FBTjtRQUNFLDRCQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsdUNBQWUsR0FBZjtRQUFBLGlCQWdCQztRQWZDLElBQU0sU0FBUyxHQUFHLGdDQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDekIsQ0FBQztRQUNGLElBQU0sR0FBRyxHQUFHLGNBQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxDQUFD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Q3BDLENBQUM7UUFZRyxXQUFBLGFBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtpREFDRyw0QkFBWTtZQUNsQixlQUFNO1lBQ0csa0NBQWU7T0FkL0IsYUFBYSxDQTJJekI7SUFBRCxvQkFBQztDQUFBLEFBM0lELElBMklDO0FBM0lZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGNsZWFyLCBnZXRTdHJpbmcsIHJlbW92ZSwgc2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0ICogYXMgUHVzaE5vdGlmaWNhdGlvbnMgZnJvbSAnbmF0aXZlc2NyaXB0LXB1c2gtbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFub255bW91c1N1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENoYXRzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvY2hhdHMuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2RhdGFiYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdmFyLXJlcXVpcmVzXG5jb25zdCBTcWxpdGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtc3FsaXRlJyk7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLWhvbWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBsYXN0TWVzc2FnZVN5bmNUaW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgdXNlck51bWJlcjogYW55O1xuICBwcml2YXRlIHRpbWVyU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcHVzaFRva2VuU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY2hhdHN0aW1lclN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNoYXRzU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgbWVzc2FnZXNTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSB1bnNlbnRNZXNzYWdlc1N1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ3BsYXRmb3JtJykgcHVibGljIHBsYXRmb3JtLFxuICAgIHByaXZhdGUgY2hhdHNTZXJ2aWNlOiBDaGF0c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGRhdGFiYXNlU2VydmljZTogRGF0YUJhc2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnVzZXJOdW1iZXIgPSBnZXRTdHJpbmcoJ3VzZXJJZCcpO1xuICAgIHRoaXMuc2F2ZV9wdXNoX3Rva2VuKCk7XG4gICAgdGhpcy5nZXRDaGF0c0Zyb21TZXJ2aWNlKCk7XG4gICAgdGhpcy5wdXNoVW5zZW50TWVzc2FnZXNUb1NlcnZlcigpO1xuICB9XG4gIGxvZ291dCgpIHtcbiAgICBjbGVhcigpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICB9XG4gIHNhdmVfcHVzaF90b2tlbigpIHtcbiAgICBjb25zdCBwdXNoVG9rZW4gPSBnZXRTdHJpbmcoJ3B1c2hUb2tlbicpO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB0b2tlbjogcHVzaFRva2VuLFxuICAgICAgdXNlcl9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgIH07XG4gICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIENvbmZpZy5zYXZlUHVzaFRva2VuVXJsO1xuICAgIGlmICh0aGlzLnVzZXJOdW1iZXIgJiYgcHVzaFRva2VuKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlblN1YnNjcmlwdGlvbiA9XG4gICAgICAgIHRoaXMuY2hhdHNTZXJ2aWNlLmNvbW1vblBvc3RTZXJ2aWNlKHVybCwgZGF0YSkuc3Vic2NyaWJlKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95VGltZXJPZlB1c2hUb2tlbigpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvRGF0YSgpO1xuICAgICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbiAgZGVzdHJveVRpbWVyT2ZQdXNoVG9rZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHVzaFRva2VuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy50aW1lclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuICBnZXRDaGF0c0Zyb21TZXJ2aWNlKCkge1xuICAgIHRoaXMuY2hhdHNTdWJzY3JpcHRpb24gPSB0aGlzLmNoYXRzU2VydmljZS5nZXRBbGxDaGF0cyh0aGlzLnVzZXJOdW1iZXIpXG4gICAgICAuc3Vic2NyaWJlKChjaGF0cykgPT4ge1xuICAgICAgICBjaGF0cy5mb3JFYWNoKChjaGF0KSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuaW5zZXJ0SW50b0NoYXRzKGNoYXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0NoYXRzRGF0YSgpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgYWxlcnQoJ0NvdWxkIG5vdCBmZXRjaCBjb250YWN0cyBsaXN0LicpO1xuICAgICAgfSk7XG4gIH1cbiAgLy8gZ2V0Q2hhdE1lc3NhZ2VzRnJvbVNlcnZpY2UoKSB7XG4gIC8vICAgdGhpcy5sYXN0TWVzc2FnZVN5bmNUaW1lID0gZ2V0U3RyaW5nKCdsYXN0TWVzc2FnZVN5bmNUaW1lJywgJzAnKTtcbiAgLy8gICB0aGlzLm1lc3NhZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGF0c1NlcnZpY2UuZ2V0Q2hhdE1lc3NhZ2VzKFxuICAvLyAgICAgdGhpcy51c2VyTnVtYmVyLCB0aGlzLmxhc3RNZXNzYWdlU3luY1RpbWUpXG4gIC8vICAgICAuc3Vic2NyaWJlKChtZXNzYWdlc0pzb24pID0+IHtcbiAgLy8gICAgICAgY29uc3QgbWVzc2FnZXNSZXNwb25zZSA9IG1lc3NhZ2VzSnNvbi5tZXNzYWdlcztcbiAgLy8gICAgICAgbWVzc2FnZXNSZXNwb25zZS5mb3JFYWNoKChtZXNzYWdlKSA9PiB7XG4gIC8vICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuaW5zZXJ0SW50b01lc3NhZ2VzKG1lc3NhZ2UpO1xuICAvLyAgICAgICB9KTtcbiAgLy8gICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyAgICAgICBzZXRTdHJpbmcoJ2xhc3RNZXNzYWdlU3luY1RpbWUnLCBjdXJyZW50VGltZS50b1N0cmluZygpKTtcbiAgLy8gICAgICAgdGhpcy5zdWJzY3JpYmVUb01lc3NhZ2VzRGF0YSgpO1xuICAvLyAgICAgfSwgKGVycm9yKSA9PiB7XG4gIC8vICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xuICAvLyAgICAgfSk7XG4gIC8vIH1cbiAgcHVzaFVuc2VudE1lc3NhZ2VzVG9TZXJ2ZXIoKSB7XG4gICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiTmFtZSkpLnRoZW4oKGRiKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFIHNlbnQgPSAwJztcbiAgICAgIGRiLmFsbChzZWxlY3RRdWVyeSkudGhlbigocm93cykgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gcm93cykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICB1bmlxdWVfaWQ6IHJvd3Nbcm93XVswXSxcbiAgICAgICAgICAgIHRvOiByb3dzW3Jvd11bOF0sXG4gICAgICAgICAgICBmcm9tX2lkOiB0aGlzLnVzZXJOdW1iZXIsXG4gICAgICAgICAgICB0ZXh0OiByb3dzW3Jvd11bMV0sXG4gICAgICAgICAgICBjcmVhdGVkX3RpbWU6IHJvd3Nbcm93XVs2XSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICB0aGlzLnVuc2VudE1lc3NhZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGF0c1NlcnZpY2Uuc2VuZE1lc3NhZ2UoZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MucmVzdWx0ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlU3RhdHVzT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgc3VjY2Vzcy5zdGF0dXMsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcy5tZXNzYWdlX3RpbWluZ3Muc2VudF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTZW50VGltZU9mTWVzc2FnZShcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcy5tZXNzYWdlX3RpbWluZ3Muc2VudF90aW1lLCBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5kZWxpdmVyZWRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlRGVsaXZlcnlUaW1lT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5zZW50X3RpbWUsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MubWVzc2FnZV9pZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlTWVzc2FlSWRPZk1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MubWVzc2FnZV9pZCwgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZVN0YXR1c09mTWVzc2FnZShcbiAgICAgICAgICAgICAgICBlcnJvci5zdGF0dXMsIGVycm9yLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGZldGNoIHVuc2VudCBtZXNzYWdlcyBmcm9tIGRiLicpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9KTtcbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNvbm5lY3QgdG8gRGF0YWJhc2UgNScpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9VbnNlbnRNZXNzYWdlc0RhdGEoKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcigxMDAwKS5maXJzdCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2F2ZV9wdXNoX3Rva2VuKCkpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9DaGF0c0RhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5jaGF0c3RpbWVyU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcig1ICogNjAwMDApLmZpcnN0KClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZXRDaGF0c0Zyb21TZXJ2aWNlKCkpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9VbnNlbnRNZXNzYWdlc0RhdGEoKTogdm9pZCB7XG4gICAgdGhpcy51bnNlbnRNZXNzYWdlc1N1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoMTAwMDApLmZpcnN0KClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wdXNoVW5zZW50TWVzc2FnZXNUb1NlcnZlcigpKTtcbiAgfVxufVxuIl19