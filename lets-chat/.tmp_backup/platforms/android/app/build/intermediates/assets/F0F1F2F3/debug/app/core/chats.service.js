"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var index_1 = require("./index");
var ChatsService = (function () {
    function ChatsService(http) {
        this.http = http;
    }
    ChatsService.prototype.getLoaderOptions = function () {
        return {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: true,
                cancelListener: function (dialog) {
                    // tslint:disable-next-line:no-console
                    console.log('Loading cancelled');
                },
                max: 100,
                progressNumberFormat: '%1d/%2d',
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1,
            },
        };
    };
    ChatsService.prototype.login = function (mobile, password) {
        var params = new http_1.URLSearchParams();
        params.append('mobile', mobile);
        params.append('password', password);
        var loader = new nativescript_loading_indicator_1.LoadingIndicator();
        loader.show(this.getLoaderOptions());
        return this.http.get(index_1.Config.apiUrl + 'login/', {
            headers: this.getCommonHeaders(),
            params: params,
        })
            .map(function (response) { return response.json(); })
            .map(function (data) {
            loader.hide();
            return data;
        })
            .catch(this.handleErrors);
    };
    ChatsService.prototype.signup = function (data) {
        var loader = new nativescript_loading_indicator_1.LoadingIndicator();
        loader.show(this.getLoaderOptions());
        return this.http.post(index_1.Config.apiUrl + 'signup/', JSON.stringify(data), { headers: this.getCommonHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            loader.hide();
            return res;
            // return new Grocery(data._id, name);
        })
            .catch(this.handleErrors);
    };
    ChatsService.prototype.getAllChats = function (mobile) {
        var chatsList = [];
        var params = new http_1.URLSearchParams();
        params.append('mobile', mobile);
        return this.http.get(index_1.Config.apiUrl + 'contact_list/', {
            headers: this.getCommonHeaders(),
            params: params,
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            data.forEach(function (chat) {
                chatsList.push(chat);
            });
            return chatsList;
        })
            .catch(this.handleErrors);
    };
    ChatsService.prototype.getMessages = function (chat) {
        return Array(200).fill('').map(function (ele, idx) { return ({
            // Non-sense phrases
            text: [
                '\u263A Yay, this course is amazing !!! \u270C',
                'Sixty-four doesn\'t like paying taxes.',
                'A river a thousand paces wide ever stuns the onlooker.',
                'That stolen figurine is often one floor above you.',
                '\u263A Yay, this course is amazing !!! \u270C',
                'Spam sat down once more!',
                'Whiskey on the table set a treehouse on fire.',
                'That memory we used to share stole the goods.',
                'Clear water rains heavily',
                'Style is interdependant on the relatedness of ' +
                    'motivation, subcultures, and management',
            ][Math.floor(Math.random() * 10)],
            chat: chat,
            sender: Math.random() > .5 ? chat.contact : null,
            created: Date.now() - ((idx + 1) * 40 * 60 * 1000),
            sent: Math.floor(4 * Math.random()),
        }); });
    };
    ChatsService.prototype.getChatMessages = function (user, contact) {
        var _this = this;
        var messages = [];
        var params = new http_1.URLSearchParams();
        params.append('user_id', user);
        params.append('contact_id', contact);
        var response = this.http.get(index_1.Config.apiUrl + 'retrieve_chats/', {
            headers: this.getCommonHeaders(),
            params: params,
        })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return _this.handleErrors(err); });
        return response;
    };
    ChatsService.prototype.sendMessage = function (data) {
        return this.http.post(index_1.Config.apiUrl + 'send_message/', JSON.stringify(data), { headers: this.getCommonHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            return res;
        })
            .catch(this.handleErrors);
    };
    ChatsService.prototype.readMessages = function (data) {
        return this.http.post(index_1.Config.apiUrl + 'read_message/', JSON.stringify(data), { headers: this.getCommonHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            return res;
        })
            .catch(this.handleErrors);
    };
    ChatsService.prototype.commonPostService = function (url, data) {
        return this.http.post(url, JSON.stringify(data), { headers: this.getCommonHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            return res;
            // return new Grocery(data._id, name);
        })
            .catch(this.handleErrors);
    };
    ChatsService.prototype.getCommonHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    ChatsService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.json());
    };
    ChatsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ChatsService);
    return ChatsService;
}());
exports.ChatsService = ChatsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0Msc0NBQXlFO0FBQ3pFLGlGQUFrRTtBQUNsRSxtQ0FBaUM7QUFDakMsaUNBQStCO0FBQy9CLDhCQUFxQztBQUNyQyxpQ0FBaUM7QUFNakM7SUFDRSxzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBQ25DLHVDQUFnQixHQUFoQjtRQUNFLE1BQU0sQ0FBQztZQUNMLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxZQUFDLE1BQU07b0JBQ25CLHNDQUFzQztvQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELEdBQUcsRUFBRSxHQUFHO2dCQUNSLG9CQUFvQixFQUFFLFNBQVM7Z0JBQy9CLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixpQkFBaUIsRUFBRSxDQUFDO2FBQ3JCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFDRCw0QkFBSyxHQUFMLFVBQU0sTUFBTSxFQUFFLFFBQVE7UUFDcEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxzQkFBZSxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMs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QUMsRUFDcEIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDckM7YUFDRSxHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDO2FBQ3hCLEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ1gsc0NBQXNDO1FBQ3hDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELHVDQUFnQixHQUFoQjtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQ0FBWSxHQUFaLFVBQWEsS0FBZTtRQUMxQixNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBbEtVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FFZSxXQUFJO09BRG5CLFlBQVksQ0FtS3hCO0lBQUQsbUJBQUM7Q0FBQSxBQW5LRCxJQW1LQztBQW5LWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UsIFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvcic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgQ2hhdCB9IGZyb20gJy4vbW9kZWxzL2NoYXQubW9kZWwnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4vbW9kZWxzL21lc3NhZ2UubW9kZWwnO1xuaW1wb3J0IHsgU2VudFN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL3NlbnQtc3RhdHVzLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoYXRzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG4gIGdldExvYWRlck9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcbiAgICAgIHByb2dyZXNzOiAwLjY1LFxuICAgICAgYW5kcm9pZDoge1xuICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjYW5jZWxMaXN0ZW5lcihkaWFsb2cpIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkaW5nIGNhbmNlbGxlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6ICclMWQvJTJkJyxcbiAgICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxuICAgICAgICBwcm9ncmVzc1N0eWxlOiAxLFxuICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICBsb2dpbihtb2JpbGUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ21vYmlsZScsIG1vYmlsZSk7XG4gICAgcGFyYW1zLmFwcGVuZCgncGFzc3dvcmQnLCBwYXNzd29yZCk7XG4gICAgY29uc3QgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbiAgICBsb2FkZXIuc2hvdyh0aGlzLmdldExvYWRlck9wdGlvbnMoKSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgICBDb25maWcuYXBpVXJsICsgJ2xvZ2luLycsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCksXG4gICAgICAgIHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKVxuICAgICAgLm1hcCgocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuICBzaWdudXAoZGF0YSkge1xuICAgIGNvbnN0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4gICAgbG9hZGVyLnNob3codGhpcy5nZXRMb2FkZXJPcHRpb25zKCkpO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIENvbmZpZy5hcGlVcmwgKyAnc2lnbnVwLycsXG4gICAgICBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfSxcbiAgICApXG4gICAgICAubWFwKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBHcm9jZXJ5KGRhdGEuX2lkLCBuYW1lKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG4gIGdldEFsbENoYXRzKG1vYmlsZSkge1xuICAgIGNvbnN0IGNoYXRzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdtb2JpbGUnLCBtb2JpbGUpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgQ29uZmlnLmFwaVVybCArICdjb250YWN0X2xpc3QvJywge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgfSlcbiAgICAgIC5tYXAoKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgZGF0YS5mb3JFYWNoKChjaGF0KSA9PiB7XG4gICAgICAgICAgY2hhdHNMaXN0LnB1c2goY2hhdCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hhdHNMaXN0O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cbiAgZ2V0TWVzc2FnZXMoY2hhdDogYW55KTogTWVzc2FnZVtdIHtcbiAgICByZXR1cm4gQXJyYXkoMjAwKS5maWxsKCcnKS5tYXAoKGVsZSwgaWR4KSA9PiAoe1xuICAgICAgLy8gTm9uLXNlbnNlIHBocmFzZXNcbiAgICAgIHRleHQ6IFtcbiAgICAgICAgJ1xcdTI2M0EgWWF5LCB0aGlzIGNvdXJzZSBpcyBhbWF6aW5nICEhISBcXHUyNzBDJyxcbiAgICAgICAgJ1NpeHR5LWZvdXIgZG9lc25cXCd0IGxpa2UgcGF5aW5nIHRheGVzLicsXG4gICAgICAgICdBIHJpdmVyIGEgdGhvdXNhbmQgcGFjZXMgd2lkZSBldmVyIHN0dW5zIHRoZSBvbmxvb2tlci4nLFxuICAgICAgICAnVGhhdCBzdG9sZW4gZmlndXJpbmUgaXMgb2Z0ZW4gb25lIGZsb29yIGFib3ZlIHlvdS4nLFxuICAgICAgICAnXFx1MjYzQSBZYXksIHRoaXMgY291cnNlIGlzIGFtYXppbmcgISEhIFxcdTI3MEMnLFxuICAgICAgICAnU3BhbSBzYXQgZG93biBvbmNlIG1vcmUhJyxcbiAgICAgICAgJ1doaXNrZXkgb24gdGhlIHRhYmxlIHNldCBhIHRyZWVob3VzZSBvbiBmaXJlLicsXG4gICAgICAgICdUaGF0IG1lbW9yeSB3ZSB1c2VkIHRvIHNoYXJlIHN0b2xlIHRoZSBnb29kcy4nLFxuICAgICAgICAnQ2xlYXIgd2F0ZXIgcmFpbnMgaGVhdmlseScsXG4gICAgICAgICdTdHlsZSBpcyBpbnRlcmRlcGVuZGFudCBvbiB0aGUgcmVsYXRlZG5lc3Mgb2YgJyArXG4gICAgICAgICdtb3RpdmF0aW9uLCBzdWJjdWx0dXJlcywgYW5kIG1hbmFnZW1lbnQnLFxuICAgICAgXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldLFxuICAgICAgY2hhdCxcbiAgICAgIHNlbmRlcjogTWF0aC5yYW5kb20oKSA+IC41ID8gY2hhdC5jb250YWN0IDogbnVsbCxcbiAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCkgLSAoKGlkeCArIDEpICogNDAgKiA2MCAqIDEwMDApLFxuICAgICAgc2VudDogTWF0aC5mbG9vcig0ICogTWF0aC5yYW5kb20oKSksXG4gICAgfSkpO1xuICB9XG4gIGdldENoYXRNZXNzYWdlcyh1c2VyLCBjb250YWN0KSB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBbXTtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcGFyYW1zLmFwcGVuZCgndXNlcl9pZCcsIHVzZXIpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2NvbnRhY3RfaWQnLCBjb250YWN0KTtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cC5nZXQoXG4gICAgICBDb25maWcuYXBpVXJsICsgJ3JldHJpZXZlX2NoYXRzLycsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCksXG4gICAgICAgIHBhcmFtcyxcbiAgICAgIH0pXG4gICAgICAubWFwKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAvLyAubWFwKChkYXRhKSA9PiB7XG4gICAgICAvLyAgIGRhdGEuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgLy8gICAgIG1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAvLyAgIH0pO1xuICAgICAgLy8gICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAvLyB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHRoaXMuaGFuZGxlRXJyb3JzKGVycikpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICBDb25maWcuYXBpVXJsICsgJ3NlbmRfbWVzc2FnZS8nLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH0sXG4gICAgKVxuICAgICAgLm1hcCgocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuICByZWFkTWVzc2FnZXMoZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIENvbmZpZy5hcGlVcmwgKyAncmVhZF9tZXNzYWdlLycsXG4gICAgICBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfSxcbiAgICApXG4gICAgICAubWFwKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAubWFwKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG4gIGNvbW1vblBvc3RTZXJ2aWNlKHVybCwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIHVybCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgeyBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSB9LFxuICAgIClcbiAgICAgIC5tYXAoKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAvLyByZXR1cm4gbmV3IEdyb2NlcnkoZGF0YS5faWQsIG5hbWUpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cbiAgZ2V0Q29tbW9uSGVhZGVycygpIHtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpO1xuICB9XG59XG4iXX0=