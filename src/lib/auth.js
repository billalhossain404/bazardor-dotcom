import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BATTER_AUTH_DB_URL);
const db = client.db("bazar_dor");

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders:{
    google: { 
            clientId: process.env.BATTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BATTER_AUTH_GOOGLE_SECTER
        }, 
        github:{
          clientId: process.env.BATTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BATTER_AUTH_GITHUB_SECTER
        }
  },
  database: mongodbAdapter(db, {
    client,
  }),
});