import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DATABASE_URL);
console.log(process.env.DATABASE_NAME);
    let db;
    const client = new MongoClient(process.env.DATABASE_URL, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
    });
    await client.connect();
    db = client.db();

export {db};

