import { graphqlHandler } from "./graphql.js";
import { Router } from "./router/index.js";
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import { schema } from "./schema";

const router = new Router();

router.use((req, res) => {
  res.headers.set("x-powered-by", "FlightPath")
})

// router.use(graphqlHandler);

router.route("GET", "/", (req, res) => {
  return res.send("Home");
});

router.get("/puppies", async (req, res) => {
  res.headers.set("x-testing", "It works!");
  return res.send("You're at the puppy page!");
});

router.get("/greeting/:name", async (req, res) => {
  return res.send(`Hello ${req.params.name}!`);
});

router.get("/assets/*", async (req, res) => {
  return res.send("This is where the assets would be!");
});

router.get("/graphql", async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  console.log("shouldRenderGraphiQL");
  return res.send(renderGraphiQL());
});

router.post("/graphql", async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };
  const { operationName, query, variables } = getGraphQLParameters(request);

  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
  });
  console.log("result");
  console.log(JSON.stringify(result));

  return sendResult(result, res);
});
/**
 * This must be last! Catch anything we dont handle and return a 404
 */
router.route("*", "*", (req, res) => {
  res.status = 404;
  return res.send("Page not found!");
});

router.listen();
