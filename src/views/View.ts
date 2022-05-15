import EventEmitter from "events";

export type ConnectionInfo = {
  port: number;
  address: string;
};

export class View<ViewEvents extends string> {
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
  }

  onView(event: ViewEvents, callback: (context: any) => void) {
    this.viewState.on(event, (context) => {
      callback(context);
    });
  }

  changeView(event: ViewEvents, context?: any) {
    this.addClientContext(context);
    this.viewState.emit(event, context);
  }

  private addClientContext(context: any): void {
    context.connectionInfo = this.connectionInfo;
  }
}
