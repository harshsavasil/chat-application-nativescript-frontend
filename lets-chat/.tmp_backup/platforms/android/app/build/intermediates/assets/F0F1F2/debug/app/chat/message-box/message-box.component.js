"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Toast = require("nativescript-toast");
var chats_service_1 = require("../../core/chats.service");
var MessageBoxComponent = (function () {
    function MessageBoxComponent(platform, chatsService) {
        this.platform = platform;
        this.chatsService = chatsService;
        this.textMessage = '';
        this.messageEvent = new core_1.EventEmitter();
    }
    MessageBoxComponent.prototype.sendMessage = function (args) {
        var _this = this;
        var myTextField = args.object;
        myTextField.dismissSoftInput();
        var data = {
            to: this.contact,
            from: this.user,
            text: this.textMessage,
            sent_time: Date.now(),
        };
        this.chatsService.sendMessage(data)
            .subscribe(function (success) {
            if (success.result === 1) {
                Toast.makeText('Message Sent Successfully.').show();
                _this.addMessageToChat();
            }
            else {
                alert(success.message);
            }
        }, function (error) { return alert(error.message); });
    };
    MessageBoxComponent.prototype.addMessageToChat = function () {
        this.messageEvent.emit(this.textMessage);
        this.textMessage = '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MessageBoxComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MessageBoxComponent.prototype, "contact", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MessageBoxComponent.prototype, "messageEvent", void 0);
    MessageBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-message-box',
            templateUrl: './message-box.component.html',
            styleUrls: ['./message-box.component.css'],
        }),
        __param(0, core_1.Inject('platform')),
        __metadata("design:paramtypes", [Object, chats_service_1.ChatsService])
    ], MessageBoxComponent);
    return MessageBoxComponent;
}());
exports.MessageBoxComponent = MessageBoxComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZS1ib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStFO0FBQy9FLDBDQUE0QztBQUM1QywwREFBd0Q7QUFReEQ7SUFLRSw2QkFDNkIsUUFBUSxFQUMzQixZQUEwQjtRQURQLGFBQVEsR0FBUixRQUFRLENBQUE7UUFDM0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFOcEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHUCxpQkFBWSxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO0lBS3BELENBQUM7SUFDRCx5Q0FBVyxHQUFYLFVBQVksSUFBSTtRQUFoQixpQkFxQkM7UUFwQkMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQixJQUFNLElBQUksR0FBRztZQUNYLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzthQUNoQyxTQUFTLENBQ1IsVUFBQyxPQUFPO1lBQ04sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BELEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDSCxDQUFDLEVBQ0QsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFwQixDQUFvQixDQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUNELDhDQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBakNRO1FBQVIsWUFBSyxFQUFFOztxREFBYztJQUNiO1FBQVIsWUFBSyxFQUFFOzt3REFBaUI7SUFDZjtRQUFULGFBQU0sRUFBRTs7NkRBQTJDO0lBSnpDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUMzQyxDQUFDO1FBT0csV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7aURBQ0csNEJBQVk7T0FQekIsbUJBQW1CLENBb0MvQjtJQUFELDBCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcbmltcG9ydCB7IENoYXRzU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvY2hhdHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLW1lc3NhZ2UtYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2UtYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1ib3guY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQm94Q29tcG9uZW50IHtcbiAgdGV4dE1lc3NhZ2UgPSAnJztcbiAgQElucHV0KCkgdXNlcjogc3RyaW5nO1xuICBASW5wdXQoKSBjb250YWN0OiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBtZXNzYWdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgKSB7XG4gIH1cbiAgc2VuZE1lc3NhZ2UoYXJncykge1xuICAgIGNvbnN0IG15VGV4dEZpZWxkID0gYXJncy5vYmplY3Q7XG4gICAgbXlUZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB0bzogdGhpcy5jb250YWN0LFxuICAgICAgZnJvbTogdGhpcy51c2VyLFxuICAgICAgdGV4dDogdGhpcy50ZXh0TWVzc2FnZSxcbiAgICAgIHNlbnRfdGltZTogRGF0ZS5ub3coKSxcbiAgICB9O1xuICAgIHRoaXMuY2hhdHNTZXJ2aWNlLnNlbmRNZXNzYWdlKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIGlmIChzdWNjZXNzLnJlc3VsdCA9PT0gMSkge1xuICAgICAgICAgICAgVG9hc3QubWFrZVRleHQoJ01lc3NhZ2UgU2VudCBTdWNjZXNzZnVsbHkuJykuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5hZGRNZXNzYWdlVG9DaGF0KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KHN1Y2Nlc3MubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IGFsZXJ0KGVycm9yLm1lc3NhZ2UpLFxuICAgICk7XG4gIH1cbiAgYWRkTWVzc2FnZVRvQ2hhdCgpIHtcbiAgICB0aGlzLm1lc3NhZ2VFdmVudC5lbWl0KHRoaXMudGV4dE1lc3NhZ2UpO1xuICAgIHRoaXMudGV4dE1lc3NhZ2UgPSAnJztcbiAgfVxufVxuIl19