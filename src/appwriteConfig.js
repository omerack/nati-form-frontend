import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65832df4121d8a697255");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
