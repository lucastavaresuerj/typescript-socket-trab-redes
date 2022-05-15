import EventEmitter from "events";

import { UDPSocket } from "../socket";

export type ConnectionInfo = {
  port: number;
  address: string;
};

export class View<ViewEvents extends string> {
  viewState = new EventEmitter();

  constructor(private socket: UDPSocket) {}

  onView(event: ViewEvents, callback: (context: any) => void) {
    this.viewState.on(event, (context) => {
      callback(context);
    });
  }

  changeView(event: ViewEvents, context: any = {}) {
    this.addClientContext(context);
    this.viewState.emit(event, context);
  }

  private addClientContext(context: any): void {
    // context.connectionInfo = this.connectionInfo;
    context.socket = this.socket;
  }
}
