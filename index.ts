import { UDPServer, UDPSocket } from "./socket";

const udpServer = new UDPServer({ port: 3000 });
const udpSocket = new UDPSocket();

udpSocket.send("hi", { port: 3000, address: "127.0.0.1" });

setTimeout(() => {
  udpSocket.send("hey", { port: 3000, address: "127.0.0.1" });
}, 2000);
