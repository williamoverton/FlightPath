import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import { schema } from "./schema";

export const graphqlHandler = async (req, res) => {
    const url = new URL(req.url);
    if (url.pathname === "/graphql") {
        console.log("Graphql");
        const request = {
            body: req.body,
            headers: req.headers,
            method: req.method,
            query: req.query,
        };

        if (shouldRenderGraphiQL(request)) {
            console.log("shouldRenderGraphiQL");
            return res.send(renderGraphiQL());
        } else {
            const { operationName, query, variables } = getGraphQLParameters(request);

            const result = await processRequest({
                operationName,
                query,
                variables,
                request,
                schema,
            });
            console.log("result");
            console.log(result);

            return sendResult(result, res);
        }
    }
}