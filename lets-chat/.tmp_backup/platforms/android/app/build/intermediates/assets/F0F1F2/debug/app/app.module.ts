import { NgModule, NgModuleFactoryLoader,
         NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptHttpModule } from 'nativescript-angular';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import * as platform from 'platform';

import { registerElement } from 'nativescript-angular';
import { Fab } from 'nativescript-floatingactionbutton';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
registerElement('Fab', () => Fab);

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
      NativeScriptModule,
      AppRoutingModule,
      CoreModule,
      NativeScriptHttpModule,
    ],
    declarations: [
      AppComponent,
    ],
    providers: [
      { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
      { provide: 'platform', useValue: platform },
    ],
    schemas: [
      NO_ERRORS_SCHEMA,
    ],
})
export class AppModule { }
