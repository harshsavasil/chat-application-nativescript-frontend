"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var nativescript_angular_1 = require("nativescript-angular");
var router_2 = require("nativescript-angular/router");
var Observable_1 = require("rxjs/Observable");
var core_2 = require("../../core");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
// tslint:disable-next-line:max-line-length
nativescript_angular_1.registerElement('pullToRefresh', function () { return require('nativescript-pulltorefresh').PullToRefresh; });
var ChatsComponent = (function () {
    function ChatsComponent(chatsService, routerExtensions, route) {
        var _this = this;
        this.chatsService = chatsService;
        this.routerExtensions = routerExtensions;
        this.route = route;
        this.chats = [];
        this.userNumber = '';
        this.userNumber = application_settings_1.getString('userId');
        (new Sqlite('chat.db')).then(function (db) {
            // tslint:disable-next-line:max-line-length
            var sqlQuery = 'CREATE TABLE IF NOT EXISTS contacts ( number TEXT PRIMARY KEY, name TEXT, avatar TEXT, text TEXT,type TEXT, muted INTEGER, lastSeen FLOAT, unread INTEGER, last_message_timestamp FLOAT )';
            db.execSQL(sqlQuery).then(function (id) {
                _this.database = db;
                _this.getChatsFromService();
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('CREATE TABLE ERROR', error);
            });
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('OPEN DB ERROR', error);
        });
    }
    // fetch data from db
    ChatsComponent.prototype.getChats = function () {
        var _this = this;
        this.database.all('SELECT * FROM contacts').then(function (rows) {
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
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('SELECT ERROR', error);
        });
    };
    ChatsComponent.prototype.getChatsFromService = function () {
        var _this = this;
        this.chatsSubscription = this.chatsService.getAllChats(this.userNumber)
            .subscribe(function (chats) {
            // tslint:disable-next-line:max-line-length
            var insertQuery = "\n          INSERT INTO contacts\n          ( number, name, avatar, text, type, muted,\n            lastSeen, unread, last_message_timestamp )\n          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            var updateQuery = "\n          UPDATE contacts\n          SET number = ?, name = ?,\n          avatar =?, text = ?, type = ?, muted = ?, lastSeen = ?, unread = ?,\n          last_message_timestamp = ?\n          WHERE number = ?\n        ";
            chats.forEach(function (chat) {
                var insertJSON = [];
                insertJSON.push(chat.number);
                insertJSON.push(chat.contact.name);
                insertJSON.push(chat.contact.avatar);
                insertJSON.push(chat.text);
                insertJSON.push(chat.type);
                insertJSON.push(chat.muted);
                insertJSON.push(chat.when);
                insertJSON.push(chat.unread);
                insertJSON.push(chat.last_message_timestamp);
                _this.database.execSQL(insertQuery, insertJSON).then(function (id) {
                    // tslint:disable-next-line:no-console
                    console.log('INSERT RESULT', id);
                }, function (error) {
                    // tslint:disable-next-line:no-console
                    console.log('INSERT ERROR', error);
                    var updateJSON = insertJSON;
                    updateJSON.push(chat.number);
                    _this.database.execSQL(updateQuery, updateJSON).then(function (id) {
                        // tslint:disable-next-line:no-console
                        console.log('UPDATE RESULT Chats', id);
                    }, function (err) {
                        // tslint:disable-next-line:no-console
                        console.log('UPDATE ERROR', err);
                    });
                });
            });
            _this.subscribeToData();
            _this.getChats();
        });
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
        this.timerSubscription = Observable_1.Observable.timer(60000).first().subscribe(function () { return _this.getChatsFromService(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUFpRDtBQUNqRCw2REFBeUQ7QUFDekQsNkRBQXVEO0FBQ3ZELHNEQUErRDtBQUUvRCw4Q0FBNkM7QUFFN0MsbUNBQTBDO0FBQzFDLDJDQUEyQztBQUMzQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM5QywyQ0FBMkM7QUFDM0Msc0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUTVGO0lBTUUsd0JBQ1UsWUFBMEIsRUFDMUIsZ0JBQWtDLEVBQ2xDLEtBQXFCO1FBSC9CLGlCQW9CQztRQW5CUyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBUi9CLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBU2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQzlCLDJDQUEyQztZQUMzQyxJQUFNLFFBQVEsR0FBRywyTEFBMkwsQ0FBQztZQUM3TSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM3QixDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNQLHNDQUFz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QVU7WUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQVF3QixtQkFBWTtZQUNSLHlCQUFnQjtZQUMzQix1QkFBYztPQVRwQixjQUFjLENBbUkxQjtJQUFELHFCQUFDO0NBQUEsQUFuSUQsSUFtSUM7QUFuSVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmcsIHJlbW92ZSB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHVsbFRvUmVmcmVzaCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQW5vbnltb3VzU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ2hhdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZSc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdmFyLXJlcXVpcmVzXG5jb25zdCBTcWxpdGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtc3FsaXRlJyk7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5yZWdpc3RlckVsZW1lbnQoJ3B1bGxUb1JlZnJlc2gnLCAoKSA9PiByZXF1aXJlKCduYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaCcpLlB1bGxUb1JlZnJlc2gpO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1jaGF0cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGF0cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoYXRzLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhdHNDb21wb25lbnQge1xuICBjaGF0cyA9IFtdO1xuICB1c2VyTnVtYmVyID0gJyc7XG4gIHByaXZhdGUgdGltZXJTdWJzY3JpcHRpb246IEFub255bW91c1N1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjaGF0c1N1YnNjcmlwdGlvbjogQW5vbnltb3VzU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2hhdHNTZXJ2aWNlOiBDaGF0c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICApIHtcbiAgICB0aGlzLnVzZXJOdW1iZXIgPSBnZXRTdHJpbmcoJ3VzZXJJZCcpO1xuICAgIChuZXcgU3FsaXRlKCdjaGF0LmRiJykpLnRoZW4oKGRiKSA9PiB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICBjb25zdCBzcWxRdWVyeSA9ICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBjb250YWN0cyAoIG51bWJlciBURVhUIFBSSU1BUlkgS0VZLCBuYW1lIFRFWFQsIGF2YXRhciBURVhULCB0ZXh0IFRFWFQsdHlwZSBURVhULCBtdXRlZCBJTlRFR0VSLCBsYXN0U2VlbiBGTE9BVCwgdW5yZWFkIElOVEVHRVIsIGxhc3RfbWVzc2FnZV90aW1lc3RhbXAgRkxPQVQgKSc7XG4gICAgICBkYi5leGVjU1FMKHNxbFF1ZXJ5KS50aGVuKChpZCkgPT4ge1xuICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgIHRoaXMuZ2V0Q2hhdHNGcm9tU2VydmljZSgpO1xuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKCdDUkVBVEUgVEFCTEUgRVJST1InLCBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnT1BFTiBEQiBFUlJPUicsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuICAvLyBmZXRjaCBkYXRhIGZyb20gZGJcbiAgZ2V0Q2hhdHMoKSB7XG4gICAgdGhpcy5kYXRhYmFzZS5hbGwoJ1NFTEVDVCAqIEZST00gY29udGFjdHMnKS50aGVuKChyb3dzKSA9PiB7XG4gICAgICB0aGlzLmNoYXRzID0gW107XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3Qgcm93IGluIHJvd3MpIHtcbiAgICAgICAgdGhpcy5jaGF0cy5wdXNoKHtcbiAgICAgICAgICBudW1iZXI6IHJvd3Nbcm93XVswXSxcbiAgICAgICAgICBjb250YWN0OiB7XG4gICAgICAgICAgICBuYW1lOiByb3dzW3Jvd11bMV0sXG4gICAgICAgICAgICBhdmF0YXI6IHJvd3Nbcm93XVsyXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRleHQ6IHJvd3Nbcm93XVszXSxcbiAgICAgICAgICB0eXBlOiByb3dzW3Jvd11bNF0sXG4gICAgICAgICAgbXV0ZWQ6IHJvd3Nbcm93XVs1XSxcbiAgICAgICAgICB3aGVuOiByb3dzW3Jvd11bNl0sXG4gICAgICAgICAgdW5yZWFkOiByb3dzW3Jvd11bN10sXG4gICAgICAgICAgbGFzdF9tZXNzYWdlX3RpbWVzdGFtcDogcm93c1tyb3ddWzhdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnU0VMRUNUIEVSUk9SJywgZXJyb3IpO1xuICAgIH0pO1xuICB9XG4gIGdldENoYXRzRnJvbVNlcnZpY2UoKSB7XG4gICAgdGhpcy5jaGF0c1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hhdHNTZXJ2aWNlLmdldEFsbENoYXRzKHRoaXMudXNlck51bWJlcilcbiAgICAgIC5zdWJzY3JpYmUoKGNoYXRzKSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgY29uc3QgaW5zZXJ0UXVlcnkgPSBgXG4gICAgICAgICAgSU5TRVJUIElOVE8gY29udGFjdHNcbiAgICAgICAgICAoIG51bWJlciwgbmFtZSwgYXZhdGFyLCB0ZXh0LCB0eXBlLCBtdXRlZCxcbiAgICAgICAgICAgIGxhc3RTZWVuLCB1bnJlYWQsIGxhc3RfbWVzc2FnZV90aW1lc3RhbXAgKVxuICAgICAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPywgPywgPylgO1xuICAgICAgICBjb25zdCB1cGRhdGVRdWVyeSA9IGBcbiAgICAgICAgICBVUERBVEUgY29udGFjdHNcbiAgICAgICAgICBTRVQgbnVtYmVyID0gPywgbmFtZSA9ID8sXG4gICAgICAgICAgYXZhdGFyID0/LCB0ZXh0ID0gPywgdHlwZSA9ID8sIG11dGVkID0gPywgbGFzdFNlZW4gPSA/LCB1bnJlYWQgPSA/LFxuICAgICAgICAgIGxhc3RfbWVzc2FnZV90aW1lc3RhbXAgPSA/XG4gICAgICAgICAgV0hFUkUgbnVtYmVyID0gP1xuICAgICAgICBgO1xuICAgICAgICBjaGF0cy5mb3JFYWNoKChjaGF0KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5zZXJ0SlNPTiA9IFtdO1xuICAgICAgICAgIGluc2VydEpTT04ucHVzaChjaGF0Lm51bWJlcik7XG4gICAgICAgICAgaW5zZXJ0SlNPTi5wdXNoKGNoYXQuY29udGFjdC5uYW1lKTtcbiAgICAgICAgICBpbnNlcnRKU09OLnB1c2goY2hhdC5jb250YWN0LmF2YXRhcik7XG4gICAgICAgICAgaW5zZXJ0SlNPTi5wdXNoKGNoYXQudGV4dCk7XG4gICAgICAgICAgaW5zZXJ0SlNPTi5wdXNoKGNoYXQudHlwZSk7XG4gICAgICAgICAgaW5zZXJ0SlNPTi5wdXNoKGNoYXQubXV0ZWQpO1xuICAgICAgICAgIGluc2VydEpTT04ucHVzaChjaGF0LndoZW4pO1xuICAgICAgICAgIGluc2VydEpTT04ucHVzaChjaGF0LnVucmVhZCk7XG4gICAgICAgICAgaW5zZXJ0SlNPTi5wdXNoKGNoYXQubGFzdF9tZXNzYWdlX3RpbWVzdGFtcCk7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKGluc2VydFF1ZXJ5LCBpbnNlcnRKU09OKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJTlNFUlQgUkVTVUxUJywgaWQpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJTlNFUlQgRVJST1InLCBlcnJvcik7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVKU09OID0gaW5zZXJ0SlNPTjtcbiAgICAgICAgICAgIHVwZGF0ZUpTT04ucHVzaChjaGF0Lm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwodXBkYXRlUXVlcnksIHVwZGF0ZUpTT04pLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVUERBVEUgUkVTVUxUIENoYXRzJywgaWQpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIEVSUk9SJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0RhdGEoKTtcbiAgICAgICAgdGhpcy5nZXRDaGF0cygpO1xuICAgICAgfSk7XG4gIH1cbiAgZ29Ub0NoYXQoYXJncykge1xuICAgIGNvbnN0IGV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIHVucmVhZDogdGhpcy5jaGF0c1thcmdzLmluZGV4XS51bnJlYWQsXG4gICAgICAgIGNoYXRKc29uOiBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXRzW2FyZ3MuaW5kZXhdKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICAvLyB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcbiAgICAgICdjaGF0JyxcbiAgICAgIGFyZ3MuaW5kZXgsXG4gICAgXSwgZXh0cmFzKTtcbiAgfVxuICByZWZyZXNoTWUoYXJnczogYW55KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldENoYXRzKCk7XG4gICAgICAoYXJncy5vYmplY3QgYXMgUHVsbFRvUmVmcmVzaCkucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH0sIDIwMDApO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoYXRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNoYXRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbWVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9EYXRhKCk6IHZvaWQge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcig2MDAwMCkuZmlyc3QoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5nZXRDaGF0c0Zyb21TZXJ2aWNlKCkpO1xuICB9XG59XG4iXX0=