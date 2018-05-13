import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { LoginRoutes } from './login.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(LoginRoutes as any)
  ],
  declarations: [
  LoginComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class LoginModule { }
