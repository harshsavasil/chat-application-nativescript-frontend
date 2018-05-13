import { Injectable } from '@angular/core';
import { Config } from './index';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');

@Injectable()
export class DataBaseService {
    private database: any;
    private unsentMessages: any;
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
            // tslint:disable-next-line:max-line-length
            db.execSQL(Config.contactsTableCreationQuery).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('Contacts TABLE CREATED SUCCESSFULLY');
                db.close();
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
            // tslint:disable-next-line:max-line-length
            db.execSQL(Config.messagesTableCreationQuery).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('Messages TABLE CREATED SUCCESSFULLY', id);
                db.close();
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
    insertIntoChats(chat) {
        const insertQuery = `
          INSERT INTO contacts
          ( number, name, avatar, text, type, muted,
            lastSeen, unread, last_message_timestamp )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const updateQuery = `
          UPDATE contacts
          SET number = ?, name = ?,
          avatar =?, text = ?, type = ?, muted = ?, lastSeen = ?, unread = ?,
          last_message_timestamp = ?
          WHERE number = ?
        `;
        const insertJSON = [];
        insertJSON.push(chat.number);
        insertJSON.push(chat.contact.name);
        insertJSON.push(chat.contact.avatar);
        insertJSON.push(chat.text);
        insertJSON.push(chat.type);
        insertJSON.push(chat.muted);
        insertJSON.push(chat.when);
        insertJSON.push(chat.unread);
        insertJSON.push(chat.last_message_timestamp);
        (new Sqlite(Config.dbName)).then((db) => {
            db.execSQL(insertQuery, insertJSON).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT RESULT', id);
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT ERROR', error);
                const updateJSON = insertJSON;
                updateJSON.push(chat.number);
                this.database.execSQL(updateQuery, updateJSON).then((id) => {
                    // tslint:disable-next-line:no-console
                    console.log('UPDATE RESULT Chats', id);
                }, (err) => {
                    // tslint:disable-next-line:no-console
                    console.log('UPDATE ERROR', err);
                });
            });
            db.close();
        });
    }
    insertIntoMessages(message) {
        const insertQuery = `
            INSERT INTO messages
            ( messageText, sender, createdTime, sent, contact)
            VALUES (?, ?, ?, ?, ?)`;
        // tslint:disable-next-line:max-line-length
        const insertJSON = [];
        insertJSON.push(message.text);
        insertJSON.push(parseInt(message.sender, 10));
        insertJSON.push(parseFloat(message.created));
        insertJSON.push(parseInt(message.sent, 10));
        insertJSON.push(message.contact);
        (new Sqlite(Config.dbName)).then((db) => {
            db.execSQL(insertQuery, insertJSON).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT MEssage RESULT', id);
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT ERROR', error);
            });
            db.close();
        });
    }
    insertReceivedMessages(message) {
        const insertQuery = `
            INSERT INTO messages
            ( messageText, sender, createdTime, sent, contact, messageId)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const insertJSON = [];
        insertJSON.push(message.text);
        insertJSON.push(parseInt(message.sender, 10));
        insertJSON.push(parseFloat(message.created));
        insertJSON.push(parseInt(message.sent, 10));
        insertJSON.push(message.contact);
        insertJSON.push(message.message_id);
        (new Sqlite(Config.dbName)).then((db) => {
            db.execSQL(insertQuery, insertJSON).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT MEssage RESULT', id);
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT ERROR', error);
            });
            db.close();
        });
    }
    checkIfMessageExists(messageId) {
        const insertQuery = `
            SELECT * FROM messages
            WHERE messageId = ?`;
        (new Sqlite(Config.dbName)).then((db) => {
            db.all(insertQuery, [messageId]).then((rows) => {
                if (rows.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT ERROR', error);
            });
            db.close();
        });
    }
    insertIntoMessagesWithMessageId(message) {
        const insertQuery = `
            INSERT INTO messages
            ( messageText, sender, createdTime, sent, contact, messageId)
            VALUES (?, ?, ?, ?, ?, ?)`;
        // tslint:disable-next-line:max-line-length
        const insertJSON = [];
        insertJSON.push(message.text);
        insertJSON.push(parseInt(message.sender, 10));
        insertJSON.push(parseFloat(message.created));
        insertJSON.push(parseInt(message.sent, 10));
        insertJSON.push(message.contact);
        insertJSON.push(message.message_id);
        (new Sqlite(Config.dbName)).then((db) => {
            db.execSQL(insertQuery, insertJSON).then((id) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT MEssage RESULT', id);
            }, (error) => {
                // tslint:disable-next-line:no-console
                console.log('INSERT ERROR', error);
            });
            db.close();
        });
    }
    updateStatusOfMessage(status, id) {
        (new Sqlite(Config.dbName)).then((db) => {
            const updateQuery = `
                UPDATE messages
                SET sent = ?
                WHERE id = ?`;
            const updateJSON = [];
            updateJSON.push(status);
            updateJSON.push(id);
            db.execSQL(updateQuery, updateJSON).then((uniqid) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE SENT STATUS OF MESSAGES', uniqid);
            }, (err) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE ERROR', err);
            });
            db.close();
        });
    }
    updateSentTimeOfMessage(sentTime, id) {
        (new Sqlite(Config.dbName)).then((db) => {
            const updateQuery = `
                UPDATE messages
                SET sentTime = ?
                WHERE id = ?`;
            const updateJSON = [];
            updateJSON.push(sentTime);
            updateJSON.push(id);
            db.execSQL(updateQuery, updateJSON).then((uniqid) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE SENT STATUS OF MESSAGES', uniqid);
            }, (err) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE ERROR', err);
            });
            db.close();
        });
    }
    updateDeliveryTimeOfMessage(deliveryTime, id) {
        (new Sqlite(Config.dbName)).then((db) => {
            const updateQuery = `
                UPDATE messages
                SET deliveredTime = ?
                WHERE id = ?`;
            const updateJSON = [];
            updateJSON.push(deliveryTime);
            updateJSON.push(id);
            db.execSQL(updateQuery, updateJSON).then((uniqid) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE SENT STATUS OF MESSAGES', uniqid);
            }, (err) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE ERROR', err);
            });
            db.close();
        });
    }
    updateMessaeIdOfMessage(messageId, id) {
        (new Sqlite(Config.dbName)).then((db) => {
            const updateQuery = `
                UPDATE messages
                SET messageId = ?
                WHERE id = ?`;
            const updateJSON = [];
            updateJSON.push(messageId);
            updateJSON.push(id);
            db.execSQL(updateQuery, updateJSON).then((uniqid) => {
                // tslint:disable-next-line:no-console
                console.log('Message Id Updated OF MESSAGE', uniqid);
            }, (err) => {
                // tslint:disable-next-line:no-console
                console.log('UPDATE ERROR', err);
            });
            db.close();
        });
    }
}
