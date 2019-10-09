import db from 'mongoose';

db.Promise = global.Promise;

export async function connect(dbURI: string) {
  await db.connect(dbURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

export async function disconnect() {
  await db.disconnect();
}

export const connection = db.connection;
