import { RemoteInfo } from "dgram";

import { UDPServer } from "../socket";
import { ServerView } from "../views/server.view";

type requisitionType = "int" | "char" | "string"

export default function (argsv: AgrsValues) {
  const { port } = argsv;

  const server = new UDPServer({ port });
  const view = new ServerView(server);

  server.onMessage((msg: Buffer, rinfo: RemoteInfo) => {
    const { type, val } = JSON.parse(msg.toString());

    switch (type as requisitionType) {
      case "int":
        view.changeView("interger", { val, rinfo });

        break;
      case "char":
        view.changeView("oneCharacter", { val, rinfo });

        break;
      case "string":
        view.changeView("string", { val, rinfo });

        break;
      default:
        console.log(`"type"${type ? `: ${type} é` : ''} inválido`)
    }
  })
}
