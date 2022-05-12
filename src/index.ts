import { server, client } from "./resolvers";
import CLI from "./CLI";

const resolvers = {
  client: client,
  server: server,
};

async function createOption() {
  const { argv } = new CLI({
    t: { choice: ["client", "server"], alias: "type", default: "server" },
    p: { type: "number", alias: "port", default: 3000 },
    a: { type: "string", alias: "address", default: "127.0.0.1" },
  });

  resolvers[argv.t as keyof typeof resolvers];
  console.log(argv);
}

createOption();

// console.log(argsv.argv);
