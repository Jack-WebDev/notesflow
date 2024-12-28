import jsonServer from "json-server";
import path from "path";

// Set up JSON Server
const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Force Node.js runtime for compatibility
export const runtime = "nodejs";

// Handle HTTP methods
export async function GET(req: Request) {
  return new Response("GET is not supported on this endpoint.", {
    status: 405,
  });
}

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    const http = require("http");
    const { IncomingMessage, ServerResponse } = http;

    const reqNode = new IncomingMessage(req.body);
    const resNode = new ServerResponse(reqNode);

    resNode.on("finish", () => resolve(new Response(null, { status: 200 })));
    resNode.on("error", (err:any) => reject(err));

    server.emit("request", reqNode, resNode);
  });
}
