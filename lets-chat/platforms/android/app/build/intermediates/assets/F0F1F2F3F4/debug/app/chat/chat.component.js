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
        // tslint:disable-next-line:max-line-length
        var selectQuery = 'SELECT * FROM messages WHERE contact = ? ORDER BY createdTime';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsNkRBQWlEO0FBRWpELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsZ0NBQXNEO0FBQ3RELDZEQUEyRDtBQUUzRCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsdUNBQXVDO0FBU3ZDO0lBVUUsdUJBQ1UsS0FBcUIsRUFDckIsWUFBMEIsRUFDMUIsTUFBd0IsRUFDeEIsR0FBc0IsRUFDdEIsZUFBZ0MsRUFDYixRQUFRO1FBTDNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNiLGFBQVEsR0FBUixRQUFRLENBQUE7UUFackMsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQWNkLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENB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LENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDOUYsQ0FBQztJQTVJVSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO1FBaUJHLFdBQUEsYUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3lDQUxKLHVCQUFjO1lBQ1AsbUJBQVk7WUFDbEIseUJBQWdCO1lBQ25CLHdCQUFpQjtZQUNMLGtDQUFlO09BZi9CLGFBQWEsQ0E2SXpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdJRCxJQTZJQztBQTdJWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFB1bGxUb1JlZnJlc2ggfSBmcm9tICduYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFub255bW91c1N1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENoYXQsIENoYXRzU2VydmljZSwgQ29udGFjdCB9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHsgRGF0YUJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9kYXRhYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tZXNzYWdlLm1vZGVsJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12YXItcmVxdWlyZXNcbmNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1jaGF0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NoYXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGF0LmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoYXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjaGF0SW5kZXg6IG51bWJlcjtcbiAgY2hhdDogYW55O1xuICB1bnJlYWQ6IG51bWJlcjtcbiAgbWVzc2FnZXMgPSBbXTtcbiAgdXNlck51bWJlcjogc3RyaW5nO1xuICBsYXN0U2VlblRpbWU6IGFueTtcbiAgcHJpdmF0ZSB0aW1lclN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIE1lc3NhZ2VTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIGNoYXRzU2VydmljZTogQ2hhdHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGRhdGFiYXNlU2VydmljZTogRGF0YUJhc2VTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ3BsYXRmb3JtJykgcHVibGljIHBsYXRmb3JtLFxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgIHRoaXMudW5yZWFkID0gK3BhcmFtcy51bnJlYWQ7XG4gICAgICB0aGlzLmNoYXQgPSBKU09OLnBhcnNlKHBhcmFtcy5jaGF0SnNvbik7XG4gICAgICB0aGlzLmxhc3RTZWVuVGltZSA9IHRoaXMuY2hhdC53aGVuO1xuICAgIH0pO1xuICAgIHRoaXMudXNlck51bWJlciA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICB9XG5cbiAgZ2V0TWVzc2FnZXMoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3VwZGF0aW5nIFVJJyk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGNvbnN0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gbWVzc2FnZXMgV0hFUkUgY29udGFjdCA9ID8gT1JERVIgQlkgY3JlYXRlZFRpbWUnO1xuICAgIChuZXcgU3FsaXRlKENvbmZpZy5kYk5hbWUpKS50aGVuKChkYikgPT4ge1xuICAgICAgZGIuYWxsKHNlbGVjdFF1ZXJ5LCBbdGhpcy5jaGF0Lm51bWJlcl0pLnRoZW4oKHJvd3MpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gcm93cykge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VKc29uID0ge1xuICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICBzZW5kZXI6ICcnLFxuICAgICAgICAgICAgc2VudDogJycsXG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG1lc3NhZ2VKc29uLnRleHQgPSByb3dzW3Jvd11bMV07XG4gICAgICAgICAgaWYgKHJvd3Nbcm93XVsyXSA9PT0gMSkge1xuICAgICAgICAgICAgbWVzc2FnZUpzb24uc2VuZGVyID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZUpzb24uc2VuZGVyID0gdGhpcy5jaGF0LmNvbnRhY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lc3NhZ2VKc29uLmNyZWF0ZWQgPSByb3dzW3Jvd11bNl07XG4gICAgICAgICAgbWVzc2FnZUpzb24uc2VudCA9IHJvd3Nbcm93XVs3XTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZUpzb24pO1xuICAgICAgICB9XG4gICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgIC8vIGFsZXJ0KCdUaGlzIGlzIG5ldyBkYXRhJyk7XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ1NFTEVDVCBFUlJPUicsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9EYXRhKCk7XG4gIH1cbiAgcmVjaWV2ZU1lc3NhZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgdGV4dE1lc3NhZ2UgPSAkZXZlbnQ7XG4gICAgdGhpcy5jaGF0LnRleHQgPSB0ZXh0TWVzc2FnZTtcbiAgICB0aGlzLnNlbmRNZXNzYWdlVG9TZXJ2ZXIoKTtcbiAgfVxuICByZWFkTWVzc2FnZSgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgdXNlcl9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgICAgY29udGFjdF9pZDogdGhpcy5jaGF0Lm51bWJlcixcbiAgICB9O1xuICAgIHRoaXMuY2hhdHNTZXJ2aWNlLnJlYWRNZXNzYWdlcyhkYXRhKVxuICAgICAgLnN1YnNjcmliZSgoc3VjY2VzcykgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnTWVzc2FnZSByZWFkIHJlY2llcHRzLicpO1xuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKCdJc3N1ZSBpbiBNZXNzYWdlIFJlYWRpbmcuJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdvQmFjaygpIHtcbiAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gIH1cbiAgcmVmcmVzaE1lKGFyZ3M6IGFueSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICAgICAgKGFyZ3Mub2JqZWN0IGFzIFB1bGxUb1JlZnJlc2gpLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuICBzZW5kTWVzc2FnZVRvU2VydmVyKCkge1xuICAgIGNvbnN0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gbWVzc2FnZXMgV0hFUkUgc2VudCA9IDAgTElNSVQgMSc7XG4gICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiTmFtZSkpLnRoZW4oKGRiKSA9PiB7XG4gICAgICBkYi5hbGwoc2VsZWN0UXVlcnkpLnRoZW4oKHJvd3MpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdW5pcXVlX2lkOiByb3dzW3Jvd11bMF0sXG4gICAgICAgICAgICB0bzogcm93c1tyb3ddWzhdLFxuICAgICAgICAgICAgZnJvbV9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgICAgICAgICAgdGV4dDogcm93c1tyb3ddWzFdLFxuICAgICAgICAgICAgY3JlYXRlZF90aW1lOiByb3dzW3Jvd11bNl0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmNoYXRzU2VydmljZS5zZW5kTWVzc2FnZShkYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3VjY2Vzcy5yZXN1bHQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTdGF0dXNPZk1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzLnN0YXR1cywgc3VjY2Vzcy51bmlxdWVfaWQpO1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5zZW50X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZVNlbnRUaW1lT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzLm1lc3NhZ2VfdGltaW5ncy5zZW50X3RpbWUsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MubWVzc2FnZV90aW1pbmdzLmRlbGl2ZXJlZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVEZWxpdmVyeVRpbWVPZk1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MubWVzc2FnZV90aW1pbmdzLmRlbGl2ZXJlZF90aW1lLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzLnVuaXF1ZV9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzLm1lc3NhZ2VfaWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLnVwZGF0ZU1lc3NhZUlkT2ZNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzLm1lc3NhZ2VfaWQsIHN1Y2Nlc3MudW5pcXVlX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlU2VydmljZS51cGRhdGVTdGF0dXNPZk1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgZXJyb3Iuc3RhdHVzLCBlcnJvci51bmlxdWVfaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIChkYkVycikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyhkYkVycik7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvRGF0YSgpOiB2b2lkIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoMTAwMCkuZmlyc3QoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZXRNZXNzYWdlcygpKTtcbiAgfVxufVxuIl19