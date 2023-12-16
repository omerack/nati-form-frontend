import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65340d6ccbce662949d5");

export const account = new Account(client);

export default client;
