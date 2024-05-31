import { Hono } from "hono";
import { handle } from "hono/vercel"; // since we are deploying on vercel
import accounts from './accounts'
import { HTTPException } from "hono/http-exception";
import categories  from "./categories.ts";
import transactions from "./transactions.ts";
import summary from "./summary.ts";
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');
const routes = app
.route("/summary", summary)
.route("/accounts", accounts)
.route("/categories", categories)
.route("/transactions", transactions)
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;