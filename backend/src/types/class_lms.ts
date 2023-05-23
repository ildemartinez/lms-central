import { ILMS } from './interfaces';

export class LMS implements ILMS {
  connected: boolean = false;
  id: string;
  url: string;
  user: string;
  password: string;
  service: string;
  token: string;

  constructor(
    id: string,
    url: string,
    user: string,
    password: string,
    service: string,
  ) {
    this.id = id;
    this.url = url;
    this.user = user;
    this.password = password;
    this.service = service;
  }
  connect(): boolean {
    const myFetch = `${this.url}/login/token.php?username=${this.user}&password=${this.password}&service=${this.service}`;

    console.log(`Trying to connect ${this.url}`);

    fetch(myFetch)
      // the JSON body is taken from the response
      .then((res) => res.json())
      .then((res) => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        //return res as User[]
        console.log(`${this.url} connected`);
        this.token = res.token;
      })
      .catch((error: Error) => {
        console.log(`${this.url} error`);
        console.log(error);
      });

    return false;
  }
}
