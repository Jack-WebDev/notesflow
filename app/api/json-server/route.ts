import { NextRequest } from "next/server";
import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export const runtime = "nodejs";

export default async function handler(req: NextRequest) {
  const { method } = req;

  return new Promise((resolve, reject) => {
    const http = require("http");
    const reqNode = new http.IncomingMessage(req.body);
    const resNode = new http.ServerResponse(reqNode);

    resNode.on("finish", () => resolve(resNode));
    resNode.on("error", reject);

    server.emit("request", reqNode, resNode);
  });
}
