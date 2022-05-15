import { createSocket, RemoteInfo, Socket, BindOptions } from "dgram";
import { EventEmitter } from "stream";

export type ListenerOptions = {
  removeListenersBefore?: boolean;
  prependListener?: boolean;
};

export default class UDPSocket {
  protected udpSocket: Socket;
  private isBind = false;

  constructor() {
    this.udpSocket = createSocket("udp4");

    this.onMessage((msg: Buffer, { address, port }: RemoteInfo) => {
      console.log(`${address}:${port} >> ${msg.toString("utf8")}`);
    });

    this.udpSocket.on("listening", () => {
      this.isBind = true;
      console.log("listening");
    });
  }

  listen(
    bindOptions: BindOptions = { port: undefined, address: "0.0.0.0" },
    listener?: () => void
  ) {
    this.udpSocket.bind(bindOptions);
    if (listener) {
      this.onListening(listener);
    } else {
      this.onListening((): void => {
        console.log(
          `listening on 127.0.0.1:${bindOptions.port} to address ${
            this.udpSocket.address().address
          }`
        );
      });
    }
  }

  send(message: string, { address = "localhost", port = 5000 }): void {
    this.udpSocket.send(Buffer.from(message), port, address);
  }

  onClose(listener: () => void, listenerOptions?: ListenerOptions): void {
    this.setListenersOptions("close", listener, { ...listenerOptions });
  }

  onConnect(listener: () => void, listenerOptions?: ListenerOptions): void {
    this.setListenersOptions("connect", listener, { ...listenerOptions });
  }

  onMessage(
    listener: (msg: Buffer, rinfo: RemoteInfo) => void,
    listenerOptions?: ListenerOptions
  ): void {
    this.setListenersOptions("message", listener, { ...listenerOptions });
  }

  onError(
    listener: (err: Error) => void,
    listenerOptions?: ListenerOptions
  ): void {
    this.setListenersOptions("error", listener, { ...listenerOptions });
  }

  onListening(listener: () => void, listenerOptions?: ListenerOptions): void {
    this.setListenersOptions("listening", listener, { ...listenerOptions });
  }

  onEvent(event: SocketEventsUDP, listener: (...args: any[]) => void): void {
    this.udpSocket.on(event, listener);
  }

  private setListenersOptions(
    event: SocketEventsUDP,
    listener: (...args: any[]) => void,
    { removeListenersBefore = false, prependListener = false }: ListenerOptions
  ) {
    const eventEmitter = this.udpSocket as EventEmitter;
    if (removeListenersBefore) {
      eventEmitter.removeAllListeners(event);
    }
    if (prependListener) {
      eventEmitter.prependListener(event, listener);
    } else {
      eventEmitter.addListener(event, listener);
    }
  }

  get info() {
    try {
      return this.udpSocket.address();
    } catch (error) {
      console.error("Socket unbound", error);
      return null;
    }
  }

  waitForBind(timeout: number = 3000): Promise<void> {
    return new Promise((resolve, reject) => {
      const rejectTimeout = setTimeout(reject, timeout);
      while (!this.isBind) {}
      clearTimeout(rejectTimeout);
      resolve();
    });
  }
}
