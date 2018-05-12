"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("../../core");
var MessagesAreaComponent = (function () {
    function MessagesAreaComponent(platform) {
        this.platform = platform;
    }
    MessagesAreaComponent.prototype.ngOnInit = function () {
        if (this.messages) {
            this.messages = this.messages.slice(0, 50);
        }
    };
    MessagesAreaComponent.prototype.isContinuation = function (idx) {
        return (!this.messages[idx].sender && this.messages[idx - 1] &&
            !this.messages[idx - 1].sender) ||
            (this.messages[idx].sender && this.messages[idx - 1] &&
                this.messages[idx - 1].sender);
    };
    MessagesAreaComponent.prototype.getIcon = function (message) {
        switch (message.sent) {
            case core_2.SentStatus.NOT_SENT:
                return 'mdi-access-time';
            case core_2.SentStatus.SENT:
                return 'mdi-done';
            default:
                return 'mdi-done-all';
        }
    };
    MessagesAreaComponent.prototype.isViewed = function (message) {
        return message.sent === core_2.SentStatus.VIEWED;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MessagesAreaComponent.prototype, "messages", void 0);
    MessagesAreaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-messages-area',
            templateUrl: './messages-area.component.html',
            styleUrls: ['./messages-area.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __param(0, core_1.Inject('platform')),
        __metadata("design:paramtypes", [Object])
    ], MessagesAreaComponent);
    return MessagesAreaComponent;
}());
exports.MessagesAreaComponent = MessagesAreaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMtYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXNzYWdlcy1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUNzRDtBQUN0RCxtQ0FBaUQ7QUFTakQ7SUFHRSwrQkFBdUMsUUFBUTtRQUFSLGFBQVEsR0FBUixRQUFRLENBQUE7SUFBRyxDQUFDO0lBRW5ELHdDQUFRLEdBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxHQUFXO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2hDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsdUNBQU8sR0FBUCxVQUFRLE9BQWdCO1FBQ3RCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssaUJBQVUsQ0FBQyxRQUFRO2dCQUN0QixNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDM0IsS0FBSyxpQkFBVSxDQUFDLElBQUk7Z0JBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEI7Z0JBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxPQUFnQjtRQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxpQkFBVSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxDQUFDO0lBOUJRO1FBQVIsWUFBSyxFQUFFOzsyREFBcUI7SUFEbEIscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1lBQzVDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7UUFJYSxXQUFBLGFBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTs7T0FIcEIscUJBQXFCLENBZ0NqQztJQUFELDRCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCxcbiAgICAgICAgIEluamVjdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVzc2FnZSwgU2VudFN0YXR1cyB9IGZyb20gJy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1tZXNzYWdlcy1hcmVhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2VzLWFyZWEuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlcy1hcmVhLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzQXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lc3NhZ2VzOiBNZXNzYWdlW107XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgncGxhdGZvcm0nKSBwdWJsaWMgcGxhdGZvcm0pIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubWVzc2FnZXMpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzLnNsaWNlKDAsIDUwKTtcbiAgICB9XG4gIH1cblxuICBpc0NvbnRpbnVhdGlvbihpZHg6IG51bWJlcikge1xuICAgIHJldHVybiAoIXRoaXMubWVzc2FnZXNbaWR4XS5zZW5kZXIgJiYgdGhpcy5tZXNzYWdlc1tpZHggLSAxXSAmJlxuICAgICAgICAgICAgIXRoaXMubWVzc2FnZXNbaWR4IC0gMV0uc2VuZGVyKSB8fFxuICAgICAgICAgICAodGhpcy5tZXNzYWdlc1tpZHhdLnNlbmRlciAmJiB0aGlzLm1lc3NhZ2VzW2lkeCAtIDFdICYmXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzW2lkeCAtIDFdLnNlbmRlcik7XG4gIH1cblxuICBnZXRJY29uKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICBzd2l0Y2ggKG1lc3NhZ2Uuc2VudCkge1xuICAgICAgY2FzZSBTZW50U3RhdHVzLk5PVF9TRU5UOlxuICAgICAgICByZXR1cm4gJ21kaS1hY2Nlc3MtdGltZSc7XG4gICAgICBjYXNlIFNlbnRTdGF0dXMuU0VOVDpcbiAgICAgICAgcmV0dXJuICdtZGktZG9uZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ21kaS1kb25lLWFsbCc7XG4gICAgfVxuICB9XG5cbiAgaXNWaWV3ZWQobWVzc2FnZTogTWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlLnNlbnQgPT09IFNlbnRTdGF0dXMuVklFV0VEO1xuICB9XG59XG4iXX0=