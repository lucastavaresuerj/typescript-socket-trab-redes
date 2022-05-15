import EventEmitter from "events";

import { UDPSocket } from "../socket";

export type ConnectionInfo = {
  port: number;
  address: string;
};

export class View<ViewEvents extends string> {
  viewState = new EventEmitter();
  context = {};

  constructor(private socket: UDPSocket) {
    this.context = { socket: this.socket };
  }

  onView(event: ViewEvents, callback: (context: any) => void) {
    this.viewState.on(event, (context) => {
      callback(context);
    });
  }

  changeView(event: ViewEvents, context: any = {}) {
    this.addClientContext(context);
    this.viewState.emit(event, context);
  }

  addToContext(name: string, context: any) {
    this.context = { ...this.context, [name]: context };
  }

  private addClientContext(context: any): void {
    context = { context, ...this.context };
  }
}
