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
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('SELECT ERROR', error);
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsNkRBQWlEO0FBRWpELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsZ0NBQXNEO0FBRXRELDJDQUEyQztBQUMzQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM5Qyx1Q0FBdUM7QUFTdkM7SUFVRSx1QkFDVSxLQUFxQixFQUNyQixZQUEwQixFQUMxQixNQUF3QixFQUN4QixHQUFzQixFQUNILFFBQVE7UUFKM0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDSCxhQUFRLEdBQVIsUUFBUSxDQUFBO1FBWHJDLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFhZCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQUEsaUJB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QUFDO0lBQ08sdUNBQWUsR0FBdkI7UUFBQSxpQkFHQztRQUZDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsdUJBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBMUZVLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7UUFnQkcsV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7eUNBSkosdUJBQWM7WUFDUCxtQkFBWTtZQUNsQix5QkFBZ0I7WUFDbkIsd0JBQWlCO09BZHJCLGFBQWEsQ0EyRnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTNGRCxJQTJGQztBQTNGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmcgfSBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFB1bGxUb1JlZnJlc2ggfSBmcm9tICduYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFub255bW91c1N1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENoYXQsIENoYXRzU2VydmljZSwgQ29udGFjdCB9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL21lc3NhZ2UubW9kZWwnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLWNoYXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hhdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoYXQuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNoYXRJbmRleDogbnVtYmVyO1xuICBjaGF0OiBhbnk7XG4gIHVucmVhZDogbnVtYmVyO1xuICBtZXNzYWdlcyA9IFtdO1xuICB1c2VyTnVtYmVyOiBzdHJpbmc7XG4gIGxhc3RTZWVuVGltZTogYW55O1xuICBwcml2YXRlIHRpbWVyU3Vic2NyaXB0aW9uOiBBbm9ueW1vdXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgTWVzc2FnZVN1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgY2hhdHNTZXJ2aWNlOiBDaGF0c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoJ3BsYXRmb3JtJykgcHVibGljIHBsYXRmb3JtLFxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgIHRoaXMudW5yZWFkID0gK3BhcmFtcy51bnJlYWQ7XG4gICAgICB0aGlzLmNoYXQgPSBKU09OLnBhcnNlKHBhcmFtcy5jaGF0SnNvbik7XG4gICAgICB0aGlzLmxhc3RTZWVuVGltZSA9IHRoaXMuY2hhdC53aGVuO1xuICAgIH0pO1xuICAgIHRoaXMudXNlck51bWJlciA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICB9XG5cbiAgZ2V0TWVzc2FnZXMoKSB7XG4gICAgY29uc3Qgc2VsZWN0UXVlcnkgPSAnU0VMRUNUICogRlJPTSBtZXNzYWdlcyBXSEVSRSBjb250YWN0ID0gPyc7XG4gICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiTmFtZSkpLnRoZW4oKGRiKSA9PiB7XG4gICAgICBkYi5hbGwoc2VsZWN0UXVlcnksIFt0aGlzLmNoYXQubnVtYmVyXSkudGhlbigocm93cykgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZUpzb24gPSB7XG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHNlbmRlcjogJycsXG4gICAgICAgICAgICBzZW50OiAnJyxcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbWVzc2FnZUpzb24udGV4dCA9IHJvd3Nbcm93XVsxXTtcbiAgICAgICAgICBpZiAocm93c1tyb3ddWzJdID09PSAxKSB7XG4gICAgICAgICAgICBtZXNzYWdlSnNvbi5zZW5kZXIgPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlSnNvbi5zZW5kZXIgPSB0aGlzLmNoYXQuY29udGFjdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVzc2FnZUpzb24uY3JlYXRlZCA9IHJvd3Nbcm93XVs2XTtcbiAgICAgICAgICBtZXNzYWdlSnNvbi5zZW50ID0gcm93c1tyb3ddWzddO1xuICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlSnNvbik7XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnU0VMRUNUIEVSUk9SJywgZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmVjaWV2ZU1lc3NhZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgdGV4dE1lc3NhZ2UgPSAkZXZlbnQ7XG4gICAgdGhpcy5jaGF0LnRleHQgPSB0ZXh0TWVzc2FnZTtcbiAgICB0aGlzLmdldE1lc3NhZ2VzKCk7XG4gIH1cbiAgcmVhZE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHVzZXJfaWQ6IHRoaXMudXNlck51bWJlcixcbiAgICAgIGNvbnRhY3RfaWQ6IHRoaXMuY2hhdC5udW1iZXIsXG4gICAgfTtcbiAgICB0aGlzLmNoYXRzU2VydmljZS5yZWFkTWVzc2FnZXMoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ01lc3NhZ2UgcmVhZCByZWNpZXB0cy4nKTtcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnSXNzdWUgaW4gTWVzc2FnZSBSZWFkaW5nLicpO1xuICAgICAgfSk7XG4gIH1cblxuICBnb0JhY2soKSB7XG4gICAgdGhpcy5yb3V0ZXIuYmFjaygpO1xuICB9XG4gIHJlZnJlc2hNZShhcmdzOiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoKTtcbiAgICAgIChhcmdzLm9iamVjdCBhcyBQdWxsVG9SZWZyZXNoKS5yZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSwgMTAwMCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RhdGEoKTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLnRpbWVyKDEwMCkuZmlyc3QoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZXRNZXNzYWdlcygpKTtcbiAgfVxufVxuIl19