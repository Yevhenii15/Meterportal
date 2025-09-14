import { defineEventHandler, getHeader, createError, H3Event } from "h3";
import jwt from "jsonwebtoken";

// Extend H3EventContext to include user
declare module "h3" {
  interface H3EventContext {
    user?: { id: string; username: string };
  }
}

export const verifyAuth = (handler: (event: H3Event) => Promise<any>) =>
  defineEventHandler(async (event: H3Event) => {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "supersecret"
      ) as { id: string; username: string };

      event.context.user = decoded; // typed
      return handler(event);
    } catch (err) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid or expired token",
      });
    }
  });
