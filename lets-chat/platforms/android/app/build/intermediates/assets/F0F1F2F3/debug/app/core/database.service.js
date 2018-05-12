"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("./index");
// tslint:disable-next-line:no-var-requires
var Sqlite = require('nativescript-sqlite');
var DataBaseService = (function () {
    function DataBaseService() {
    }
    DataBaseService.prototype.createTables = function () {
        var _this = this;
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
            _this.database = db;
            if (!_this.checkIfTableExist(index_1.Config.contactTableName)) {
                _this.createContactTable();
            }
            if (!_this.checkIfTableExist(index_1.Config.messageTableName)) {
                _this.createMessagesTable();
            }
        }, function (error) {
            alert('Could Not create a connection to DB.');
        });
    };
    DataBaseService.prototype.createContactTable = function () {
        var _this = this;
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
            _this.database = db;
            // tslint:disable-next-line:max-line-length
            _this.database.execSQL(index_1.Config.contactsTableCreationQuery).then(function (id) {
                // tslint:disable-next-line:no-console
                console.log('Contacts TABLE CREATED SUCCESSFULLY');
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('CREATE TABLE ERROR', error);
            });
        }, function (error) {
            // console.log('error in creating db connection.');
        });
    };
    DataBaseService.prototype.createMessagesTable = function () {
        var _this = this;
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
            _this.database = db;
            // tslint:disable-next-line:max-line-length
            _this.database.execSQL(index_1.Config.messagesTableCreationQuery).then(function (id) {
                // tslint:disable-next-line:no-console
                console.log('Messages TABLE CREATED SUCCESSFULLY', id);
                // this.getChatMessagesFromService();
            }, function (error) {
                // tslint:disable-next-line:no-console
                console.log('Messages TABLE Could Not be CREATED', error);
            });
        }, function (error) {
            // console.log('error in creating db connection.');
        });
    };
    DataBaseService.prototype.checkIfTableExist = function (tableName) {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var distinctQuery = 'select DISTINCT tbl_name from sqlite_master where tbl_name = ?';
        (new Sqlite(index_1.Config.dbName)).then(function (db) {
            _this.database = db;
            var checkTableQuery = distinctQuery;
            _this.database.execSQL(checkTableQuery, [tableName])
                .then(function (resultset) {
                for (var row in resultset) {
                    if (resultset.hasOwnProperty('row')) {
                        return true;
                    }
                }
                return false;
            }, function (error) {
                return false;
            });
            return false;
        });
    };
    DataBaseService = __decorate([
        core_1.Injectable()
    ], DataBaseService);
    return DataBaseService;
}());
exports.DataBaseService = DataBaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsaUNBQWlDO0FBQ2pDLDJDQUEyQztBQUMzQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUc5QztJQUFBO0lBa0VBLENBQUM7SUFoRUcsc0NBQVksR0FBWjtRQUFBLGlCQVlDO1FBWEcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQ2hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDOUIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0IsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCw0Q0FBa0IsR0FBbEI7UUFBQSxpQkFjQztRQWJHLENBQUMsSUFBSSxNQUFNLENBQUMsY0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBRTtZQUNoQyxLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQiwyQ0FBMkM7WUFDM0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBTSxDQUFDLDBCQUEwQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBRTtnQkFDN0Qsc0NBQXNDO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDdkQsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQkFDTCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsbURBQW1EO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDZDQUFtQixHQUFuQjtRQUFBLGlCQWVDO1FBZEcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQ2hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLDJDQUEyQztZQUMzQyxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFO2dCQUM3RCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELHFDQUFxQztZQUN6QyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNMLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxtREFBbUQ7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMkNBQWlCLEdBQWpCLFVBQWtCLFNBQVM7UUFBM0IsaUJBbUJDO1FBbEJHLDJDQUEyQztRQUMzQyxJQUFNLGFBQWEsR0FBRyxnRUFBZ0UsQ0FBQztRQUN2RixDQUFDLElBQUksTUFBTSxDQUFDLGNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDaEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM5QyxJQUFJLENBQUMsVUFBQyxTQUFTO2dCQUNaLEdBQUcsQ0FBQyxDQUFDLElBQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWpFUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7T0FDQSxlQUFlLENBa0UzQjtJQUFELHNCQUFDO0NBQUEsQUFsRUQsSUFrRUM7QUFsRVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuL2luZGV4Jztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12YXItcmVxdWlyZXNcbmNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFCYXNlU2VydmljZSB7XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICAgIGNyZWF0ZVRhYmxlcygpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiTmFtZSkpLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tJZlRhYmxlRXhpc3QoQ29uZmlnLmNvbnRhY3RUYWJsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb250YWN0VGFibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja0lmVGFibGVFeGlzdChDb25maWcubWVzc2FnZVRhYmxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1lc3NhZ2VzVGFibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBhbGVydCgnQ291bGQgTm90IGNyZWF0ZSBhIGNvbm5lY3Rpb24gdG8gREIuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjcmVhdGVDb250YWN0VGFibGUoKSB7XG4gICAgICAgIChuZXcgU3FsaXRlKENvbmZpZy5kYk5hbWUpKS50aGVuKChkYikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKENvbmZpZy5jb250YWN0c1RhYmxlQ3JlYXRpb25RdWVyeSkudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb250YWN0cyBUQUJMRSBDUkVBVEVEIFNVQ0NFU1NGVUxMWScpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ1JFQVRFIFRBQkxFIEVSUk9SJywgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Vycm9yIGluIGNyZWF0aW5nIGRiIGNvbm5lY3Rpb24uJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjcmVhdGVNZXNzYWdlc1RhYmxlKCkge1xuICAgICAgICAobmV3IFNxbGl0ZShDb25maWcuZGJOYW1lKSkudGhlbigoZGIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChDb25maWcubWVzc2FnZXNUYWJsZUNyZWF0aW9uUXVlcnkpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWVzc2FnZXMgVEFCTEUgQ1JFQVRFRCBTVUNDRVNTRlVMTFknLCBpZCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRDaGF0TWVzc2FnZXNGcm9tU2VydmljZSgpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWVzc2FnZXMgVEFCTEUgQ291bGQgTm90IGJlIENSRUFURUQnLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZXJyb3IgaW4gY3JlYXRpbmcgZGIgY29ubmVjdGlvbi4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrSWZUYWJsZUV4aXN0KHRhYmxlTmFtZSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgIGNvbnN0IGRpc3RpbmN0UXVlcnkgPSAnc2VsZWN0IERJU1RJTkNUIHRibF9uYW1lIGZyb20gc3FsaXRlX21hc3RlciB3aGVyZSB0YmxfbmFtZSA9ID8nO1xuICAgICAgICAobmV3IFNxbGl0ZShDb25maWcuZGJOYW1lKSkudGhlbigoZGIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrVGFibGVRdWVyeSA9IGRpc3RpbmN0UXVlcnk7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoY2hlY2tUYWJsZVF1ZXJ5LCBbdGFibGVOYW1lXSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0c2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IGluIHJlc3VsdHNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNldC5oYXNPd25Qcm9wZXJ0eSgncm93JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19