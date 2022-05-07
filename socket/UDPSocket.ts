import { createSocket, RemoteInfo, Socket } from "dgram";

export type SocketContructOptions = {
  port?: number;
  onListening?: (udpSocket: Socket) => void;
};

export default class UDPSocket {
  private udpSocket: Socket;

  constructor(
    options: SocketContructOptions = {
      port: 3000,
      onListening: (udpSocket) => {},
    }
  ) {
    const { port, onListening } = options;
    this.udpSocket = createSocket("udp4");

    this.udpSocket.bind(
      port,
      "", // Listennig to all: 0.0.0.0
      onListening
        ? () => onListening(this.udpSocket)
        : (): void => {
            console.log(
              `listening on port ${port} at address ${
                this.udpSocket.address().address
              }`
            );
          }
    );
  }

  get socket() {
    return this.udpSocket;
  }

  onClose(listener: () => void) {
    this.udpSocket.on("close", listener);
  }

  onConnect(listener: () => void) {
    this.udpSocket.on("connect", listener);
  }

  onMessage(listener: (msg: Buffer, rinfo: RemoteInfo) => void) {
    this.udpSocket.on("message", listener);
  }

  onError(listener: (err: Error) => void) {
    this.udpSocket.on("error", listener);
  }

  onListening(listener: () => void) {
    this.udpSocket.on("listening", listener);
  }

  on(event: SocketEventsUDP, listener: (...args: any[]) => void) {
    this.udpSocket.on(event, listener);
  }
}
