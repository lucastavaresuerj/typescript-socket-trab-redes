import ServerController from "../controllers/server.controller";
import { UDPSocket } from "../socket";
import { View } from "./View";

export type ServerViewEvent = "interger" | "oneCharacter" | "string"

const serverController = new ServerController();

export class ServerView extends View<ServerViewEvent> {
  constructor(socket: UDPSocket) {
    super(socket);

    this.onView("interger", serverController.incrementInteger);
    this.onView("oneCharacter", serverController.toogleCase);
    this.onView("string", serverController.revertString);

  }
}
