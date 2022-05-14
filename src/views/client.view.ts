import EventEmitter from "events";

import ClientController from "../controllers/client.controller";

export type ClientViewEvent = "defineRequest" | "getResponse" | "testEmit";

export type ConnectionInfo = {
  port: number;
  address: string;
};

export class ClientView {
  viewState = new EventEmitter();
  connectionInfo!: {
    server: ConnectionInfo;
    client: ConnectionInfo;
  };

  constructor(serverInfo: ConnectionInfo, clientInfo: ConnectionInfo) {
    this.connectionInfo = {
      server: serverInfo,
      client: clientInfo,
    };

    this.on("defineRequest", ClientController.defineRequest);
    this.on("getResponse", ClientController.getResponse);
    this.on("testEmit", ClientController.test);
  }

  on(event: ClientViewEvent, callback: (context: any) => void) {
    this.viewState.on(event, (context) => {
      callback(context);
    });
  }

  emit(event: ClientViewEvent, context?: any) {
    this.addClientContext(context);
    this.viewState.emit(event, context);
  }

  private addClientContext(context: any): void {
    context.connectionInfo = this.connectionInfo;
  }
}
