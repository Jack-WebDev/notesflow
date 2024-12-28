import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export const runtime = "nodejs";

export async function POST(req: Request) {
  return new Promise<Response>((resolve, reject) => {
    const http = require("http");
    const { IncomingMessage, ServerResponse } = http;

    const reqNode = new IncomingMessage(null);
    const resNode = new ServerResponse(reqNode);

    resNode.on("finish", () => {
      resolve(new Response("Request handled successfully", { status: 200 }));
    });

    resNode.on("error", (err: Error) => {
      reject(new Response(`Error: ${err.message}`, { status: 500 }));
    });

    server.emit("request", reqNode, resNode);
  });
}
