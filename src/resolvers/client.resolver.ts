import { UDPClient } from "../socket";
import { ClientView } from "../views/client.view";
import { ConnectionInfo } from "../views/View";

export default async function (argsv: AgrsValues) {
  const { port, address } = argsv;

  const socket = new UDPClient({ port, address });
  await socket.waitForBind();

  const view = new ClientView({ port, address }, socket.info as ConnectionInfo);

  socket.onListening(() => view.changeView("defineRequest"));

  socket.onMessage((msg, rinfo) =>
    view.changeView("getResponse", { msg, rinfo })
  );
}
