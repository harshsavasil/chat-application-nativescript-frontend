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
        var selectQuery = 'SELECT * FROM messages WHERE sent = 0 LIMIT 1';
        while (true) {
            (new Sqlite(index_1.Config.dbName)).then(function (db) {
                db.each(selectQuery).then(function (row) {
                    var data = {
                        unique_id: row[0],
                        to: row[8],
                        from_id: _this.userNumber,
                        text: row[1],
                        created_time: row[6],
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
                }, function (error) {
                    // tslint:disable-next-line:no-console
                    console.log('Unable to fetch unsent messages', error);
                });
            }, function (dbErr) {
                // tslint:disable-next-line:no-console
                console.log(dbErr);
            });
        }
    };
    HomeComponent.prototype.subscribeToData = function () {
        var _this = this;
        this.timerSubscription = Observable_1.Observable.timer(1000).first()
            .subscribe(function () { return _this.save_push_token(); });
    };
    HomeComponent.prototype.subscribeToChatsData = function () {
        var _this = this;
        this.chatstimerSubscription = Observable_1.Observable.timer(1000).first()
            .subscribe(function () { return _this.getChatsFromService(); });
    };
    HomeComponent.prototype.subscribeToUnsentMessagesData = function () {
        var _this = this;
        this.unsentMessagesSubscription = Observable_1.Observable.timer(500).first()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCwwQ0FBeUM7QUFDekMsNkRBQTJFO0FBRTNFLDhDQUE2QztBQUU3Qyx1REFBcUQ7QUFDckQsNkRBQTJEO0FBQzNELHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFROUM7SUFVRSx1QkFDNkIsUUFBUSxFQUMzQixZQUEwQixFQUMxQixNQUFjLEVBQ2QsZUFBZ0M7UUFIYixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsOEJBQU0sR0FBTjtRQUNFLDRCQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsdUNBQWUsR0FBZjtRQUFBLGlCQWdCQztRQWZDLElBQU0sU0FBUyxHQUFHLGdDQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDekIsQ0FBQztRQUNGLElBQU0sR0FBRyxHQUFHLGNBQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxDQUFD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IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgY2xlYXIsIGdldFN0cmluZywgcmVtb3ZlLCBzZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBQdXNoTm90aWZpY2F0aW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQW5vbnltb3VzU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ2hhdHNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jaGF0cy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvZGF0YWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb3JlL2luZGV4Jztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12YXItcmVxdWlyZXNcbmNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtaG9tZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuICBwcml2YXRlIGxhc3RNZXNzYWdlU3luY1RpbWU6IHN0cmluZztcbiAgcHJpdmF0ZSB1c2VyTnVtYmVyOiBhbnk7XG4gIHByaXZhdGUgdGltZXJTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBwdXNoVG9rZW5TdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjaGF0c3RpbWVyU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY2hhdHNTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBtZXNzYWdlc1N1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHVuc2VudE1lc3NhZ2VzU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhQmFzZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMudXNlck51bWJlciA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgdGhpcy5zYXZlX3B1c2hfdG9rZW4oKTtcbiAgICB0aGlzLmdldENoYXRzRnJvbVNlcnZpY2UoKTtcbiAgICB0aGlzLnB1c2hVbnNlbnRNZXNzYWdlc1RvU2VydmVyKCk7XG4gIH1cbiAgbG9nb3V0KCkge1xuICAgIGNsZWFyKCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gIH1cbiAgc2F2ZV9wdXNoX3Rva2VuKCkge1xuICAgIGNvbnN0IHB1c2hUb2tlbiA9IGdldFN0cmluZygncHVzaFRva2VuJyk7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHRva2VuOiBwdXNoVG9rZW4sXG4gICAgICB1c2VyX2lkOiB0aGlzLnVzZXJOdW1iZXIsXG4gICAgfTtcbiAgICBjb25zdCB1cmwgPSBDb25maWcuYXBpVXJsICsgQ29uZmlnLnNhdmVQdXNoVG9rZW5Vcmw7XG4gICAgaWYgKHRoaXMudXNlck51bWJlciAmJiBwdXNoVG9rZW4pIHtcbiAgICAgIHRoaXMucHVzaFRva2VuU3Vic2NyaXB0aW9uID1cbiAgICAgICAgdGhpcy5jaGF0c1NlcnZpY2UuY29tbW9uUG9zdFNlcnZpY2UodXJsLCBkYXRhKS5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lUaW1lck9mUHVzaFRva2VuKCk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9EYXRhKCk7XG4gICAgICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBkZXN0cm95VGltZXJPZlB1c2hUb2tlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wdXNoVG9rZW5TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucHVzaFRva2VuU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbWVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG4gIGdldENoYXRzRnJvbVNlcnZpY2UoKSB7XG4gICAgdGhpcy5jaGF0c1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hhdHNTZXJ2aWNlLmdldEFsbENoYXRzKHRoaXMudXNlck51bWJlcilcbiAgICAgIC5zdWJzY3JpYmUoKGNoYXRzKSA9PiB7XG4gICAgICAgIGNoYXRzLmZvckVhY2goKGNoYXQpID0+IHtcbiAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5pbnNlcnRJbnRvQ2hhdHMoY2hhdCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvQ2hhdHNEYXRhKCk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBhbGVydCgnQ291bGQgbm90IGZldGNoIGNvbnRhY3RzIGxpc3QuJyk7XG4gICAgICB9KTtcbiAgfVxuICAvLyBnZXRDaGF0TWVzc2FnZXNGcm9tU2VydmljZSgpIHtcbiAgLy8gICB0aGlzLmxhc3RNZXNzYWdlU3luY1RpbWUgPSBnZXRTdHJpbmcoJ2xhc3RNZXNzYWdlU3luY1RpbWUnLCAnMCcpO1xuICAvLyAgIHRoaXMubWVzc2FnZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoYXRzU2VydmljZS5nZXRDaGF0TWVzc2FnZXMoXG4gIC8vICAgICB0aGlzLnVzZXJOdW1iZXIsIHRoaXMubGFzdE1lc3NhZ2VTeW5jVGltZSlcbiAgLy8gICAgIC5zdWJzY3JpYmUoKG1lc3NhZ2VzSnNvbikgPT4ge1xuICAvLyAgICAgICBjb25zdCBtZXNzYWdlc1Jlc3BvbnNlID0gbWVzc2FnZXNKc29uLm1lc3NhZ2VzO1xuICAvLyAgICAgICBtZXNzYWdlc1Jlc3BvbnNlLmZvckVhY2goKG1lc3NhZ2UpID0+IHtcbiAgLy8gICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS5pbnNlcnRJbnRvTWVzc2FnZXMobWVzc2FnZSk7XG4gIC8vICAgICAgIH0pO1xuICAvLyAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gIC8vICAgICAgIHNldFN0cmluZygnbGFzdE1lc3NhZ2VTeW5jVGltZScsIGN1cnJlbnRUaW1lLnRvU3RyaW5nKCkpO1xuICAvLyAgICAgICB0aGlzLnN1YnNjcmliZVRvTWVzc2FnZXNEYXRhKCk7XG4gIC8vICAgICB9LCAoZXJyb3IpID0+IHtcbiAgLy8gICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSk7XG4gIC8vICAgICB9KTtcbiAgLy8gfVxuICBwdXNoVW5zZW50TWVzc2FnZXNUb1NlcnZlcigpIHtcbiAgICBjb25zdCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFIHNlbnQgPSAwIExJTUlUIDEnO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAobmV3IFNxbGl0ZShDb25maWcuZGJOYW1lKSkudGhlbigoZGIpID0+IHtcbiAgICAgICAgZGIuZWFjaChzZWxlY3RRdWVyeSkudGhlbigocm93KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHVuaXF1ZV9pZDogcm93WzBdLFxuICAgICAgICAgICAgdG86IHJvd1s4XSxcbiAgICAgICAgICAgIGZyb21faWQ6IHRoaXMudXNlck51bWJlcixcbiAgICAgICAgICAgIHRleHQ6IHJvd1sxXSxcbiAgICAgICAgICAgIGNyZWF0ZWRfdGltZTogcm93WzZdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgIHRoaXMudW5zZW50TWVzc2FnZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoYXRzU2VydmljZS5zZW5kTWVzc2FnZShkYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3VjY2Vzcy5yZXN1bHQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTdGF0dXNPZk1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzLnN0YXR1cywgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5zZW50X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZVNlbnRUaW1lT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5zZW50X3RpbWUsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MubWVzc2FnZV90aW1pbmdzLmRlbGl2ZXJlZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVEZWxpdmVyeVRpbWVPZk1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MubWVzc2FnZV90aW1pbmdzLnNlbnRfdGltZSwgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcy5tZXNzYWdlX2lkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVNZXNzYWVJZE9mTWVzc2FnZShcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcy5tZXNzYWdlX2lkLCBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlU3RhdHVzT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgIGVycm9yLnN0YXR1cywgZXJyb3IudW5pcXVlX2lkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gZmV0Y2ggdW5zZW50IG1lc3NhZ2VzJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIChkYkVycikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyhkYkVycik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RhdGEoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoMTAwMCkuZmlyc3QoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNhdmVfcHVzaF90b2tlbigpKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvQ2hhdHNEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhdHN0aW1lclN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoMTAwMCkuZmlyc3QoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmdldENoYXRzRnJvbVNlcnZpY2UoKSk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Vuc2VudE1lc3NhZ2VzRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc2VudE1lc3NhZ2VzU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcig1MDApLmZpcnN0KClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wdXNoVW5zZW50TWVzc2FnZXNUb1NlcnZlcigpKTtcbiAgfVxufVxuIl19