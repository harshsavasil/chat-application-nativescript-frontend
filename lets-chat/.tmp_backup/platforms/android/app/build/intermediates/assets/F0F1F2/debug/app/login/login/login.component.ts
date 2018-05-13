import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { clear, getBoolean, getNumber, getString, hasKey, remove, setBoolean,
  setNumber, setString } from 'application-settings';
import { Page } from 'tns-core-modules/ui/page';
import { ChatsService } from '../../core/chats.service';
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggingIn = true;
  mobileNumber = '';
  passwordLogin = '';
  countryCodes = ['+91', '+11'];
  selectedCountryCodeIndex = 0;
  mobileSignup = '';
  firstName = '';
  lastName = '';
  passwordSignup = '';
  MaleGenderState = 'Male';
  FemaleGenderState = 'Female';
  gender = true;
  constructor(
    private page: Page,
    private chatsService: ChatsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    const userId = getString('userId');
    if (userId) {
      this.router.navigate(['/home']);
    }
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
  loginOrSignup() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signup();
    }
  }
  login() {
    this.chatsService.login(this.mobileNumber, this.passwordLogin)
      .subscribe(
        (data) => {
          if (data.result === 1) {
            setString('userId', this.mobileNumber);
            this.router.navigate(['/home']);
          } else {
            alert(data.message);
          }
        },
        (error) => alert(error.message),
    );
  }
  signup() {
    let genderValue = 1;
    if (this.gender) {
      genderValue = 0;
    } else {
      genderValue = 1;
    }
    const data = {
      first_name: this.firstName,
      last_name: this.lastName,
      country_code: this.countryCodes[this.selectedCountryCodeIndex],
      mobile: this.mobileSignup,
      password: this.passwordSignup,
      gender: genderValue,
    };
    this.chatsService.signup(data)
      .subscribe((resData) => {
        if (resData.result === 1) {
          setString('userId', this.mobileSignup);
          this.router.navigate(['/home']);
        } else {
          alert(resData.message);
        }
      },
        (error) => {
          alert(error.message)
        }
    );
  }
}
