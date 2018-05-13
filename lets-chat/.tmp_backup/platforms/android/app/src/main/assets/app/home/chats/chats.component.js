"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var nativescript_angular_1 = require("nativescript-angular");
var router_2 = require("nativescript-angular/router");
var Observable_1 = require("rxjs/Observable");
var core_2 = require("../../core");
var config_1 = require("../../core/config");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
// tslint:disable-next-line:max-line-length
nativescript_angular_1.registerElement('pullToRefresh', function () { return require('nativescript-pulltorefresh').PullToRefresh; });
var ChatsComponent = (function () {
    function ChatsComponent(chatsService, routerExtensions, route) {
        this.chatsService = chatsService;
        this.routerExtensions = routerExtensions;
        this.route = route;
        this.chats = [];
        this.userNumber = '';
        this.userNumber = application_settings_1.getString('userId');
        this.getChats();
    }
    // fetch data from db
    ChatsComponent.prototype.getChats = function () {
        var _this = this;
        (new Sqlite(config_1.Config.dbName)).then(function (db) {
            db.all('SELECT * FROM contacts').then(function (rows) {
                _this.chats = [];
                // tslint:disable-next-line:forin
                for (var row in rows) {
                    _this.chats.push({
                        number: rows[row][0],
                        contact: {
                            name: rows[row][1],
                            avatar: rows[row][2],
                        },
                        text: rows[row][3],
                        type: rows[row][4],
                        muted: rows[row][5],
                        when: rows[row][6],
                        unread: rows[row][7],
                        last_message_timestamp: rows[row][8],
                    });
                }
                db.close();
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('SELECT ERROR', error);
            });
        }, function (error) {
            console.log('Unable to connect to DB');
        });
        this.subscribeToData();
    };
    ChatsComponent.prototype.goToChat = function (args) {
        var extras = {
            queryParams: {
                unread: this.chats[args.index].unread,
                chatJson: JSON.stringify(this.chats[args.index]),
            },
        };
        // this.ngOnDestroy();
        this.routerExtensions.navigate([
            'chat',
            args.index,
        ], extras);
    };
    ChatsComponent.prototype.refreshMe = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.getChats();
            args.object.refreshing = false;
        }, 2000);
    };
    ChatsComponent.prototype.ngOnDestroy = function () {
        if (this.chatsSubscription) {
            this.chatsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    };
    ChatsComponent.prototype.subscribeToData = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        this.timerSubscription = Observable_1.Observable.timer(5000).first().subscribe(function () { return _this.getChats(); });
    };
    ChatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-chats',
            templateUrl: './chats.component.html',
            styleUrls: ['./chats.component.css'],
        }),
        __metadata("design:paramtypes", [core_2.ChatsService,
            router_2.RouterExtensions,
            router_1.ActivatedRoute])
    ], ChatsComponent);
    return ChatsComponent;
}());
exports.ChatsComponent = ChatsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUFpRDtBQUNqRCw2REFBeUQ7QUFDekQsNkRBQXVEO0FBQ3ZELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsbUNBQTBDO0FBQzFDLDRDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsMkNBQTJDO0FBQzNDLHNDQUFlLENBQUMsZUFBZSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxhQUFhLEVBQW5ELENBQW1ELENBQUMsQ0FBQztBQVE1RjtJQU1FLHdCQUNVLFlBQTBCLEVBQzFCLGdCQUFrQyxFQUNsQyxLQUFxQjtRQUZyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBUi9CLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBU2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQ0QscUJBQXFCO0lBQ3JCLGlDQUFRLEdBQVI7UUFBQSxpQkE2QkM7UUE1QkMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQ2xDLEVBQUUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUN6QyxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsaUNBQWlDO2dCQUNqQyxH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LENBQUM7SUFDM0YsQ0FBQztJQTNFVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQVF3QixtQkFBWTtZQUNSLHlCQUFnQjtZQUMzQix1QkFBYztPQVRwQixjQUFjLENBNEUxQjtJQUFELHFCQUFDO0NBQUEsQUE1RUQsSUE0RUM7QUE1RVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmcsIHJlbW92ZSB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHVsbFRvUmVmcmVzaCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQW5vbnltb3VzU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ2hhdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9jb3JlL2NvbmZpZyc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdmFyLXJlcXVpcmVzXG5jb25zdCBTcWxpdGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtc3FsaXRlJyk7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5yZWdpc3RlckVsZW1lbnQoJ3B1bGxUb1JlZnJlc2gnLCAoKSA9PiByZXF1aXJlKCduYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaCcpLlB1bGxUb1JlZnJlc2gpO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1jaGF0cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGF0cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoYXRzLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhdHNDb21wb25lbnQge1xuICBjaGF0cyA9IFtdO1xuICB1c2VyTnVtYmVyID0gJyc7XG4gIHByaXZhdGUgdGltZXJTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjaGF0c1N1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2hhdHNTZXJ2aWNlOiBDaGF0c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICApIHtcbiAgICB0aGlzLnVzZXJOdW1iZXIgPSBnZXRTdHJpbmcoJ3VzZXJJZCcpO1xuICAgIHRoaXMuZ2V0Q2hhdHMoKTtcbiAgfVxuICAvLyBmZXRjaCBkYXRhIGZyb20gZGJcbiAgZ2V0Q2hhdHMoKSB7XG4gICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiTmFtZSkpLnRoZW4oKGRiKSA9PiB7XG4gICAgICBkYi5hbGwoJ1NFTEVDVCAqIEZST00gY29udGFjdHMnKS50aGVuKChyb3dzKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhdHMgPSBbXTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICB0aGlzLmNoYXRzLnB1c2goe1xuICAgICAgICAgICAgbnVtYmVyOiByb3dzW3Jvd11bMF0sXG4gICAgICAgICAgICBjb250YWN0OiB7XG4gICAgICAgICAgICAgIG5hbWU6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgICAgYXZhdGFyOiByb3dzW3Jvd11bMl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dDogcm93c1tyb3ddWzNdLFxuICAgICAgICAgICAgdHlwZTogcm93c1tyb3ddWzRdLFxuICAgICAgICAgICAgbXV0ZWQ6IHJvd3Nbcm93XVs1XSxcbiAgICAgICAgICAgIHdoZW46IHJvd3Nbcm93XVs2XSxcbiAgICAgICAgICAgIHVucmVhZDogcm93c1tyb3ddWzddLFxuICAgICAgICAgICAgbGFzdF9tZXNzYWdlX3RpbWVzdGFtcDogcm93c1tyb3ddWzhdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ1NFTEVDVCBFUlJPUicsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBjb25uZWN0IHRvIERCJyk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0RhdGEoKTtcbiAgfVxuICBnb1RvQ2hhdChhcmdzKSB7XG4gICAgY29uc3QgZXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgdW5yZWFkOiB0aGlzLmNoYXRzW2FyZ3MuaW5kZXhdLnVucmVhZCxcbiAgICAgICAgY2hhdEpzb246IEpTT04uc3RyaW5naWZ5KHRoaXMuY2hhdHNbYXJncy5pbmRleF0pLFxuICAgICAgfSxcbiAgICB9O1xuICAgIC8vIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1xuICAgICAgJ2NoYXQnLFxuICAgICAgYXJncy5pbmRleCxcbiAgICBdLCBleHRyYXMpO1xuICB9XG4gIHJlZnJlc2hNZShhcmdzOiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0Q2hhdHMoKTtcbiAgICAgIChhcmdzLm9iamVjdCBhcyBQdWxsVG9SZWZyZXNoKS5yZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSwgMjAwMCk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hhdHNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2hhdHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0RhdGEoKTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLnRpbWVyKDUwMDApLmZpcnN0KCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZ2V0Q2hhdHMoKSk7XG4gIH1cbn1cbiJdfQ==