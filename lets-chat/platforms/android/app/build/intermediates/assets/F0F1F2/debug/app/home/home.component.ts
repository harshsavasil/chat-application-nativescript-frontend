import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from 'application-settings';

@Component({
    moduleId: module.id,
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    @Inject('platform') public platform,
    private router: Router,
  ) {}
  logout() {
    remove('userId');
    this.router.navigate(['/login']);
  }
}
