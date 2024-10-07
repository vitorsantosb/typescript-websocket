import {MongoClient, Collection, Db, Document} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


console.log('mongodb: ', process.env.MONGO_URI);
const url: string = 'mongodb://mongo:mongo@localhost:27017/admin';

const client = new MongoClient(url);



interface IDatabase {
  db: Db | null;
  connection: MongoClient | null;
  collections: ICollections | null;
}

/**
 * @type {{collections: {[collection: string]: Collection}, connection: null, db: null}}
 */
const database: IDatabase = {
  db: null,
  connection: null,
  collections: null,
};

interface ICollections {
  users: Collection<Document>;
}

async function mountCollections(db: Db): Promise<ICollections> {
  return {
    users: db.collection('users'),
  };
}

type IDatabaseWithCollections = IDatabase & { collections: ICollections };

export async function GetDatabase(): Promise<IDatabaseWithCollections> {
  if (!database.connection) {
    database.connection = await client.connect();
    database.db = client.db('template_project');
    database.collections = await mountCollections(database.db);
  }
  return database as IDatabaseWithCollections;
}

export default { GetDatabase };
