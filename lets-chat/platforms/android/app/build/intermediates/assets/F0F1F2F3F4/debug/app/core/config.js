"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    Config.apiUrl = 'http://192.168.1.109:8002/';
    Config.defaultYear = 1995;
    Config.savePushTokenUrl = 'save_push_token/';
    Config.fcmSenderID = '182779581564';
    Config.messagesTableCreationQuery = "\n        CREATE TABLE IF NOT EXISTS messages\n        (   id INTEGER PRIMARY KEY AUTOINCREMENT,\n            messageText TEXT,\n            sender INTEGER,\n            sentTime FLOAT,\n            deliveredTime FLOAT,\n            readTime FLOAT,\n            createdTime FLOAT,\n            sent INTEGER,\n            contact TEXT,\n            messageId TEXT\n        )";
    Config.contactsTableCreationQuery = "\n        CREATE TABLE IF NOT EXISTS contacts\n        (   number TEXT PRIMARY KEY,\n            name TEXT,\n            avatar TEXT,\n            text TEXT,\n            type TEXT,\n            muted INTEGER,\n            lastSeen FLOAT,\n            unread INTEGER,\n            last_message_timestamp FLOAT\n        )";
    Config.contactTableName = 'contacts';
    Config.messageTableName = 'messages';
    Config.dbName = 'chat.db';
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFBQTtJQWlDQSxDQUFDO0lBaENVLGFBQU0sR0FBRyw0QkFBNEIsQ0FBQztJQUN0QyxrQkFBVyxHQUFHLElBQUksQ0FBQztJQUNuQix1QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0QyxrQkFBVyxHQUFHLGNBQWMsQ0FBQztJQUM3QixpQ0FBMEIsR0FBRyx1WEFZOUIsQ0FBQztJQUNBLGlDQUEwQixHQUFHLGtVQVc5QixDQUFDO0lBQ0EsdUJBQWdCLEdBQUcsVUFBVSxDQUFDO0lBQzlCLHVCQUFnQixHQUFHLFVBQVUsQ0FBQztJQUM5QixhQUFNLEdBQUcsU0FBUyxDQUFDO0lBQzlCLGFBQUM7Q0FBQSxBQWpDRCxJQWlDQztBQWpDWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIHN0YXRpYyBhcGlVcmwgPSAnaHR0cDovLzE5Mi4xNjguMS4xMDk6ODAwMi8nO1xuICAgIHN0YXRpYyBkZWZhdWx0WWVhciA9IDE5OTU7XG4gICAgc3RhdGljIHNhdmVQdXNoVG9rZW5VcmwgPSAnc2F2ZV9wdXNoX3Rva2VuLyc7XG4gICAgc3RhdGljIGZjbVNlbmRlcklEID0gJzE4Mjc3OTU4MTU2NCc7XG4gICAgc3RhdGljIG1lc3NhZ2VzVGFibGVDcmVhdGlvblF1ZXJ5ID0gYFxuICAgICAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBtZXNzYWdlc1xuICAgICAgICAoICAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICAgICAgICAgICAgbWVzc2FnZVRleHQgVEVYVCxcbiAgICAgICAgICAgIHNlbmRlciBJTlRFR0VSLFxuICAgICAgICAgICAgc2VudFRpbWUgRkxPQVQsXG4gICAgICAgICAgICBkZWxpdmVyZWRUaW1lIEZMT0FULFxuICAgICAgICAgICAgcmVhZFRpbWUgRkxPQVQsXG4gICAgICAgICAgICBjcmVhdGVkVGltZSBGTE9BVCxcbiAgICAgICAgICAgIHNlbnQgSU5URUdFUixcbiAgICAgICAgICAgIGNvbnRhY3QgVEVYVCxcbiAgICAgICAgICAgIG1lc3NhZ2VJZCBURVhUXG4gICAgICAgIClgO1xuICAgIHN0YXRpYyBjb250YWN0c1RhYmxlQ3JlYXRpb25RdWVyeSA9IGBcbiAgICAgICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgY29udGFjdHNcbiAgICAgICAgKCAgIG51bWJlciBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgICAgICAgbmFtZSBURVhULFxuICAgICAgICAgICAgYXZhdGFyIFRFWFQsXG4gICAgICAgICAgICB0ZXh0IFRFWFQsXG4gICAgICAgICAgICB0eXBlIFRFWFQsXG4gICAgICAgICAgICBtdXRlZCBJTlRFR0VSLFxuICAgICAgICAgICAgbGFzdFNlZW4gRkxPQVQsXG4gICAgICAgICAgICB1bnJlYWQgSU5URUdFUixcbiAgICAgICAgICAgIGxhc3RfbWVzc2FnZV90aW1lc3RhbXAgRkxPQVRcbiAgICAgICAgKWA7XG4gICAgc3RhdGljIGNvbnRhY3RUYWJsZU5hbWUgPSAnY29udGFjdHMnO1xuICAgIHN0YXRpYyBtZXNzYWdlVGFibGVOYW1lID0gJ21lc3NhZ2VzJztcbiAgICBzdGF0aWMgZGJOYW1lID0gJ2NoYXQuZGInO1xufVxuIl19