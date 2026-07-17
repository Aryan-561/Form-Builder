import { publicProcedure, router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { procedureTypes } from "@trpc/server/dist/unstable-core-do-not-import.d-BXekdOPr.cjs";
import z from "zod";

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  test: publicProcedure
  .meta({ openapi: { method: "GET", path: "/test" } })
  .input(z.object({name:z.string()}))
  .output(z.object({name:z.string()}))
  .query(async({input})=>{
    return {
      name: input.name
    }
  })
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
