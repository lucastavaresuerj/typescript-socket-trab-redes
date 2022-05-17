import { UDPClient } from "../socket";
import { ClientView } from "../views/client.view";

export default async function (argsv: AgrsValues) {
  const { port, address } = argsv;

  const socket = new UDPClient({ port, address });

  const view = new ClientView(socket);

  view.changeView("defineRequest");

  socket.onMessage((msg, rinfo) => {
    view.changeView("getResponse", {
      msg: JSON.parse(msg.toString("utf-8")),
      rinfo,
    });

    view.changeView("defineRequest");
  });
}
