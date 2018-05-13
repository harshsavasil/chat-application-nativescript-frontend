"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var router_2 = require("nativescript-angular/router");
var Observable_1 = require("rxjs/Observable");
var core_2 = require("../core");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
// tslint:disable-next-line:max-line-length
// registerElement('pullToRefresh', () => require('nativescript-pulltorefresh').PullToRefresh);
var ChatComponent = (function () {
    function ChatComponent(route, chatsService, router, ref, platform) {
        this.route = route;
        this.chatsService = chatsService;
        this.router = router;
        this.ref = ref;
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
        (new Sqlite('chat.db')).then(function (db) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:max-line-length
            var sqlQuery = "CREATE TABLE IF NOT EXISTS messages (text TEXT, sender INTEGER, created FLOAT, sent INTEGER, contact TEXT, PRIMARY KEY (text, sender, contact, created))";
            // const sqlQuery = `TRUNCATE TABLE messages IF EXISTS`;
            db.execSQL(sqlQuery).then(function (id) {
                _this.database = db;
                _this.getChatMessagesFromService();
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('CREATE TABLE ERROR', error);
            });
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('OPEN DB ERROR', error);
        });
        // this.getMessages();
        // this.readMessage();
    };
    ChatComponent.prototype.getMessages = function () {
        var _this = this;
        var selectQuery = 'SELECT * FROM messages WHERE contact = ?';
        this.database.all(selectQuery, [this.chat.number]).then(function (rows) {
            _this.messages = [];
            // tslint:disable-next-line:forin
            for (var row in rows) {
                var messageJson = {
                    text: '',
                    sender: '',
                    sent: '',
                    created: '',
                };
                messageJson.text = rows[row][0];
                if (rows[row][1] === 1) {
                    messageJson.sender = null;
                }
                else {
                    messageJson.sender = _this.chat.contact;
                }
                messageJson.created = rows[row][2];
                messageJson.sent = rows[row][3];
                _this.messages.push(messageJson);
            }
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('SELECT ERROR', error);
        });
    };
    ChatComponent.prototype.getChatMessagesFromService = function () {
        var _this = this;
        this.chatsService.getChatMessages(this.userNumber, this.chat.number)
            .subscribe(function (messagesJson) {
            var messagesResponse = messagesJson.messages;
            var insertQuery = "\n          INSERT INTO messages\n          ( text, sender, created, sent, contact)\n          VALUES (?, ?, ?, ?, ?)";
            var updateQuery = "\n          UPDATE messages\n          SET text = ?, sender = ?, created = ?, sent = ?, contact = ?\n          WHERE text = ?, sender = ?, created = ?, contact = ?\n        ";
            messagesResponse.forEach(function (message) {
                var insertJSON = [];
                insertJSON.push(message.text);
                insertJSON.push(message.sender);
                insertJSON.push(message.created);
                insertJSON.push(message.sent);
                insertJSON.push(_this.chat.number);
                _this.database.execSQL(insertQuery, insertJSON).then(function (id) {
                    // tslint:disable-next-line:no-console
                    console.log('INSERT RESULT', id);
                }, function (error) {
                    // tslint:disable-next-line:no-console
                    console.log('INSERT ERROR', error);
                    var updateJSON = insertJSON;
                    updateJSON.push(message.text);
                    updateJSON.push(message.sender);
                    updateJSON.push(message.created);
                    updateJSON.push(_this.chat.number);
                    _this.database.execSQL(updateQuery, updateJSON).then(function (id) {
                        // tslint:disable-next-line:no-console
                        console.log('UPDATE RESULT', id);
                    }, function (err) {
                        // tslint:disable-next-line:no-console
                        console.log('UPDATE ERROR', err);
                    });
                });
            });
            _this.subscribeToData();
            _this.getMessages();
        }, function (error) {
            alert(error.message);
        });
    };
    ChatComponent.prototype.recieveMessage = function ($event) {
        var textMessage = $event;
        this.chat.text = textMessage;
        this.messages.push({
            text: textMessage,
            chat: this.chat,
            sender: null,
            created: Date.now(),
            sent: 2,
        });
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
        }, 2000);
    };
    ChatComponent.prototype.subscribeToData = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        this.timerSubscription = Observable_1.Observable.timer(500).first().subscribe(function () { return _this.getChatMessagesFromService(); });
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __param(4, core_1.Inject('platform')),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_2.ChatsService,
            router_2.RouterExtensions,
            core_1.ChangeDetectorRef, Object])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsNkRBQWlEO0FBRWpELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsZ0NBQXNEO0FBRXRELDJDQUEyQztBQUMzQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM5QywyQ0FBMkM7QUFDM0MsK0ZBQStGO0FBUy9GO0lBVUUsdUJBQ1UsS0FBcUIsRUFDckIsWUFBMEIsRUFDMUIsTUFBd0IsRUFDeEIsR0FBc0IsRUFDSCxRQUFRO1FBSjNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ0gsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQVhyQyxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBYWQsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkEwQkM7UUF6QkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUks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LENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGlDQUFTLEdBQVQsVUFBVSxJQUFTO1FBQW5CLGlCQUtDO1FBSkMsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUF3QixDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDcEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNPLHVDQUFlLEdBQXZCO1FBQUEsaUJBR0M7UUFGQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLDBCQUEwQixFQUFFLEVBQWpDLENBQWlDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBL0pVLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7UUFnQkcsV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7eUNBSkosdUJBQWM7WUFDUCxtQkFBWTtZQUNsQix5QkFBZ0I7WUFDbkIsd0JBQWlCO09BZHJCLGFBQWEsQ0FnS3pCO0lBQUQsb0JBQUM7Q0FBQSxBQWhLRCxJQWdLQztBQWhLWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFB1bGxUb1JlZnJlc2ggfSBmcm9tICduYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFub255bW91c1N1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENoYXQsIENoYXRzU2VydmljZSwgQ29udGFjdCB9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL21lc3NhZ2UubW9kZWwnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuLy8gcmVnaXN0ZXJFbGVtZW50KCdwdWxsVG9SZWZyZXNoJywgKCkgPT4gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2gnKS5QdWxsVG9SZWZyZXNoKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtY2hhdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGF0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2hhdC5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDaGF0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY2hhdEluZGV4OiBudW1iZXI7XG4gIGNoYXQ6IGFueTtcbiAgdW5yZWFkOiBudW1iZXI7XG4gIG1lc3NhZ2VzID0gW107XG4gIHVzZXJOdW1iZXI6IHN0cmluZztcbiAgbGFzdFNlZW5UaW1lOiBhbnk7XG4gIHByaXZhdGUgdGltZXJTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBNZXNzYWdlU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgdGhpcy51bnJlYWQgPSArcGFyYW1zLnVucmVhZDtcbiAgICAgIHRoaXMuY2hhdCA9IEpTT04ucGFyc2UocGFyYW1zLmNoYXRKc29uKTtcbiAgICAgIHRoaXMubGFzdFNlZW5UaW1lID0gdGhpcy5jaGF0LndoZW47XG4gICAgfSk7XG4gICAgdGhpcy51c2VyTnVtYmVyID0gZ2V0U3RyaW5nKCd1c2VySWQnKTtcbiAgICAobmV3IFNxbGl0ZSgnY2hhdC5kYicpKS50aGVuKChkYikgPT4ge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICBjb25zdCBzcWxRdWVyeSA9IGBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBtZXNzYWdlcyAodGV4dCBURVhULCBzZW5kZXIgSU5URUdFUiwgY3JlYXRlZCBGTE9BVCwgc2VudCBJTlRFR0VSLCBjb250YWN0IFRFWFQsIFBSSU1BUlkgS0VZICh0ZXh0LCBzZW5kZXIsIGNvbnRhY3QsIGNyZWF0ZWQpKWA7XG4gICAgICAvLyBjb25zdCBzcWxRdWVyeSA9IGBUUlVOQ0FURSBUQUJMRSBtZXNzYWdlcyBJRiBFWElTVFNgO1xuICAgICAgZGIuZXhlY1NRTChzcWxRdWVyeSkudGhlbigoaWQpID0+IHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICB0aGlzLmdldENoYXRNZXNzYWdlc0Zyb21TZXJ2aWNlKCk7XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ0NSRUFURSBUQUJMRSBFUlJPUicsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdPUEVOIERCIEVSUk9SJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIHRoaXMuZ2V0TWVzc2FnZXMoKTtcbiAgICAvLyB0aGlzLnJlYWRNZXNzYWdlKCk7XG4gIH1cblxuICBnZXRNZXNzYWdlcygpIHtcbiAgICBjb25zdCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFIGNvbnRhY3QgPSA/JztcbiAgICB0aGlzLmRhdGFiYXNlLmFsbChzZWxlY3RRdWVyeSwgW3RoaXMuY2hhdC5udW1iZXJdKS50aGVuKChyb3dzKSA9PiB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3Qgcm93IGluIHJvd3MpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUpzb24gPSB7XG4gICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgc2VuZGVyOiAnJyxcbiAgICAgICAgICBzZW50OiAnJyxcbiAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgfTtcbiAgICAgICAgbWVzc2FnZUpzb24udGV4dCA9IHJvd3Nbcm93XVswXTtcbiAgICAgICAgaWYgKHJvd3Nbcm93XVsxXSA9PT0gMSkge1xuICAgICAgICAgIG1lc3NhZ2VKc29uLnNlbmRlciA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVzc2FnZUpzb24uc2VuZGVyID0gdGhpcy5jaGF0LmNvbnRhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZUpzb24uY3JlYXRlZCA9IHJvd3Nbcm93XVsyXTtcbiAgICAgICAgbWVzc2FnZUpzb24uc2VudCA9IHJvd3Nbcm93XVszXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2VKc29uKTtcbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnU0VMRUNUIEVSUk9SJywgZXJyb3IpO1xuICAgIH0pO1xuICB9XG4gIGdldENoYXRNZXNzYWdlc0Zyb21TZXJ2aWNlKCkge1xuICAgIHRoaXMuY2hhdHNTZXJ2aWNlLmdldENoYXRNZXNzYWdlcyhcbiAgICAgIHRoaXMudXNlck51bWJlciwgdGhpcy5jaGF0Lm51bWJlcilcbiAgICAgIC5zdWJzY3JpYmUoKG1lc3NhZ2VzSnNvbikgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlc1Jlc3BvbnNlID0gbWVzc2FnZXNKc29uLm1lc3NhZ2VzO1xuICAgICAgICBjb25zdCBpbnNlcnRRdWVyeSA9IGBcbiAgICAgICAgICBJTlNFUlQgSU5UTyBtZXNzYWdlc1xuICAgICAgICAgICggdGV4dCwgc2VuZGVyLCBjcmVhdGVkLCBzZW50LCBjb250YWN0KVxuICAgICAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPylgO1xuICAgICAgICBjb25zdCB1cGRhdGVRdWVyeSA9IGBcbiAgICAgICAgICBVUERBVEUgbWVzc2FnZXNcbiAgICAgICAgICBTRVQgdGV4dCA9ID8sIHNlbmRlciA9ID8sIGNyZWF0ZWQgPSA/LCBzZW50ID0gPywgY29udGFjdCA9ID9cbiAgICAgICAgICBXSEVSRSB0ZXh0ID0gPywgc2VuZGVyID0gPywgY3JlYXRlZCA9ID8sIGNvbnRhY3QgPSA/XG4gICAgICAgIGA7XG4gICAgICAgIG1lc3NhZ2VzUmVzcG9uc2UuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluc2VydEpTT04gPSBbXTtcbiAgICAgICAgICBpbnNlcnRKU09OLnB1c2gobWVzc2FnZS50ZXh0KTtcbiAgICAgICAgICBpbnNlcnRKU09OLnB1c2gobWVzc2FnZS5zZW5kZXIpO1xuICAgICAgICAgIGluc2VydEpTT04ucHVzaChtZXNzYWdlLmNyZWF0ZWQpO1xuICAgICAgICAgIGluc2VydEpTT04ucHVzaChtZXNzYWdlLnNlbnQpO1xuICAgICAgICAgIGluc2VydEpTT04ucHVzaCh0aGlzLmNoYXQubnVtYmVyKTtcbiAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoaW5zZXJ0UXVlcnksIGluc2VydEpTT04pLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lOU0VSVCBSRVNVTFQnLCBpZCk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lOU0VSVCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUpTT04gPSBpbnNlcnRKU09OO1xuICAgICAgICAgICAgdXBkYXRlSlNPTi5wdXNoKG1lc3NhZ2UudGV4dCk7XG4gICAgICAgICAgICB1cGRhdGVKU09OLnB1c2gobWVzc2FnZS5zZW5kZXIpO1xuICAgICAgICAgICAgdXBkYXRlSlNPTi5wdXNoKG1lc3NhZ2UuY3JlYXRlZCk7XG4gICAgICAgICAgICB1cGRhdGVKU09OLnB1c2godGhpcy5jaGF0Lm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwodXBkYXRlUXVlcnksIHVwZGF0ZUpTT04pLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVUERBVEUgUkVTVUxUJywgaWQpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIEVSUk9SJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0RhdGEoKTtcbiAgICAgICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgcmVjaWV2ZU1lc3NhZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgdGV4dE1lc3NhZ2UgPSAkZXZlbnQ7XG4gICAgdGhpcy5jaGF0LnRleHQgPSB0ZXh0TWVzc2FnZTtcbiAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgdGV4dDogdGV4dE1lc3NhZ2UsXG4gICAgICBjaGF0OiB0aGlzLmNoYXQsXG4gICAgICBzZW5kZXI6IG51bGwsXG4gICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLFxuICAgICAgc2VudDogMixcbiAgICB9KTtcbiAgfVxuICByZWFkTWVzc2FnZSgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgdXNlcl9pZDogdGhpcy51c2VyTnVtYmVyLFxuICAgICAgY29udGFjdF9pZDogdGhpcy5jaGF0Lm51bWJlcixcbiAgICB9O1xuICAgIHRoaXMuY2hhdHNTZXJ2aWNlLnJlYWRNZXNzYWdlcyhkYXRhKVxuICAgICAgLnN1YnNjcmliZSgoc3VjY2VzcykgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnTWVzc2FnZSByZWFkIHJlY2llcHRzLicpO1xuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKCdJc3N1ZSBpbiBNZXNzYWdlIFJlYWRpbmcuJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdvQmFjaygpIHtcbiAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gIH1cbiAgcmVmcmVzaE1lKGFyZ3M6IGFueSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICAgICAgKGFyZ3Mub2JqZWN0IGFzIFB1bGxUb1JlZnJlc2gpLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICB9LCAyMDAwKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvRGF0YSgpOiB2b2lkIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgdGhpcy50aW1lclN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUudGltZXIoNTAwKS5maXJzdCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmdldENoYXRNZXNzYWdlc0Zyb21TZXJ2aWNlKCkpO1xuICB9XG59XG4iXX0=