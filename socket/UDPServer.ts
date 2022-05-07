import { RemoteInfo } from "dgram";
import UDPSocket, { SocketContructOptions } from "./UDPSocket";

export default class UDPServer extends UDPSocket {
  constructor(
    options: SocketContructOptions = {
      port: 3000,
      onListening: (udpSocket) => {},
    }
  ) {
    super({
      port: options?.port,
      onListening:
        options.onListening ||
        ((socket) => {
          console.log(`Server listening at port ${socket.address().port}`);
        }),
    });

    super.onMessage((msg: Buffer, rinfo: RemoteInfo) => {
      console.log("Recive a message", msg.toString());
    });
  }
}
