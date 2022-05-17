import ClientController from "../controllers/client.controller";
import { UDPSocket } from "../socket";
import { View } from "./View";

export type ClientViewEvent = "defineRequest" | "getResponse";

export class ClientView extends View<ClientViewEvent> {
  clientController = new ClientController();

  constructor(socket: UDPSocket) {
    super(socket);

    this.onView("defineRequest", this.clientController.defineRequest);
    this.onView("getResponse", this.clientController.getResponse);
  }
}
