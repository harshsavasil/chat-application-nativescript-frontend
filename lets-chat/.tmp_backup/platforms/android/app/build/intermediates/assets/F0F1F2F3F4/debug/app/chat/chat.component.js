"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var router_2 = require("nativescript-angular/router");
var Observable_1 = require("rxjs/Observable");
var core_2 = require("../core");
var database_service_1 = require("../core/database.service");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
var index_1 = require("../core/index");
var ChatComponent = (function () {
    function ChatComponent(route, chatsService, router, ref, databaseService, platform) {
        this.route = route;
        this.chatsService = chatsService;
        this.router = router;
        this.ref = ref;
        this.databaseService = databaseService;
        this.platform = platform;
        this.messages = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.unread = +params.unread;
            _this.chat = JSON.parse(params.chatJson);
            _this.lastSeenTime = _this.chat.when;
        });
        this.userNumber = application_settings_1.getString('userId');
        this.getMessages();
    };
    ChatComponent.prototype.getMessages = function () {
        var _this = this;
        // console.log('updating UI');
        var selectQuery = 'SELECT * FROM messages WHERE contact = ?';
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
            db.all(selectQuery, [_this.chat.number]).then(function (rows) {
                _this.messages = [];
                // tslint:disable-next-line:forin
                for (var row in rows) {
                    var messageJson = {
                        text: '',
                        sender: '',
                        sent: '',
                        created: '',
                    };
                    messageJson.text = rows[row][1];
                    if (rows[row][2] === 1) {
                        messageJson.sender = null;
                    }
                    else {
                        messageJson.sender = _this.chat.contact;
                    }
                    messageJson.created = rows[row][6];
                    messageJson.sent = rows[row][7];
                    _this.messages.push(messageJson);
                }
                db.close();
                // alert('This is new data');
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('SELECT ERROR', error);
            });
        });
        this.subscribeToData();
    };
    ChatComponent.prototype.recieveMessage = function ($event) {
        var textMessage = $event;
        this.chat.text = textMessage;
        this.sendMessageToServer();
    };
    ChatComponent.prototype.readMessage = function () {
        var data = {
            user_id: this.userNumber,
            contact_id: this.chat.number,
        };
        this.chatsService.readMessages(data)
            .subscribe(function (success) {
            // tslint:disable-next-line:no-console
            console.log('Message read reciepts.');
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('Issue in Message Reading.');
        });
    };
    ChatComponent.prototype.goBack = function () {
        this.router.back();
    };
    ChatComponent.prototype.refreshMe = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.getMessages();
            args.object.refreshing = false;
        }, 1000);
    };
    ChatComponent.prototype.sendMessageToServer = function () {
        var _this = this;
        var selectQuery = 'SELECT * FROM messages WHERE sent = 0 LIMIT 1';
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
                    _this.chatsService.sendMessage(data)
                        .subscribe(function (success) {
                        if (success.result === 1) {
                            _this.databaseService.updateStatusOfMessage(success.status, success.unique_id);
                            if (success.message_timings.sent_time) {
                                _this.databaseService.updateSentTimeOfMessage(success.message_timings.sent_time, success.unique_id);
                            }
                            if (success.message_timings.delivered_time) {
                                _this.databaseService.updateDeliveryTimeOfMessage(success.message_timings.delivered_time, success.unique_id);
                            }
                            if (success.message_id) {
                                _this.databaseService.updateMessaeIdOfMessage(success.message_id, success.unique_id);
                            }
                        }
                    }, function (error) {
                        _this.databaseService.updateStatusOfMessage(error.status, error.unique_id);
                    });
                }
            }, function (dbErr) {
                // tslint:disable-next-line:no-console
                console.log(dbErr);
            });
            _this.getMessages();
        });
    };
    ChatComponent.prototype.subscribeToData = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        this.timerSubscription = Observable_1.Observable.timer(1000).first().subscribe(function () { return _this.getMessages(); });
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __param(5, core_1.Inject('platform')),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_2.ChatsService,
            router_2.RouterExtensions,
            core_1.ChangeDetectorRef,
            database_service_1.DataBaseService, Object])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsNkRBQWlEO0FBRWpELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsZ0NBQXNEO0FBQ3RELDZEQUEyRDtBQUUzRCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsdUNBQXVDO0FBU3ZDO0lBVUUsdUJBQ1UsS0FBcUIsRUFDckIsWUFBMEIsRUFDMUIsTUFBd0IsRUFDeEIsR0FBc0IsRUFDdEIsZUFBZ0MsRUFDYixRQUFRO1FBTDNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNiLGFBQVEsR0FBUixRQUFRLENBQUE7UUFackMsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQWNkLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENB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QUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBM0lVLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7UUFpQkcsV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7eUNBTEosdUJBQWM7WUFDUCxtQkFBWTtZQUNsQix5QkFBZ0I7WUFDbkIsd0JBQWlCO1lBQ0wsa0NBQWU7T0FmL0IsYUFBYSxDQTRJekI7SUFBRCxvQkFBQztDQUFBLEFBNUlELElBNElDO0FBNUlZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsIEluamVjdCwgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHVsbFRvUmVmcmVzaCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQW5vbnltb3VzU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ2hhdCwgQ2hhdHNTZXJ2aWNlLCBDb250YWN0IH0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQgeyBEYXRhQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2RhdGFiYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL21lc3NhZ2UubW9kZWwnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLWNoYXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hhdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoYXQuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNoYXRJbmRleDogbnVtYmVyO1xuICBjaGF0OiBhbnk7XG4gIHVucmVhZDogbnVtYmVyO1xuICBtZXNzYWdlcyA9IFtdO1xuICB1c2VyTnVtYmVyOiBzdHJpbmc7XG4gIGxhc3RTZWVuVGltZTogYW55O1xuICBwcml2YXRlIHRpbWVyU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgTWVzc2FnZVN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgY2hhdHNTZXJ2aWNlOiBDaGF0c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhQmFzZVNlcnZpY2UsXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgdGhpcy51bnJlYWQgPSArcGFyYW1zLnVucmVhZDtcbiAgICAgIHRoaXMuY2hhdCA9IEpTT04ucGFyc2UocGFyYW1zLmNoYXRKc29uKTtcbiAgICAgIHRoaXMubGFzdFNlZW5UaW1lID0gdGhpcy5jaGF0LndoZW47XG4gICAgfSk7XG4gICAgdGhpcy51c2VyTnVtYmVyID0gZ2V0U3RyaW5nKCd1c2VySWQnKTtcbiAgICB0aGlzLmdldE1lc3NhZ2VzKCk7XG4gIH1cblxuICBnZXRNZXNzYWdlcygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygndXBkYXRpbmcgVUknKTtcbiAgICBjb25zdCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFIGNvbnRhY3QgPSA/JztcbiAgICAobmV3IFNxbGl0ZShDb25maWcuZGJOYW1lKSkudGhlbigoZGIpID0+IHtcbiAgICAgIGRiLmFsbChzZWxlY3RRdWVyeSwgW3RoaXMuY2hhdC5udW1iZXJdKS50aGVuKChyb3dzKSA9PiB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlSnNvbiA9IHtcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgc2VuZGVyOiAnJyxcbiAgICAgICAgICAgIHNlbnQ6ICcnLFxuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBtZXNzYWdlSnNvbi50ZXh0ID0gcm93c1tyb3ddWzFdO1xuICAgICAgICAgIGlmIChyb3dzW3Jvd11bMl0gPT09IDEpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VKc29uLnNlbmRlciA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2VKc29uLnNlbmRlciA9IHRoaXMuY2hhdC5jb250YWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXNzYWdlSnNvbi5jcmVhdGVkID0gcm93c1tyb3ddWzZdO1xuICAgICAgICAgIG1lc3NhZ2VKc29uLnNlbnQgPSByb3dzW3Jvd11bN107XG4gICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2VKc29uKTtcbiAgICAgICAgfVxuICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICAvLyBhbGVydCgnVGhpcyBpcyBuZXcgZGF0YScpO1xuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKCdTRUxFQ1QgRVJST1InLCBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZVRvRGF0YSgpO1xuICB9XG4gIHJlY2lldmVNZXNzYWdlKCRldmVudCkge1xuICAgIGNvbnN0IHRleHRNZXNzYWdlID0gJGV2ZW50O1xuICAgIHRoaXMuY2hhdC50ZXh0ID0gdGV4dE1lc3NhZ2U7XG4gICAgdGhpcy5zZW5kTWVzc2FnZVRvU2VydmVyKCk7XG4gIH1cbiAgcmVhZE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHVzZXJfaWQ6IHRoaXMudXNlck51bWJlcixcbiAgICAgIGNvbnRhY3RfaWQ6IHRoaXMuY2hhdC5udW1iZXIsXG4gICAgfTtcbiAgICB0aGlzLmNoYXRzU2VydmljZS5yZWFkTWVzc2FnZXMoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ01lc3NhZ2UgcmVhZCByZWNpZXB0cy4nKTtcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnSXNzdWUgaW4gTWVzc2FnZSBSZWFkaW5nLicpO1xuICAgICAgfSk7XG4gIH1cblxuICBnb0JhY2soKSB7XG4gICAgdGhpcy5yb3V0ZXIuYmFjaygpO1xuICB9XG4gIHJlZnJlc2hNZShhcmdzOiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoKTtcbiAgICAgIChhcmdzLm9iamVjdCBhcyBQdWxsVG9SZWZyZXNoKS5yZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSwgMTAwMCk7XG4gIH1cbiAgc2VuZE1lc3NhZ2VUb1NlcnZlcigpIHtcbiAgICBjb25zdCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFIHNlbnQgPSAwIExJTUlUIDEnO1xuICAgIChuZXcgU3FsaXRlKENvbmZpZy5kYk5hbWUpKS50aGVuKChkYikgPT4ge1xuICAgICAgZGIuYWxsKHNlbGVjdFF1ZXJ5KS50aGVuKChyb3dzKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHVuaXF1ZV9pZDogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgdG86IHJvd3Nbcm93XVs4XSxcbiAgICAgICAgICAgIGZyb21faWQ6IHRoaXMudXNlck51bWJlcixcbiAgICAgICAgICAgIHRleHQ6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgIGNyZWF0ZWRfdGltZTogcm93c1tyb3ddWzZdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5jaGF0c1NlcnZpY2Uuc2VuZE1lc3NhZ2UoZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MucmVzdWx0ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlU3RhdHVzT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgc3VjY2Vzcy5zdGF0dXMsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcy5tZXNzYWdlX3RpbWluZ3Muc2VudF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTZW50VGltZU9mTWVzc2FnZShcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcy5tZXNzYWdlX3RpbWluZ3Muc2VudF90aW1lLCBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5kZWxpdmVyZWRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlRGVsaXZlcnlUaW1lT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5kZWxpdmVyZWRfdGltZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcy5tZXNzYWdlX2lkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVNZXNzYWVJZE9mTWVzc2FnZShcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcy5tZXNzYWdlX2lkLCBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZVNlcnZpY2UudXBkYXRlU3RhdHVzT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgIGVycm9yLnN0YXR1cywgZXJyb3IudW5pcXVlX2lkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCAoZGJFcnIpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coZGJFcnIpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmdldE1lc3NhZ2VzKCk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RhdGEoKTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLnRpbWVyKDEwMDApLmZpcnN0KCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZ2V0TWVzc2FnZXMoKSk7XG4gIH1cbn1cbiJdfQ==