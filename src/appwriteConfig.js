import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65340d6ccbce662949d5");

export const account = new Account(client);

export default client;

// const promise = account.createEmailSession('email@example.com', 'password');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
