import { RemoteInfo } from "dgram";
import UDPSocket, { ListenerOptions } from "./UDPSocket";

export default class UDPClient extends UDPSocket {
  constructor(private serverInfo = { port: 3000, address: "127.0.0.1" }) {
    super();
  }

  send(message: string) {
    super.send(message, this.serverInfo);
  }

  sendJSON(message: any) {
    super.sendJSON(message, this.serverInfo);
  }
}
