import { UDPClient } from "../socket";

export default function (argsv: AgrsValues) {
  const { port, address } = argsv;

  new UDPClient({ port, address });
}
