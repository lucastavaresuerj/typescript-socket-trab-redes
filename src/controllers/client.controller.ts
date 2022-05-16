import { createInterface } from "readline";
import { UDPClient } from "../socket";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class ClientController {
  constructor() {}
  timer!: Date;

  defineRequest({ socket }: {socket: UDPClient}): void {
    readline.question('O que quer enviar?', (answer: string) => {
      if (/-?\d+/.test(answer)) {
        socket.send(JSON.stringify({ type: 'int', val: answer }))

      } else if (/^[A-z]$/.test(answer)) {
        socket.send(JSON.stringify({ type: 'char', val: answer }))

      } else {
        socket.send(JSON.stringify({ type: 'string', val: answer }))

      }

      this.time  = new Date()
    })
  }

  getResponse({ msg, rinfo }: any): void {
    console.log(`Rtt: ${this.rtt}`);
  }


  private get rtt() {
    return ((new Date()).getTime() - this.timer.getTime()) / 1000;
  }

  private set time(timeStamp: Date) {
    this.timer = timeStamp;
  }
}
