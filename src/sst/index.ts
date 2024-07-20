import { Hono } from "hono";
import { database } from "../../db";
import { notes } from "../../db/schema";
import { eq, lt, gte, ne } from 'drizzle-orm';
import { Resource } from 'sst';
import { createMiddleware } from 'hono/factory'


import CounterWorker from "../../counter";

/*export interface Env {
    COUNTERS: DurableObjectNamespace<Counter>;
}*/

type Env = {
    Bindings: {
      DURABLE_OBJECTS_COUNTER: Service<CounterWorker>
    }
  }


const app = new Hono<Env>();

/*const durableObjectMiddleware = createMiddleware<Env>(async (c, next) => {
    
    c.set('stub', stub)
    await next()
    c.res = c.text(`Durable Object '${name}' count: ${c.var.count}`)
})*/

app.get("/", async (c) => {
    const db = database(Resource.MyDatabase);
    const result = await db.select().from(notes);

    console.log(result);

    c.header("content-type", "application/json");
    return c.body(JSON.stringify(result));
})

app.post("/", async (c) => {
    const db = database(Resource.MyDatabase);
    const body = await c.req.json();
    console.log(body);
    const result = await db.insert(notes).values({
        content: body.content
    });
    return c.body(JSON.stringify(result));
})

app.get("/notes/:id", async (c) => {
    const db = database(Resource.MyDatabase);
    const id = c.req.param("id");
    const result = await db.select().from(notes).where(eq(notes.id, parseInt(id)));
    return c.body(JSON.stringify(result));
})

app.get('/hello', async (c) => {
    return c.body(JSON.stringify('hello'));
})


app.get("/increment", async (c) => {

    const name = c.req.query('name')
    if (!name) {
      return c.text(
        'Select a Durable Object to contact by using the `name` URL query string parameter, for example, ?name=A'
      )
    }

    console.log(c.env);

    const count = await c.env.DURABLE_OBJECTS_COUNTER.increment(name);

    return c.body(JSON.stringify(count));
});

app.get("/decrement", async (c) => {
    const name = c.req.query('name')
    if (!name) {
      return c.text(
        'Select a Durable Object to contact by using the `name` URL query string parameter, for example, ?name=A'
      )
    }   
    const count = await c.env.DURABLE_OBJECTS_COUNTER.decrement(name);
    return c.body(JSON.stringify(count));
})

app.get("/count", async (c) => {
    const name = c.req.query('name')
    if (!name) {
      return c.text(
        'Select a Durable Object to contact by using the `name` URL query string parameter, for example, ?name=A'
      )
    }
    const count = await c.env.DURABLE_OBJECTS_COUNTER.getCounterValue(name);

    return c.body(JSON.stringify(count));
})

export default app;