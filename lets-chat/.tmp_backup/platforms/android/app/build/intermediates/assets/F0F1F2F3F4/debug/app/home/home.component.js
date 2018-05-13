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
                        console.log(error.message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsNkRBQTJFO0FBRTNFLDhDQUE2QztBQUU3Qyx1REFBcUQ7QUFDckQsNkRBQTJEO0FBQzNELHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFROUM7SUFVRSx1QkFDNkIsUUFBUSxFQUMzQixZQUEwQixFQUMxQixNQUFjLEVBQ2QsZUFBZ0M7UUFIYixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsOEJBQU0sR0FBTjtRQUNFLDRCQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsdUNBQWUsR0FBZjtRQUFBLGlCQWdCQztRQWZDLElBQU0sU0FBUyxHQUFHLGdDQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDekIsQ0FBQztRQUNGLElBQU0sR0FBRyxHQUFHLGNBQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxDQUFD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akQsQ0FBQztJQUNPLHFEQUE2QixHQUFyQztRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTthQUM3RCxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQywwQkFBMEIsRUFBRSxFQUFqQyxDQUFpQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQTFIVSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNwQyxDQUFDO1FBWUcsV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7aURBQ0csNEJBQVk7WUFDbEIsZUFBTTtZQUNHLGtDQUFlO09BZC9CLGFBQWEsQ0EySHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTNIRCxJQTJIQztBQTNIWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBjbGVhciwgZ2V0U3RyaW5nLCByZW1vdmUsIHNldFN0cmluZyB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCAqIGFzIFB1c2hOb3RpZmljYXRpb25zIGZyb20gJ25hdGl2ZXNjcmlwdC1wdXNoLW5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBbm9ueW1vdXNTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBDaGF0c1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2NoYXRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YUJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9kYXRhYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1ob21lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCB7XG4gIHByaXZhdGUgbGFzdE1lc3NhZ2VTeW5jVGltZTogc3RyaW5nO1xuICBwcml2YXRlIHVzZXJOdW1iZXI6IGFueTtcbiAgcHJpdmF0ZSB0aW1lclN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHB1c2hUb2tlblN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNoYXRzdGltZXJTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjaGF0c1N1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIG1lc3NhZ2VzU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgdW5zZW50TWVzc2FnZXNTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdwbGF0Zm9ybScpIHB1YmxpYyBwbGF0Zm9ybSxcbiAgICBwcml2YXRlIGNoYXRzU2VydmljZTogQ2hhdHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhYmFzZVNlcnZpY2U6IERhdGFCYXNlU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy51c2VyTnVtYmVyID0gZ2V0U3RyaW5nKCd1c2VySWQnKTtcbiAgICB0aGlzLnNhdmVfcHVzaF90b2tlbigpO1xuICAgIHRoaXMuZ2V0Q2hhdHNGcm9tU2VydmljZSgpO1xuICAgIHRoaXMucHVzaFVuc2VudE1lc3NhZ2VzVG9TZXJ2ZXIoKTtcbiAgfVxuICBsb2dvdXQoKSB7XG4gICAgY2xlYXIoKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcbiAgfVxuICBzYXZlX3B1c2hfdG9rZW4oKSB7XG4gICAgY29uc3QgcHVzaFRva2VuID0gZ2V0U3RyaW5nKCdwdXNoVG9rZW4nKTtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgdG9rZW46IHB1c2hUb2tlbixcbiAgICAgIHVzZXJfaWQ6IHRoaXMudXNlck51bWJlcixcbiAgICB9O1xuICAgIGNvbnN0IHVybCA9IENvbmZpZy5hcGlVcmwgKyBDb25maWcuc2F2ZVB1c2hUb2tlblVybDtcbiAgICBpZiAodGhpcy51c2VyTnVtYmVyICYmIHB1c2hUb2tlbikge1xuICAgICAgdGhpcy5wdXNoVG9rZW5TdWJzY3JpcHRpb24gPVxuICAgICAgICB0aGlzLmNoYXRzU2VydmljZS5jb21tb25Qb3N0U2VydmljZSh1cmwsIGRhdGEpLnN1YnNjcmliZSgoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIHRoaXMuZGVzdHJveVRpbWVyT2ZQdXNoVG9rZW4oKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0RhdGEoKTtcbiAgICAgICAgICAvLyBhbGVydChlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGRlc3Ryb3lUaW1lck9mUHVzaFRva2VuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnB1c2hUb2tlblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5wdXNoVG9rZW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbiAgZ2V0Q2hhdHNGcm9tU2VydmljZSgpIHtcbiAgICB0aGlzLmNoYXRzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGF0c1NlcnZpY2UuZ2V0QWxsQ2hhdHModGhpcy51c2VyTnVtYmVyKVxuICAgICAgLnN1YnNjcmliZSgoY2hhdHMpID0+IHtcbiAgICAgICAgY2hhdHMuZm9yRWFjaCgoY2hhdCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmluc2VydEludG9DaGF0cyhjaGF0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9DaGF0c0RhdGEoKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGFsZXJ0KCdDb3VsZCBub3QgZmV0Y2ggY29udGFjdHMgbGlzdC4nKTtcbiAgICAgIH0pO1xuICB9XG4gIC8vIGdldENoYXRNZXNzYWdlc0Zyb21TZXJ2aWNlKCkge1xuICAvLyAgIHRoaXMubGFzdE1lc3NhZ2VTeW5jVGltZSA9IGdldFN0cmluZygnbGFzdE1lc3NhZ2VTeW5jVGltZScsICcwJyk7XG4gIC8vICAgdGhpcy5tZXNzYWdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hhdHNTZXJ2aWNlLmdldENoYXRNZXNzYWdlcyhcbiAgLy8gICAgIHRoaXMudXNlck51bWJlciwgdGhpcy5sYXN0TWVzc2FnZVN5bmNUaW1lKVxuICAvLyAgICAgLnN1YnNjcmliZSgobWVzc2FnZXNKc29uKSA9PiB7XG4gIC8vICAgICAgIGNvbnN0IG1lc3NhZ2VzUmVzcG9uc2UgPSBtZXNzYWdlc0pzb24ubWVzc2FnZXM7XG4gIC8vICAgICAgIG1lc3NhZ2VzUmVzcG9uc2UuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAvLyAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmluc2VydEludG9NZXNzYWdlcyhtZXNzYWdlKTtcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgLy8gICAgICAgc2V0U3RyaW5nKCdsYXN0TWVzc2FnZVN5bmNUaW1lJywgY3VycmVudFRpbWUudG9TdHJpbmcoKSk7XG4gIC8vICAgICAgIHRoaXMuc3Vic2NyaWJlVG9NZXNzYWdlc0RhdGEoKTtcbiAgLy8gICAgIH0sIChlcnJvcikgPT4ge1xuICAvLyAgICAgICBhbGVydChlcnJvci5tZXNzYWdlKTtcbiAgLy8gICAgIH0pO1xuICAvLyB9XG4gIHB1c2hVbnNlbnRNZXNzYWdlc1RvU2VydmVyKCkge1xuICAgIGNvbnN0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gbWVzc2FnZXMgV0hFUkUgc2VudCA9IDAnO1xuICAgIChuZXcgU3FsaXRlKENvbmZpZy5kYk5hbWUpKS50aGVuKChkYikgPT4ge1xuICAgICAgZGIuYWxsKHNlbGVjdFF1ZXJ5KS50aGVuKChyb3dzKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHVuaXF1ZV9pZDogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgdG86IHJvd3Nbcm93XVs4XSxcbiAgICAgICAgICAgIGZyb21faWQ6IHRoaXMudXNlck51bWJlcixcbiAgICAgICAgICAgIHRleHQ6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgIGNyZWF0ZWRfdGltZTogcm93c1tyb3ddWzZdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy51bnNlbnRNZXNzYWdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hhdHNTZXJ2aWNlLnNlbmRNZXNzYWdlKGRhdGEpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZVN0YXR1c09mTWVzc2FnZShcbiAgICAgICAgICAgICAgICBzdWNjZXNzLnN0YXR1cywgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTZW50VGltZU9mTWVzc2FnZShcbiAgICAgICAgICAgICAgICBzdWNjZXNzLnNlbnRfdGltZSwgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVNZXNzYWVJZE9mTWVzc2FnZShcbiAgICAgICAgICAgICAgICBzdWNjZXNzLm1lc3NhZ2VfaWQsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCAoZGJFcnIpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coZGJFcnIpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvVW5zZW50TWVzc2FnZXNEYXRhKCk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RhdGEoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoMTAwMCkuZmlyc3QoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNhdmVfcHVzaF90b2tlbigpKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvQ2hhdHNEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhdHN0aW1lclN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoNSAqIDYwICogMTAwMCkuZmlyc3QoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmdldENoYXRzRnJvbVNlcnZpY2UoKSk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Vuc2VudE1lc3NhZ2VzRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc2VudE1lc3NhZ2VzU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcig1MDAwKS5maXJzdCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucHVzaFVuc2VudE1lc3NhZ2VzVG9TZXJ2ZXIoKSk7XG4gIH1cbn1cbiJdfQ==