import UDPSocket from "./UDPSocket";

export default class UDPClient extends UDPSocket {
  constructor(private serverInfo = { port: 3000, address: "127.0.0.1" }) {
    super();

    this.udpSocket.bind({ port: 0, address: serverInfo.address });
    // console.log("aqui");
    // this.udpSocket.send
  }

  send(message: string) {
    super.send(message, this.serverInfo);
  }
}
