import { LMSDto } from './lms.dto';

export class LMS implements LMSDto {
  connected: boolean = false;
  name: string;
  id: number;
  url: string;
  user: string;
  password: string;
  service: string;
  token: string;
  autoconnect: boolean;

  constructor(
    id: number,
    name: string,
    url: string,
    user: string,
    password: string,
    service: string,
    autoconnect: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.user = user;
    this.password = password;
    this.service = service;
    this.autoconnect = autoconnect;
  }
  connect(): boolean {
    if (this.autoconnect == false) {
      console.log(`${this.url} autconnect = false`);
      return false;
    }

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
        this.connected = true;
        this.token = res.token;
      })
      .catch((error: Error) => {
        this.connected = false;
        console.log(`${this.url} error`);
        console.log(error);
      });

    return false;
  }
}
