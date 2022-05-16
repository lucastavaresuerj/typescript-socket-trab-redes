import { RemoteInfo } from "dgram";

import { UDPServer } from "../socket";

type context = {
  val: string;
  rinfo: RemoteInfo;
  socket: UDPServer;
}

export default class ServerController {
  constructor() {}

  incrementInteger({ val, rinfo, socket }: context) {
    const { address, port } = rinfo as RemoteInfo
    const int = parseInt(val);

    socket.send((int + 1).toString(), { address, port });
  }

  toogleCase({ val, rinfo, socket }: context) {
    const { address, port } = rinfo as RemoteInfo;
    
    socket.send(/^[a-z]$/.test(val) ? val.toUpperCase() : val.toLowerCase() , { address, port });
  }

  
  revertString({ val, rinfo, socket }: context) {
    const { address, port } = rinfo as RemoteInfo;
    const reverted = Array.from(val).reverse().join('');
    
    socket.send(reverted , { address, port });
  }

}
