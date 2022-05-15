import ClientController from "../controllers/client.controller";
import { View, ConnectionInfo } from "./View";

export type ClientViewEvent = "defineRequest" | "getResponse" | "testEmit";

export class ClientView extends View<ClientViewEvent> {
  constructor(serverInfo: ConnectionInfo, clientInfo: ConnectionInfo) {
    super(serverInfo, clientInfo);
    this.connectionInfo = {
      server: serverInfo,
      client: clientInfo,
    };

    this.onView("defineRequest", ClientController.defineRequest);
    this.onView("getResponse", ClientController.getResponse);
    this.onView("testEmit", ClientController.test);
  }
}
