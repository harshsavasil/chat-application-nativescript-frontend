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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0Msc0NBQXlFO0FBQ3pFLGlGQUFrRTtBQUNsRSxtQ0FBaUM7QUFDakMsaUNBQStCO0FBQy9CLDhCQUFxQztBQUNyQyxpQ0FBaUM7QUFNakM7SUFDRSxzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBQ25DLHVDQUFnQixHQUFoQjtRQUNFLE1BQU0sQ0FBQztZQUNMLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxZQUFDLE1BQU07b0JBQ25CLHNDQUFzQztvQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELEdBQUcsRUFBRSxHQUFHO2dCQUNSLG9CQUFvQixFQUFFLFNBQVM7Z0JBQy9CLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixpQkFBaUIsRUFBRSxDQUFDO2FBQ3JCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFDRCw0QkFBSyxHQUFMLFVBQU0sTUFBTSxFQUFFLFFBQVE7UUFDcEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxzQkFBZSxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMs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QUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFhLEtBQWU7UUFDMUIsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQXJKVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBRWUsV0FBSTtPQURuQixZQUFZLENBc0p4QjtJQUFELG1CQUFDO0NBQUEsQUF0SkQsSUFzSkM7QUF0Slksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlc3BvbnNlLCBVUkxTZWFyY2hQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IExvYWRpbmdJbmRpY2F0b3IgfSBmcm9tICduYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3InO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IENoYXQgfSBmcm9tICcuL21vZGVscy9jaGF0Lm1vZGVsJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL21vZGVscy9tZXNzYWdlLm1vZGVsJztcbmltcG9ydCB7IFNlbnRTdGF0dXMgfSBmcm9tICcuL21vZGVscy9zZW50LXN0YXR1cy5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGF0c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuICBnZXRMb2FkZXJPcHRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXG4gICAgICBwcm9ncmVzczogMC42NSxcbiAgICAgIGFuZHJvaWQ6IHtcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgY2FuY2VsTGlzdGVuZXIoZGlhbG9nKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmxvZygnTG9hZGluZyBjYW5jZWxsZWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiAnJTFkLyUyZCcsXG4gICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcbiAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcbiAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDEsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbiAgbG9naW4obW9iaWxlLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdtb2JpbGUnLCBtb2JpbGUpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3Bhc3N3b3JkJywgcGFzc3dvcmQpO1xuICAgIGNvbnN0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4gICAgbG9hZGVyLnNob3codGhpcy5nZXRMb2FkZXJPcHRpb25zKCkpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgQ29uZmlnLmFwaVVybCArICdsb2dpbi8nLCB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpLFxuICAgICAgICBwYXJhbXMsXG4gICAgICB9LFxuICAgIClcbiAgICAgIC5tYXAoKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cbiAgc2lnbnVwKGRhdGEpIHtcbiAgICBjb25zdCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuICAgIGxvYWRlci5zaG93KHRoaXMuZ2V0TG9hZGVyT3B0aW9ucygpKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICBDb25maWcuYXBpVXJsICsgJ3NpZ251cC8nLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH0sXG4gICAgKVxuICAgICAgLm1hcCgocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIC8vIHJldHVybiBuZXcgR3JvY2VyeShkYXRhLl9pZCwgbmFtZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuICBnZXRBbGxDaGF0cyhtb2JpbGUpIHtcbiAgICBjb25zdCBjaGF0c0xpc3QgPSBbXTtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcGFyYW1zLmFwcGVuZCgnbW9iaWxlJywgbW9iaWxlKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcbiAgICAgIENvbmZpZy5hcGlVcmwgKyAnY29udGFjdF9saXN0LycsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCksXG4gICAgICAgIHBhcmFtcyxcbiAgICAgIH0pXG4gICAgICAubWFwKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoY2hhdCkgPT4ge1xuICAgICAgICAgIGNoYXRzTGlzdC5wdXNoKGNoYXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoYXRzTGlzdDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG4gIGdldE1lc3NhZ2VzKGNoYXQ6IGFueSk6IE1lc3NhZ2VbXSB7XG4gICAgcmV0dXJuIEFycmF5KDIwMCkuZmlsbCgnJykubWFwKChlbGUsIGlkeCkgPT4gKHtcbiAgICAgIC8vIE5vbi1zZW5zZSBwaHJhc2VzXG4gICAgICB0ZXh0OiBbXG4gICAgICAgICdcXHUyNjNBIFlheSwgdGhpcyBjb3Vyc2UgaXMgYW1hemluZyAhISEgXFx1MjcwQycsXG4gICAgICAgICdTaXh0eS1mb3VyIGRvZXNuXFwndCBsaWtlIHBheWluZyB0YXhlcy4nLFxuICAgICAgICAnQSByaXZlciBhIHRob3VzYW5kIHBhY2VzIHdpZGUgZXZlciBzdHVucyB0aGUgb25sb29rZXIuJyxcbiAgICAgICAgJ1RoYXQgc3RvbGVuIGZpZ3VyaW5lIGlzIG9mdGVuIG9uZSBmbG9vciBhYm92ZSB5b3UuJyxcbiAgICAgICAgJ1xcdTI2M0EgWWF5LCB0aGlzIGNvdXJzZSBpcyBhbWF6aW5nICEhISBcXHUyNzBDJyxcbiAgICAgICAgJ1NwYW0gc2F0IGRvd24gb25jZSBtb3JlIScsXG4gICAgICAgICdXaGlza2V5IG9uIHRoZSB0YWJsZSBzZXQgYSB0cmVlaG91c2Ugb24gZmlyZS4nLFxuICAgICAgICAnVGhhdCBtZW1vcnkgd2UgdXNlZCB0byBzaGFyZSBzdG9sZSB0aGUgZ29vZHMuJyxcbiAgICAgICAgJ0NsZWFyIHdhdGVyIHJhaW5zIGhlYXZpbHknLFxuICAgICAgICAnU3R5bGUgaXMgaW50ZXJkZXBlbmRhbnQgb24gdGhlIHJlbGF0ZWRuZXNzIG9mICcgK1xuICAgICAgICAnbW90aXZhdGlvbiwgc3ViY3VsdHVyZXMsIGFuZCBtYW5hZ2VtZW50JyxcbiAgICAgIF1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXSxcbiAgICAgIGNoYXQsXG4gICAgICBzZW5kZXI6IE1hdGgucmFuZG9tKCkgPiAuNSA/IGNoYXQuY29udGFjdCA6IG51bGwsXG4gICAgICBjcmVhdGVkOiBEYXRlLm5vdygpIC0gKChpZHggKyAxKSAqIDQwICogNjAgKiAxMDAwKSxcbiAgICAgIHNlbnQ6IE1hdGguZmxvb3IoNCAqIE1hdGgucmFuZG9tKCkpLFxuICAgIH0pKTtcbiAgfVxuICBnZXRDaGF0TWVzc2FnZXModXNlciwgY29udGFjdCkge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gW107XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3VzZXJfaWQnLCB1c2VyKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdjb250YWN0X2lkJywgY29udGFjdCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHAuZ2V0KFxuICAgICAgQ29uZmlnLmFwaVVybCArICdyZXRyaWV2ZV9jaGF0cy8nLCB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpLFxuICAgICAgICBwYXJhbXMsXG4gICAgICB9KVxuICAgICAgLm1hcCgocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLy8gLm1hcCgoZGF0YSkgPT4ge1xuICAgICAgLy8gICBkYXRhLmZvckVhY2goKG1lc3NhZ2UpID0+IHtcbiAgICAgIC8vICAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgLy8gICB9KTtcbiAgICAgIC8vICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgLy8gfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB0aGlzLmhhbmRsZUVycm9ycyhlcnIpKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBzZW5kTWVzc2FnZShkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgQ29uZmlnLmFwaVVybCArICdzZW5kX21lc3NhZ2UvJyxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgeyBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKSB9LFxuICAgIClcbiAgICAgIC5tYXAoKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5tYXAoKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cbiAgcmVhZE1lc3NhZ2VzKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICBDb25maWcuYXBpVXJsICsgJ3JlYWRfbWVzc2FnZS8nLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH0sXG4gICAgKVxuICAgICAgLm1hcCgocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLm1hcCgocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuICBnZXRDb21tb25IZWFkZXJzKCkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSk7XG4gIH1cbn1cbiJdfQ==