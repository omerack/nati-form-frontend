import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65832df4121d8a697255");

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
