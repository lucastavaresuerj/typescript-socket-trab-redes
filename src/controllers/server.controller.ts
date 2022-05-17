import { RemoteInfo } from "dgram";

import { UDPServer } from "../socket";

type context = {
  val: string;
  rinfo: RemoteInfo;
  socket: UDPServer;
  type: string;
};

export default class ServerController {
  constructor() {}

  incrementInteger({ val, rinfo, type, socket }: context) {
    const { address, port } = rinfo;
    const int = parseInt(val);
    const result = { type, val: (int + 1).toString() };

    socket.sendJSON(result, { address, port });
  }

  toogleCase({ val, rinfo, type, socket }: context) {
    const { address, port } = rinfo;
    const caseToogled = /^[a-z]$/.test(val)
      ? val.toUpperCase()
      : val.toLowerCase();

    const result = { type, val: caseToogled };

    socket.sendJSON(result, { address, port });
  }

  revertString({ val, rinfo, type, socket }: context) {
    const { address, port } = rinfo;
    const reverted = Array.from(val).reverse().join("");
    const result = { type, val: reverted };

    socket.sendJSON(result, { address, port });
  }
}
