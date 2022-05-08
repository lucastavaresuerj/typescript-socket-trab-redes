import UDPSocket from "./UDPSocket";

export type SocketContructOptions = {
  port?: number;
  onListening?: () => void;
};

export default class UDPServer extends UDPSocket {
  constructor(options: SocketContructOptions) {
    super();

    const { port, onListening } = options;

    this.listen({ port }, onListening);
  }
}
