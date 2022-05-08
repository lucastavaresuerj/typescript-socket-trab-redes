import { options } from "yargs";

import { server, client } from "./resolvers";

const resolvers = {
  client: client,
  server: server,
};

async function createOption() {
  const argv = await options({
    t: { choice: ["client", "server"], alias: "type", default: "server" },
    p: { type: "number", alias: "port", default: 3000 },
    a: { type: "string", alias: "address", default: "127.0.0.1" },
  }).argv;

  resolvers[argv.t as keyof typeof resolvers];
}

createOption();

// console.log(argsv.argv);
