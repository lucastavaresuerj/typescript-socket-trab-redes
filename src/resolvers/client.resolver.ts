import { UDPClient } from "../socket";
import { ClientView, ConnectionInfo } from "../views/client.view";

export default async function (argsv: AgrsValues) {
  const { port, address } = argsv;

  const socket = new UDPClient({ port, address });
  await socket.waitForBind();
  const view = new ClientView({ port, address }, socket.info as ConnectionInfo);

  view.emit("testEmit", { msg: "hey" });

  socket.onListening(() => view.emit("defineRequest"));

  socket.onMessage((msg, rinfo) => view.emit("getResponse", { msg, rinfo }));
}
