import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getString } from 'application-settings';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private database: any;
  constructor(
    private router: Router,
  ) {
    const userId = getString('userId');
    if (userId) {
      this.router.navigate(['/home']);
    }
    (new Sqlite('chat.db')).then((db) => {
      this.database = db;
      // tslint:disable-next-line:max-line-length
      const contactsTableCreationQuery = 'CREATE TABLE IF NOT EXISTS contacts (number TEXT PRIMARY KEY, name TEXT, avatar TEXT, text TEXT,type TEXT, muted INTEGER, lastSeen FLOAT, unread INTEGER, last_message_timestamp FLOAT )';
      db.execSQL(contactsTableCreationQuery).then((id) => {
        // tslint:disable-next-line:no-console
        console.log('Contacts TABLE CREATED SUCCESSFULLY');
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.log('CREATE TABLE ERROR', error);
      });

    }, (error) => {
      // tslint:disable-next-line:no-console
      console.log('OPEN DB ERROR', error);
    });
  }
}
