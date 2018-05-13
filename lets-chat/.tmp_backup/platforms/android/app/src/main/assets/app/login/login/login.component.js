"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var page_1 = require("tns-core-modules/ui/page");
var chats_service_1 = require("../../core/chats.service");
var LoginComponent = (function () {
    function LoginComponent(page, chatsService, router) {
        this.page = page;
        this.chatsService = chatsService;
        this.router = router;
        this.isLoggingIn = true;
        this.mobileNumber = '';
        this.passwordLogin = '';
        this.countryCodes = ['+91', '+11'];
        this.selectedCountryCodeIndex = 0;
        this.mobileSignup = '';
        this.firstName = '';
        this.lastName = '';
        this.passwordSignup = '';
        this.MaleGenderState = 'Male';
        this.FemaleGenderState = 'Female';
        this.gender = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        var userId = application_settings_1.getString('userId');
        if (userId) {
            this.router.navigate(['/home']);
        }
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
    };
    LoginComponent.prototype.loginOrSignup = function () {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signup();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.chatsService.login(this.mobileNumber, this.passwordLogin)
            .subscribe(function (data) {
            if (data.result === 1) {
                application_settings_1.setString('userId', _this.mobileNumber);
                _this.router.navigate(['/home']);
            }
            else {
                alert(data.message);
            }
        }, function (error) { return alert(error.message); });
    };
    LoginComponent.prototype.signup = function () {
        var _this = this;
        var genderValue = 1;
        if (this.gender) {
            genderValue = 0;
        }
        else {
            genderValue = 1;
        }
        var data = {
            first_name: this.firstName,
            last_name: this.lastName,
            country_code: this.countryCodes[this.selectedCountryCodeIndex],
            mobile: this.mobileSignup,
            password: this.passwordSignup,
            gender: genderValue,
        };
        this.chatsService.signup(data)
            .subscribe(function (resData) {
            if (resData.result === 1) {
                application_settings_1.setString('userId', _this.mobileSignup);
                _this.router.navigate(['/home']);
            }
            else {
                alert(resData.message);
            }
        }, function (error) {
            alert(error.message);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            chats_service_1.ChatsService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUV6Qyw2REFHOEI7QUFDOUIsaURBQWdEO0FBQ2hELDBEQUF3RDtBQU94RDtJQWFFLHdCQUNVLElBQVUsRUFDVixZQUEwQixFQUMxQixNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFmeEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5Qiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFDN0IsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFHLE1BQU0sQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksQ0FBQztJQUtWLENBQUM7SUFFTCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQU0sTUFBTSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUNELHNDQUFhLEdBQWI7UUFD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RCxJQTZFQztBQTdFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBjbGVhciwgZ2V0Qm9vbGVhbiwgZ2V0TnVtYmVyLCBnZXRTdHJpbmcsIGhhc0tleSwgcmVtb3ZlLCBzZXRCb29sZWFuLFxuICBzZXROdW1iZXIsIHNldFN0cmluZyxcbn0gZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XG5pbXBvcnQgeyBDaGF0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2NoYXRzLnNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwLWxvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcbiAgbW9iaWxlTnVtYmVyID0gJyc7XG4gIHBhc3N3b3JkTG9naW4gPSAnJztcbiAgY291bnRyeUNvZGVzID0gWycrOTEnLCAnKzExJ107XG4gIHNlbGVjdGVkQ291bnRyeUNvZGVJbmRleCA9IDA7XG4gIG1vYmlsZVNpZ251cCA9ICcnO1xuICBmaXJzdE5hbWUgPSAnJztcbiAgbGFzdE5hbWUgPSAnJztcbiAgcGFzc3dvcmRTaWdudXAgPSAnJztcbiAgTWFsZUdlbmRlclN0YXRlID0gJ01hbGUnO1xuICBGZW1hbGVHZW5kZXJTdGF0ZSA9ICdGZW1hbGUnO1xuICBnZW5kZXIgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBjaGF0c1NlcnZpY2U6IENoYXRzU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGNvbnN0IHVzZXJJZCA9IGdldFN0cmluZygndXNlcklkJyk7XG4gICAgaWYgKHVzZXJJZCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlRGlzcGxheSgpIHtcbiAgICB0aGlzLmlzTG9nZ2luZ0luID0gIXRoaXMuaXNMb2dnaW5nSW47XG4gIH1cbiAgbG9naW5PclNpZ251cCgpIHtcbiAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgdGhpcy5sb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpZ251cCgpO1xuICAgIH1cbiAgfVxuICBsb2dpbigpIHtcbiAgICB0aGlzLmNoYXRzU2VydmljZS5sb2dpbih0aGlzLm1vYmlsZU51bWJlciwgdGhpcy5wYXNzd29yZExvZ2luKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQgPT09IDEpIHtcbiAgICAgICAgICAgIHNldFN0cmluZygndXNlcklkJywgdGhpcy5tb2JpbGVOdW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4gYWxlcnQoZXJyb3IubWVzc2FnZSksXG4gICAgKTtcbiAgfVxuICBzaWdudXAoKSB7XG4gICAgbGV0IGdlbmRlclZhbHVlID0gMTtcbiAgICBpZiAodGhpcy5nZW5kZXIpIHtcbiAgICAgIGdlbmRlclZhbHVlID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuZGVyVmFsdWUgPSAxO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgZmlyc3RfbmFtZTogdGhpcy5maXJzdE5hbWUsXG4gICAgICBsYXN0X25hbWU6IHRoaXMubGFzdE5hbWUsXG4gICAgICBjb3VudHJ5X2NvZGU6IHRoaXMuY291bnRyeUNvZGVzW3RoaXMuc2VsZWN0ZWRDb3VudHJ5Q29kZUluZGV4XSxcbiAgICAgIG1vYmlsZTogdGhpcy5tb2JpbGVTaWdudXAsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFNpZ251cCxcbiAgICAgIGdlbmRlcjogZ2VuZGVyVmFsdWUsXG4gICAgfTtcbiAgICB0aGlzLmNoYXRzU2VydmljZS5zaWdudXAoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoKHJlc0RhdGEpID0+IHtcbiAgICAgICAgaWYgKHJlc0RhdGEucmVzdWx0ID09PSAxKSB7XG4gICAgICAgICAgc2V0U3RyaW5nKCd1c2VySWQnLCB0aGlzLm1vYmlsZVNpZ251cCk7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydChyZXNEYXRhLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19