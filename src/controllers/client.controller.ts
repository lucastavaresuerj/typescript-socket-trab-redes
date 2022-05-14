import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class ClientController {
  constructor() {}

  static defineRequest(context: any): void {}

  static getResponse(context: any): void {
    console.log(context);
  }

  static test(context: any): void {
    console.log(context);
  }
}
