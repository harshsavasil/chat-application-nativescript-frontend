export class Config {
    static apiUrl = 'http://192.168.1.109:8000/';
    static defaultYear = 1995;
    static savePushTokenUrl = 'save_push_token/';
    static fcmSenderID = '182779581564';
    static messagesTableCreationQuery = `
        CREATE TABLE IF NOT EXISTS messages
        (   id INTEGER PRIMARY KEY AUTOINCREMENT,
            messageText TEXT,
            sender INTEGER,
            sentTime FLOAT,
            deliveredTime FLOAT,
            readTime FLOAT,
            createdTime FLOAT,
            sent INTEGER,
            contact TEXT,
            messageId TEXT
        )`;
    static contactsTableCreationQuery = `
        CREATE TABLE IF NOT EXISTS contacts
        (   number TEXT PRIMARY KEY,
            name TEXT,
            avatar TEXT,
            text TEXT,
            type TEXT,
            muted INTEGER,
            lastSeen FLOAT,
            unread INTEGER,
            last_message_timestamp FLOAT
        )`;
    static contactTableName = 'contacts';
    static messageTableName = 'messages';
    static dbName = 'chat.db';
}
