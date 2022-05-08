import { UDPServer } from "../socket";

export default function (argsv: AgrsValues) {
  const { port } = argsv;

  new UDPServer({ port });
}
