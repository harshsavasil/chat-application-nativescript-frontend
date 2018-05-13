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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUV6Qyw2REFDcUQ7QUFDckQsaURBQWdEO0FBQ2hELDBEQUF3RDtBQU94RDtJQWFFLHdCQUNVLElBQVUsRUFDVixZQUEwQixFQUMxQixNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFmeEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5Qiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFDN0IsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFHLE1BQU0sQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksQ0FBQztJQUtWLENBQUM7SUFFTCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQU0sTUFBTSxHQUFHLGdDQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUNELHNDQUFhLEdBQWI7UUFD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RCxJQStFQztBQS9FWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBjbGVhciwgZ2V0Qm9vbGVhbiwgZ2V0TnVtYmVyLCBnZXRTdHJpbmcsIGhhc0tleSwgcmVtb3ZlLCBzZXRCb29sZWFuLFxuICBzZXROdW1iZXIsIHNldFN0cmluZyB9IGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuaW1wb3J0IHsgQ2hhdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jaGF0cy5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1sb2dpbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0xvZ2dpbmdJbiA9IHRydWU7XG4gIG1vYmlsZU51bWJlciA9ICcnO1xuICBwYXNzd29yZExvZ2luID0gJyc7XG4gIGNvdW50cnlDb2RlcyA9IFsnKzkxJywgJysxMSddO1xuICBzZWxlY3RlZENvdW50cnlDb2RlSW5kZXggPSAwO1xuICBtb2JpbGVTaWdudXAgPSAnJztcbiAgZmlyc3ROYW1lID0gJyc7XG4gIGxhc3ROYW1lID0gJyc7XG4gIHBhc3N3b3JkU2lnbnVwID0gJyc7XG4gIE1hbGVHZW5kZXJTdGF0ZSA9ICdNYWxlJztcbiAgRmVtYWxlR2VuZGVyU3RhdGUgPSAnRmVtYWxlJztcbiAgZ2VuZGVyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgY2hhdHNTZXJ2aWNlOiBDaGF0c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBjb25zdCB1c2VySWQgPSBnZXRTdHJpbmcoJ3VzZXJJZCcpO1xuICAgIGlmICh1c2VySWQpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG4gICAgfVxuICB9XG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICB9XG4gIGxvZ2luT3JTaWdudXAoKSB7XG4gICAgaWYgKHRoaXMuaXNMb2dnaW5nSW4pIHtcbiAgICAgIHRoaXMubG9naW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaWdudXAoKTtcbiAgICB9XG4gIH1cbiAgbG9naW4oKSB7XG4gICAgdGhpcy5jaGF0c1NlcnZpY2UubG9naW4odGhpcy5tb2JpbGVOdW1iZXIsIHRoaXMucGFzc3dvcmRMb2dpbilcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0ID09PSAxKSB7XG4gICAgICAgICAgICBzZXRTdHJpbmcoJ3VzZXJJZCcsIHRoaXMubW9iaWxlTnVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IGFsZXJ0KGVycm9yLm1lc3NhZ2UpLFxuICAgICk7XG4gIH1cbiAgc2lnbnVwKCkge1xuICAgIGxldCBnZW5kZXJWYWx1ZSA9IDE7XG4gICAgaWYgKHRoaXMuZ2VuZGVyKSB7XG4gICAgICBnZW5kZXJWYWx1ZSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbmRlclZhbHVlID0gMTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGZpcnN0X25hbWU6IHRoaXMuZmlyc3ROYW1lLFxuICAgICAgbGFzdF9uYW1lOiB0aGlzLmxhc3ROYW1lLFxuICAgICAgY291bnRyeV9jb2RlOiB0aGlzLmNvdW50cnlDb2Rlc1t0aGlzLnNlbGVjdGVkQ291bnRyeUNvZGVJbmRleF0sXG4gICAgICBtb2JpbGU6IHRoaXMubW9iaWxlU2lnbnVwLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRTaWdudXAsXG4gICAgICBnZW5kZXI6IGdlbmRlclZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5jaGF0c1NlcnZpY2Uuc2lnbnVwKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKChyZXNEYXRhKSA9PiB7XG4gICAgICAgIGlmIChyZXNEYXRhLnJlc3VsdCA9PT0gMSkge1xuICAgICAgICAgIHNldFN0cmluZygndXNlcklkJywgdGhpcy5tb2JpbGVTaWdudXApO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQocmVzRGF0YS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==