import { NextRequest, NextResponse } from "next/server";

import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));

server.use(middlewares);
server.use(router);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handler = (req: NextRequest, res: NextResponse) => {
  server.emit("request", req, res);
};

export default handler;
