"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        var userId = application_settings_1.getString('userId');
        if (userId) {
            this.router.navigate(['/home']);
        }
        (new Sqlite('chat.db')).then(function (db) {
            _this.database = db;
            // tslint:disable-next-line:max-line-length
            var contactsTableCreationQuery = 'CREATE TABLE IF NOT EXISTS contacts (number TEXT PRIMARY KEY, name TEXT, avatar TEXT, text TEXT,type TEXT, muted INTEGER, lastSeen FLOAT, unread INTEGER, last_message_timestamp FLOAT )';
            db.execSQL(contactsTableCreationQuery).then(function (id) {
                // tslint:disable-next-line:no-console
                console.log('Contacts TABLE CREATED SUCCESSFULLY');
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('CREATE TABLE ERROR', error);
            });
        }, function (error) {
            // tslint:disable-next-line:no-console
            console.log('OPEN DB ERROR', error);
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ns-app',
            templateUrl: 'app.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQUFpRDtBQUNqRCwyQ0FBMkM7QUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFNOUM7SUFFRSxzQkFDVSxNQUFjO1FBRHhCLGlCQXVCQztRQXRCUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQU0sTUFBTSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsMkNBQTJDO1lBQzNDLElBQU0sMEJBQTBCLEdBQUcsMExBQTBMLENBQUM7WUFDOU4sRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUU7Z0JBQzdDLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ1Asc0NBQXNDO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNQLHNDQUFzQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6QlUsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNsQyxDQUFDO3lDQUlrQixlQUFNO09BSGIsWUFBWSxDQTBCeEI7SUFBRCxtQkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlc1xuY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJ2FwcC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgKSB7XG4gICAgY29uc3QgdXNlcklkID0gZ2V0U3RyaW5nKCd1c2VySWQnKTtcbiAgICBpZiAodXNlcklkKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuICAgIH1cbiAgICAobmV3IFNxbGl0ZSgnY2hhdC5kYicpKS50aGVuKChkYikgPT4ge1xuICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgY29uc3QgY29udGFjdHNUYWJsZUNyZWF0aW9uUXVlcnkgPSAnQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgY29udGFjdHMgKG51bWJlciBURVhUIFBSSU1BUlkgS0VZLCBuYW1lIFRFWFQsIGF2YXRhciBURVhULCB0ZXh0IFRFWFQsdHlwZSBURVhULCBtdXRlZCBJTlRFR0VSLCBsYXN0U2VlbiBGTE9BVCwgdW5yZWFkIElOVEVHRVIsIGxhc3RfbWVzc2FnZV90aW1lc3RhbXAgRkxPQVQgKSc7XG4gICAgICBkYi5leGVjU1FMKGNvbnRhY3RzVGFibGVDcmVhdGlvblF1ZXJ5KS50aGVuKChpZCkgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnQ29udGFjdHMgVEFCTEUgQ1JFQVRFRCBTVUNDRVNTRlVMTFknKTtcbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnQ1JFQVRFIFRBQkxFIEVSUk9SJywgZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnT1BFTiBEQiBFUlJPUicsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuIl19