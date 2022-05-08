import { UDPClient, UDPServer } from "./socket";

const udpServer = new UDPServer({ port: 3000 });
const udpClient = new UDPClient();

udpClient.send("hi");

setTimeout(() => {
  udpClient.send("hey");
}, 2000);
