"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chats_service_1 = require("../../core/chats.service");
var database_service_1 = require("../../core/database.service");
var MessageBoxComponent = (function () {
    function MessageBoxComponent(platform, chatsService, databaseService) {
        this.platform = platform;
        this.chatsService = chatsService;
        this.databaseService = databaseService;
        this.textMessage = '';
        this.messageEvent = new core_1.EventEmitter();
    }
    MessageBoxComponent.prototype.sendMessage = function (args) {
        var myTextField = args.object;
        myTextField.dismissSoftInput();
        var data = {
            text: this.textMessage,
            sender: 1,
            contact: this.contact,
            sent: 0,
            created: Date.now(),
        };
        this.databaseService.insertIntoMessages(data);
        this.addMessageToChat();
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
        __metadata("design:paramtypes", [Object, chats_service_1.ChatsService,
            database_service_1.DataBaseService])
    ], MessageBoxComponent);
    return MessageBoxComponent;
}());
exports.MessageBoxComponent = MessageBoxComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZS1ib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStFO0FBRS9FLDBEQUF3RDtBQUN4RCxnRUFBOEQ7QUFROUQ7SUFLRSw2QkFDNkIsUUFBUSxFQUMzQixZQUEwQixFQUMxQixlQUFnQztRQUZiLGFBQVEsR0FBUixRQUFRLENBQUE7UUFDM0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUDFDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR1AsaUJBQVksR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQU1wRCxDQUFDO0lBQ0QseUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9CLElBQU0sSUFBSSxHQUFHO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3RCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELDhDQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBekJRO1FBQVIsWUFBSyxFQUFFOztxREFBYztJQUNiO1FBQVIsWUFBSyxFQUFFOzt3REFBaUI7SUFDZjtRQUFULGFBQU0sRUFBRTs7NkRBQTJDO0lBSnpDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUMzQyxDQUFDO1FBT0csV0FBQSxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7aURBQ0csNEJBQVk7WUFDVCxrQ0FBZTtPQVIvQixtQkFBbUIsQ0E0Qi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVCRCxJQTRCQztBQTVCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xuaW1wb3J0IHsgQ2hhdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jaGF0cy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvZGF0YWJhc2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLW1lc3NhZ2UtYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2UtYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1ib3guY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQm94Q29tcG9uZW50IHtcbiAgdGV4dE1lc3NhZ2UgPSAnJztcbiAgQElucHV0KCkgdXNlcjogc3RyaW5nO1xuICBASW5wdXQoKSBjb250YWN0OiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBtZXNzYWdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGFiYXNlU2VydmljZTogRGF0YUJhc2VTZXJ2aWNlLFxuICApIHtcbiAgfVxuICBzZW5kTWVzc2FnZShhcmdzKSB7XG4gICAgY29uc3QgbXlUZXh0RmllbGQgPSBhcmdzLm9iamVjdDtcbiAgICBteVRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHRleHQ6IHRoaXMudGV4dE1lc3NhZ2UsXG4gICAgICBzZW5kZXI6IDEsXG4gICAgICBjb250YWN0OiB0aGlzLmNvbnRhY3QsXG4gICAgICBzZW50OiAwLFxuICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKSxcbiAgICB9O1xuICAgIHRoaXMuZGF0YWJhc2VTZXJ2aWNlLmluc2VydEludG9NZXNzYWdlcyhkYXRhKTtcbiAgICB0aGlzLmFkZE1lc3NhZ2VUb0NoYXQoKTtcbiAgfVxuICBhZGRNZXNzYWdlVG9DaGF0KCkge1xuICAgIHRoaXMubWVzc2FnZUV2ZW50LmVtaXQodGhpcy50ZXh0TWVzc2FnZSk7XG4gICAgdGhpcy50ZXh0TWVzc2FnZSA9ICcnO1xuICB9XG59XG4iXX0=