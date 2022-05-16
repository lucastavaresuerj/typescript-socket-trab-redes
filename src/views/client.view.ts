import ClientController from "../controllers/client.controller";
import { UDPSocket } from "../socket";
import { View } from "./View";

export type ClientViewEvent = "defineRequest" | "getResponse"

const clientController = new ClientController();

export class ClientView extends View<ClientViewEvent> {
  constructor(socket: UDPSocket) {
    super(socket);

    this.onView("defineRequest", clientController.defineRequest);
    this.onView("getResponse", clientController.getResponse);

  }
}
