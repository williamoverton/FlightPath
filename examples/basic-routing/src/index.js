import { Router } from "../../../dist/index.js";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { schema } from "./schema";

const router = new Router();

router.route("*", "/graphql", async (req, res) => {
  let body = {};

  try {
    const raw = await req.text();
    body = JSON.parse(raw);
  } catch (e) {}

  const request = {
    body: body,
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL());
  } else {
    // Extract the Graphql parameters from the request
    const { operationName, query, variables } = getGraphQLParameters(request);

    // Validate and execute the query
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    sendResult(result, res);
  }
});

/**
 * Run a route so the default handler doesnt throw a 404
 */
router.route("*", "*", (req, res) => {
  res.status = 404
  res.send("Page Not Found")
});

router.listen();
