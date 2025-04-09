import { Hono } from "hono";
import { Effect } from "effect";

const app = new Hono<{ Bindings: Env }>();

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b);

app.get("/api/", async (c) => {
  const { a, b } = c.req.query();

  if (!a || !b) {
    return c.json({ error: "Both 'a' and 'b' parameters are required" }, 400);
  }

  const parsedA = Number(a);
  const parsedB = Number(b);

  if (isNaN(parsedA) || isNaN(parsedB)) {
    return c.json({ error: "Parameters must be valid numbers" }, 400);
  }

  const result = Effect.runSync(divide(parsedA, parsedB));

  return c.json({ result });
});

export default app;
