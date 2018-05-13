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
        this.getChatMessagesFromService();
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
                    // alert(error.message);
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
    HomeComponent.prototype.getChatMessagesFromService = function () {
        var _this = this;
        this.lastMessageSyncTime = application_settings_1.getString('lastMessageSyncTime', '0');
        this.messagesSubscription = this.chatsService.getChatMessages(this.userNumber, this.lastMessageSyncTime)
            .subscribe(function (messagesJson) {
            var messagesResponse = messagesJson.messages;
            messagesResponse.forEach(function (message) {
                if (!_this.databaseService.checkIfMessageExists(message.message_id)) {
                    _this.databaseService.insertReceivedMessages(message);
                }
            });
            var currentTime = Date.now();
            application_settings_1.setString('lastMessageSyncTime', currentTime.toString());
        }, function (error) {
            alert(error.message);
        });
        this.subscribeToMessagesData();
    };
    HomeComponent.prototype.pushUnsentMessagesToServer = function () {
        var _this = this;
        var selectQuery = 'SELECT * FROM messages WHERE sent = 0';
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
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
                    _this.unsentMessagesSubscription = _this.chatsService.sendMessage(data)
                        .subscribe(function (success) {
                        _this.databaseService.updateStatusOfMessage(success.status, success.unique_id);
                        _this.databaseService.updateSentTimeOfMessage(success.sent_time, success.unique_id);
                        _this.databaseService.updateMessaeIdOfMessage(success.message_id, success.unique_id);
                    }, function (error) {
                        // tslint:disable-next-line:no-console
                        // console.log(error.message);
                    });
                }
            }, function (dbErr) {
                // tslint:disable-next-line:no-console
                console.log(dbErr);
            });
            _this.subscribeToUnsentMessagesData();
        });
    };
    HomeComponent.prototype.subscribeToData = function () {
        var _this = this;
        this.timerSubscription = Observable_1.Observable.timer(1000).first()
            .subscribe(function () { return _this.save_push_token(); });
    };
    HomeComponent.prototype.subscribeToChatsData = function () {
        var _this = this;
        this.chatstimerSubscription = Observable_1.Observable.timer(5 * 60 * 1000).first()
            .subscribe(function () { return _this.getChatsFromService(); });
    };
    HomeComponent.prototype.subscribeToUnsentMessagesData = function () {
        var _this = this;
        this.unsentMessagesSubscription = Observable_1.Observable.timer(5000).first()
            .subscribe(function () { return _this.pushUnsentMessagesToServer(); });
    };
    HomeComponent.prototype.subscribeToMessagesData = function () {
        var _this = this;
        this.messagesSubscription = Observable_1.Observable.timer(5000).first()
            .subscribe(function () { return _this.getChatMessagesFromService(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsNkRBQTJFO0FBRTNFLDhDQUE2QztBQUU3Qyx1REFBcUQ7QUFDckQsNkRBQTJEO0FBQzNELHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFROUM7SUFVRSx1QkFDNkIsUUFBUSxFQUMzQixZQUEwQixFQUMxQixNQUFjLEVBQ2QsZUFBZ0M7UUFIYixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsOEJBQU0sR0FBTjtRQUNFLDRCQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsdUNBQWUsR0FBZjtRQUFBLGlCQWdCQztRQWZDLElBQU0sU0FBUyxHQUFHLGdDQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDekIsQ0FBQztRQUNGLElBQU0sR0FBRyxH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QU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQztRQVlHLFdBQUEsYUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2lEQUNHLDRCQUFZO1lBQ2xCLGVBQU07WUFDRyxrQ0FBZTtPQWQvQixhQUFhLENBa0l6QjtJQUFELG9CQUFDO0NBQUEsQUFsSUQsSUFrSUM7QUFsSVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgY2xlYXIsIGdldFN0cmluZywgcmVtb3ZlLCBzZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBQdXNoTm90aWZpY2F0aW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQW5vbnltb3VzU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ2hhdHNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jaGF0cy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvZGF0YWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb3JlL2luZGV4Jztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12YXItcmVxdWlyZXNcbmNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtaG9tZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuICBwcml2YXRlIGxhc3RNZXNzYWdlU3luY1RpbWU6IHN0cmluZztcbiAgcHJpdmF0ZSB1c2VyTnVtYmVyOiBhbnk7XG4gIHByaXZhdGUgdGltZXJTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBwdXNoVG9rZW5TdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjaGF0c3RpbWVyU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY2hhdHNTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBtZXNzYWdlc1N1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHVuc2VudE1lc3NhZ2VzU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhQmFzZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMudXNlck51bWJlciA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgdGhpcy5zYXZlX3B1c2hfdG9rZW4oKTtcbiAgICB0aGlzLmdldENoYXRzRnJvbVNlcnZpY2UoKTtcbiAgICB0aGlzLmdldENoYXRNZXNzYWdlc0Zyb21TZXJ2aWNlKCk7XG4gICAgdGhpcy5wdXNoVW5zZW50TWVzc2FnZXNUb1NlcnZlcigpO1xuICB9XG4gIGxvZ291dCgpIHtcbiAgICBjbGVhcigpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICB9XG4gIHNhdmVfcHVzaF90b2tlbigpIHtcbiAgICBjb25zdCBwdXNoVG9rZW4gPSBnZXRTdHJpbmcoJ3B1c2hUb2tlbicpO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB0b2tlbjogcHVzaFRva2VuLFxuICAgICAgdXNlcl9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgIH07XG4gICAgY29uc3QgdXJsID0gQ29uZmlnLmFwaVVybCArIENvbmZpZy5zYXZlUHVzaFRva2VuVXJsO1xuICAgIGlmICh0aGlzLnVzZXJOdW1iZXIgJiYgcHVzaFRva2VuKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlblN1YnNjcmlwdGlvbiA9XG4gICAgICAgIHRoaXMuY2hhdHNTZXJ2aWNlLmNvbW1vblBvc3RTZXJ2aWNlKHVybCwgZGF0YSkuc3Vic2NyaWJlKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95VGltZXJPZlB1c2hUb2tlbigpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvRGF0YSgpO1xuICAgICAgICAgIC8vIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbiAgZGVzdHJveVRpbWVyT2ZQdXNoVG9rZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHVzaFRva2VuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy50aW1lclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuICBnZXRDaGF0c0Zyb21TZXJ2aWNlKCkge1xuICAgIHRoaXMuY2hhdHNTdWJzY3JpcHRpb24gPSB0aGlzLmNoYXRzU2VydmljZS5nZXRBbGxDaGF0cyh0aGlzLnVzZXJOdW1iZXIpXG4gICAgICAuc3Vic2NyaWJlKChjaGF0cykgPT4ge1xuICAgICAgICBjaGF0cy5mb3JFYWNoKChjaGF0KSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UuaW5zZXJ0SW50b0NoYXRzKGNoYXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0NoYXRzRGF0YSgpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgYWxlcnQoJ0NvdWxkIG5vdCBmZXRjaCBjb250YWN0cyBsaXN0LicpO1xuICAgICAgfSk7XG4gIH1cbiAgZ2V0Q2hhdE1lc3NhZ2VzRnJvbVNlcnZpY2UoKSB7XG4gICAgdGhpcy5sYXN0TWVzc2FnZVN5bmNUaW1lID0gZ2V0U3RyaW5nKCdsYXN0TWVzc2FnZVN5bmNUaW1lJywgJzAnKTtcbiAgICB0aGlzLm1lc3NhZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGF0c1NlcnZpY2UuZ2V0Q2hhdE1lc3NhZ2VzKFxuICAgICAgdGhpcy51c2VyTnVtYmVyLCB0aGlzLmxhc3RNZXNzYWdlU3luY1RpbWUpXG4gICAgICAuc3Vic2NyaWJlKChtZXNzYWdlc0pzb24pID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXNSZXNwb25zZSA9IG1lc3NhZ2VzSnNvbi5tZXNzYWdlcztcbiAgICAgICAgbWVzc2FnZXNSZXNwb25zZS5mb3JFYWNoKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmRhdGFiYXNlU2VydmljZS5jaGVja0lmTWVzc2FnZUV4aXN0cyhtZXNzYWdlLm1lc3NhZ2VfaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5pbnNlcnRSZWNlaXZlZE1lc3NhZ2VzKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgc2V0U3RyaW5nKCdsYXN0TWVzc2FnZVN5bmNUaW1lJywgY3VycmVudFRpbWUudG9TdHJpbmcoKSk7XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZVRvTWVzc2FnZXNEYXRhKCk7XG4gIH1cbiAgcHVzaFVuc2VudE1lc3NhZ2VzVG9TZXJ2ZXIoKSB7XG4gICAgY29uc3Qgc2VsZWN0UXVlcnkgPSAnU0VMRUNUICogRlJPTSBtZXNzYWdlcyBXSEVSRSBzZW50ID0gMCc7XG4gICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiTmFtZSkpLnRoZW4oKGRiKSA9PiB7XG4gICAgICBkYi5hbGwoc2VsZWN0UXVlcnkpLnRoZW4oKHJvd3MpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdW5pcXVlX2lkOiByb3dzW3Jvd11bMF0sXG4gICAgICAgICAgICB0bzogcm93c1tyb3ddWzhdLFxuICAgICAgICAgICAgZnJvbV9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgICAgICAgICAgdGV4dDogcm93c1tyb3ddWzFdLFxuICAgICAgICAgICAgY3JlYXRlZF90aW1lOiByb3dzW3Jvd11bNl0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnVuc2VudE1lc3NhZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGF0c1NlcnZpY2Uuc2VuZE1lc3NhZ2UoZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlU3RhdHVzT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3Muc3RhdHVzLCBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZVNlbnRUaW1lT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3Muc2VudF90aW1lLCBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZU1lc3NhZUlkT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MubWVzc2FnZV9pZCwgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIChkYkVycikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyhkYkVycik7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9VbnNlbnRNZXNzYWdlc0RhdGEoKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcigxMDAwKS5maXJzdCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2F2ZV9wdXNoX3Rva2VuKCkpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9DaGF0c0RhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5jaGF0c3RpbWVyU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcig1ICogNjAgKiAxMDAwKS5maXJzdCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZ2V0Q2hhdHNGcm9tU2VydmljZSgpKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvVW5zZW50TWVzc2FnZXNEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMudW5zZW50TWVzc2FnZXNTdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLnRpbWVyKDUwMDApLmZpcnN0KClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wdXNoVW5zZW50TWVzc2FnZXNUb1NlcnZlcigpKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvTWVzc2FnZXNEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMubWVzc2FnZXNTdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLnRpbWVyKDUwMDApLmZpcnN0KClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZXRDaGF0TWVzc2FnZXNGcm9tU2VydmljZSgpKTtcbiAgfVxufVxuIl19