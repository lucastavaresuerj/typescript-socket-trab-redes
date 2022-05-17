import { RemoteInfo } from "dgram";

import { createInterface } from "readline";
import { UDPClient } from "../socket";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

type message = {
  type: string;
  val: string | number;
};

type reponse = {
  msg: message;
  rinfo?: RemoteInfo;
};

export default class ClientController {
  private _time!: Date;

  constructor() {
    this.defineRequest = this.defineRequest.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.time = new Date();
  }

  public defineRequest({ socket }: { socket: UDPClient }) {
    readline.question("O que quer enviar? ", (answer: string) => {
      const request: message = { val: answer, type: "" };
      if (/-?\d+/.test(answer)) {
        request.type = "int";
      } else if (/^[A-z]$/.test(answer)) {
        request.type = "char";
      } else {
        request.type = "string";
      }
      socket.sendJSON(request);
    });
    this.time = new Date();
  }

  public getResponse({ msg: { val } }: reponse) {
    console.log(`Rtt: ${this.rtt} ms`);
    console.log(`Resultado da requisição: ${val}\n`);
  }

  private get rtt() {
    return (new Date().getTime() - this._time.getTime()) / 1000;
  }

  private set time(timeStamp: Date) {
    this._time = timeStamp;
  }
}
