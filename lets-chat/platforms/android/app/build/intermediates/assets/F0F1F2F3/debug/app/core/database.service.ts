import { Injectable } from '@angular/core';
import { Config } from './index';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');

@Injectable()
export class DataBaseService {
    private database: any;
    createTables() {
        (new Sqlite(Config.dbName)).then((db) => {
            this.database = db;
            if (!this.checkIfTableExist(Config.contactTableName)) {
                this.createContactTable();
            }
            if (!this.checkIfTableExist(Config.messageTableName)) {
                this.createMessagesTable();
            }
        }, (error) => {
            alert('Could Not create a connection to DB.');
        });
    }
    createContactTable() {
        (new Sqlite(Config.dbName)).then((db) => {
            this.database = db;
            // tslint:disable-next-line:max-line-length
            this.database.execSQL(Config.contactsTableCreationQuery).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('Contacts TABLE CREATED SUCCESSFULLY');
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('CREATE TABLE ERROR', error);
            });
        }, (error) => {
            // console.log('error in creating db connection.');
        });
    }
    createMessagesTable() {
        (new Sqlite(Config.dbName)).then((db) => {
            this.database = db;
            // tslint:disable-next-line:max-line-length
            this.database.execSQL(Config.messagesTableCreationQuery).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('Messages TABLE CREATED SUCCESSFULLY', id);
                // this.getChatMessagesFromService();
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('Messages TABLE Could Not be CREATED', error);
            });
        }, (error) => {
            // console.log('error in creating db connection.');
        });
    }
    checkIfTableExist(tableName) {
        // tslint:disable-next-line:max-line-length
        const distinctQuery = 'select DISTINCT tbl_name from sqlite_master where tbl_name = ?';
        (new Sqlite(Config.dbName)).then((db) => {
            this.database = db;
            const checkTableQuery = distinctQuery;
            this.database.execSQL(checkTableQuery, [tableName])
                .then((resultset) => {
                    for (const row in resultset) {
                        if (resultset.hasOwnProperty('row')) {
                            return true;
                        }
                    }
                    return false;
                }, (error) => {
                    return false;
                });
            return false;
        });
    }
}
