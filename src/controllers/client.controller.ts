import { createInterface } from "readline";
import { UDPClient } from "../socket";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class ClientController {
  constructor() {}
  timer!: Date;

  defineRequest(context: any): void {}

  getResponse(context: any): void {
    console.log(context);
  }

  test(context: any): void {
    (context.socket as UDPClient).send("hy");
    console.log("aqui");
  }

  private get rtt() {
    return;
  }

  private set time(timeStamp: Date) {
    this.timer = timeStamp;
  }
}
