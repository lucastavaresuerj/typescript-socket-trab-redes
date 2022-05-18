# Install

Install by typing: `npm install`

# Execution

## Server

Run by typing: `npm run start:server`

It is a shortcut for `npx ts-node src/index.ts --type=server --port=3000`

Where:

- `port` is the port the server will listen
- `type` if is server or client

You can also define the port when calling the `npm start`, for example: `npm start -- --type=server --port=5000`

## Client

Run by typing: `npm run start:client`

It is a shortcut for `npx ts-node src/index.ts --type=client --port=3000`

Where:

- `port` is the port client will connect to server
- `type` if is server or client

Where:

- `port` is the port the server will listen
- `type` if is server or client

You can also define the port when calling the `npm start`, for example: `npm start -- --type=client --port=5000`
