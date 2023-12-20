import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("658326692995762e6f54");

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
