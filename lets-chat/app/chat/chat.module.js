"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var nativescript_ngx_fonticon_1 = require("nativescript-ngx-fonticon");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
// import { ShortWhenPipe } from '../home/chats/short-when.pipe';
var chat_routing_module_1 = require("./chat-routing.module");
var chat_component_1 = require("./chat.component");
var message_box_component_1 = require("./message-box/message-box.component");
var messages_area_component_1 = require("./messages-area/messages-area.component");
var ChatModule = (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                chat_routing_module_1.ChatRoutingModule,
                nativescript_ng_shadow_1.NgShadowModule,
                nativescript_ngx_fonticon_1.TNSFontIconModule.forRoot({
                    mdi: 'material-design-icons.css',
                }),
            ],
            declarations: [
                chat_component_1.ChatComponent,
                messages_area_component_1.MessagesAreaComponent,
                message_box_component_1.MessageBoxComponent,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA,
            ],
        })
    ], ChatModule);
    return ChatModule;
}());
exports.ChatModule = ChatModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxvREFBcUU7QUFDckUsZ0ZBQThFO0FBQzlFLHVFQUE4RDtBQUU5RCxpRUFBd0Q7QUFDeEQsaUVBQWlFO0FBQ2pFLDZEQUEwRDtBQUMxRCxtREFBaUQ7QUFDakQsNkVBQTBFO0FBQzFFLG1GQUFnRjtBQXFCaEY7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQXBCdEIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qix1Q0FBaUI7Z0JBQ2pCLHVDQUFjO2dCQUNkLDZDQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDeEIsR0FBRyxFQUFFLDJCQUEyQjtpQkFDakMsQ0FBQzthQUNIO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDhCQUFhO2dCQUNiLCtDQUFxQjtnQkFDckIsMkNBQW1CO2FBRXBCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjthQUNqQjtTQUNGLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO0FBQWQsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5neC1mb250aWNvbic7XG5cbmltcG9ydCB7IE5nU2hhZG93TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG4vLyBpbXBvcnQgeyBTaG9ydFdoZW5QaXBlIH0gZnJvbSAnLi4vaG9tZS9jaGF0cy9zaG9ydC13aGVuLnBpcGUnO1xuaW1wb3J0IHsgQ2hhdFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2NoYXQtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hhdENvbXBvbmVudCB9IGZyb20gJy4vY2hhdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUJveENvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS1ib3gvbWVzc2FnZS1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VzQXJlYUNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZXMtYXJlYS9tZXNzYWdlcy1hcmVhLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIENoYXRSb3V0aW5nTW9kdWxlLFxuICAgIE5nU2hhZG93TW9kdWxlLFxuICAgIFROU0ZvbnRJY29uTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbWRpOiAnbWF0ZXJpYWwtZGVzaWduLWljb25zLmNzcycsXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENoYXRDb21wb25lbnQsXG4gICAgTWVzc2FnZXNBcmVhQ29tcG9uZW50LFxuICAgIE1lc3NhZ2VCb3hDb21wb25lbnQsXG4gICAgLy8gU2hvcnRXaGVuUGlwZSxcbiAgXSxcbiAgc2NoZW1hczogW1xuICAgIE5PX0VSUk9SU19TQ0hFTUEsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENoYXRNb2R1bGUgeyB9XG4iXX0=