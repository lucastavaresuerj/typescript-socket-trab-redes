import UDPSocket from "./UDPSocket";

type SocketContructOptions = {
  port?: number;
  onListening?: () => void;
};

export default class UDPServer extends UDPSocket {
  constructor(options: SocketContructOptions) {
    super();

    const { port, onListening } = options;

    this.listen({ port }, onListening);
  }

  send(message: string, { address, port }: {address: string, port: number}): void {
    console.log(`Sending to ${address}:${port}: ${message}`)
    super.send(message, { address, port });
  }
}
