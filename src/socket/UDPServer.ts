import UDPSocket from "./UDPSocket";

type SocketContructOptions = {
  port?: number;
  onListening?: () => void;
};

type destination = {
  address: string;
  port: number;
};

export default class UDPServer extends UDPSocket {
  constructor(options: SocketContructOptions) {
    super();

    const { port, onListening } = options;

    this.listen({ port }, onListening);
  }

  send(message: string, { address, port }: destination): void {
    console.log(`Sending to ${address}:${port}: ${message}`);
    super.send(message, { address, port });
  }

  sendJSON(message: any = {}, { address, port }: destination) {
    const stringfiedMessage = JSON.stringify(message);

    console.log(`Sending to ${address}:${port}: "${stringfiedMessage}"`);
    super.send(stringfiedMessage, { address, port });
  }
}
