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
var index_1 = require("../core/index");
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
        this.getMessages();
    };
    ChatComponent.prototype.getMessages = function () {
        var _this = this;
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
        this.getMessages();
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
    ChatComponent.prototype.subscribeToData = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        this.timerSubscription = Observable_1.Observable.timer(100).first().subscribe(function () { return _this.getMessages(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsNkRBQWlEO0FBRWpELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsZ0NBQXNEO0FBRXRELDJDQUEyQztBQUMzQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM5Qyx1Q0FBdUM7QUFTdkM7SUFVRSx1QkFDVSxLQUFxQixFQUNyQixZQUEwQixFQUMxQixNQUF3QixFQUN4QixHQUFzQixFQUNILFFBQVE7UUFKM0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDSCxhQUFRLEdBQVIsUUFBUSxDQUFBO1FBWHJDLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFhZCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQUEsaUJB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QUksQ0FBQyxNQUF3QixDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDcEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNPLHVDQUFlLEdBQXZCO1FBQUEsaUJBR0M7UUFGQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDN0YsQ0FBQztJQTdGVSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO1FBZ0JHLFdBQUEsYUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3lDQUpKLHVCQUFjO1lBQ1AsbUJBQVk7WUFDbEIseUJBQWdCO1lBQ25CLHdCQUFpQjtPQWRyQixhQUFhLENBOEZ6QjtJQUFELG9CQUFDO0NBQUEsQUE5RkQsSUE4RkM7QUE5Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCwgSW5qZWN0LCBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQdWxsVG9SZWZyZXNoIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2gnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBbm9ueW1vdXNTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBDaGF0LCBDaGF0c1NlcnZpY2UsIENvbnRhY3QgfSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tZXNzYWdlLm1vZGVsJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12YXItcmVxdWlyZXNcbmNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1jaGF0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NoYXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGF0LmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoYXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjaGF0SW5kZXg6IG51bWJlcjtcbiAgY2hhdDogYW55O1xuICB1bnJlYWQ6IG51bWJlcjtcbiAgbWVzc2FnZXMgPSBbXTtcbiAgdXNlck51bWJlcjogc3RyaW5nO1xuICBsYXN0U2VlblRpbWU6IGFueTtcbiAgcHJpdmF0ZSB0aW1lclN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIE1lc3NhZ2VTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIGNoYXRzU2VydmljZTogQ2hhdHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KCdwbGF0Zm9ybScpIHB1YmxpYyBwbGF0Zm9ybSxcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICB0aGlzLnVucmVhZCA9ICtwYXJhbXMudW5yZWFkO1xuICAgICAgdGhpcy5jaGF0ID0gSlNPTi5wYXJzZShwYXJhbXMuY2hhdEpzb24pO1xuICAgICAgdGhpcy5sYXN0U2VlblRpbWUgPSB0aGlzLmNoYXQud2hlbjtcbiAgICB9KTtcbiAgICB0aGlzLnVzZXJOdW1iZXIgPSBnZXRTdHJpbmcoJ3VzZXJJZCcpO1xuICAgIHRoaXMuZ2V0TWVzc2FnZXMoKTtcbiAgfVxuXG4gIGdldE1lc3NhZ2VzKCkge1xuICAgIGNvbnN0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gbWVzc2FnZXMgV0hFUkUgY29udGFjdCA9ID8nO1xuICAgIChuZXcgU3FsaXRlKENvbmZpZy5kYk5hbWUpKS50aGVuKChkYikgPT4ge1xuICAgICAgZGIuYWxsKHNlbGVjdFF1ZXJ5LCBbdGhpcy5jaGF0Lm51bWJlcl0pLnRoZW4oKHJvd3MpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gcm93cykge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VKc29uID0ge1xuICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICBzZW5kZXI6ICcnLFxuICAgICAgICAgICAgc2VudDogJycsXG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG1lc3NhZ2VKc29uLnRleHQgPSByb3dzW3Jvd11bMV07XG4gICAgICAgICAgaWYgKHJvd3Nbcm93XVsyXSA9PT0gMSkge1xuICAgICAgICAgICAgbWVzc2FnZUpzb24uc2VuZGVyID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZUpzb24uc2VuZGVyID0gdGhpcy5jaGF0LmNvbnRhY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lc3NhZ2VKc29uLmNyZWF0ZWQgPSByb3dzW3Jvd11bNl07XG4gICAgICAgICAgbWVzc2FnZUpzb24uc2VudCA9IHJvd3Nbcm93XVs3XTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZUpzb24pO1xuICAgICAgICB9XG4gICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgIC8vIGFsZXJ0KCdUaGlzIGlzIG5ldyBkYXRhJyk7XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ1NFTEVDVCBFUlJPUicsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9EYXRhKCk7XG4gIH1cbiAgcmVjaWV2ZU1lc3NhZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgdGV4dE1lc3NhZ2UgPSAkZXZlbnQ7XG4gICAgdGhpcy5jaGF0LnRleHQgPSB0ZXh0TWVzc2FnZTtcbiAgICB0aGlzLmdldE1lc3NhZ2VzKCk7XG4gIH1cbiAgcmVhZE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHVzZXJfaWQ6IHRoaXMudXNlck51bWJlcixcbiAgICAgIGNvbnRhY3RfaWQ6IHRoaXMuY2hhdC5udW1iZXIsXG4gICAgfTtcbiAgICB0aGlzLmNoYXRzU2VydmljZS5yZWFkTWVzc2FnZXMoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ01lc3NhZ2UgcmVhZCByZWNpZXB0cy4nKTtcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnSXNzdWUgaW4gTWVzc2FnZSBSZWFkaW5nLicpO1xuICAgICAgfSk7XG4gIH1cblxuICBnb0JhY2soKSB7XG4gICAgdGhpcy5yb3V0ZXIuYmFjaygpO1xuICB9XG4gIHJlZnJlc2hNZShhcmdzOiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoKTtcbiAgICAgIChhcmdzLm9iamVjdCBhcyBQdWxsVG9SZWZyZXNoKS5yZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSwgMTAwMCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RhdGEoKTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLnRpbWVyKDEwMCkuZmlyc3QoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZXRNZXNzYWdlcygpKTtcbiAgfVxufVxuIl19