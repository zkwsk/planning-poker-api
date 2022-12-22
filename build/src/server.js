"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const node_fs_1 = require("node:fs");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs = (0, node_fs_1.readFileSync)('./src/schema.graphql', 'utf8');
(async () => {
    // Required logic for integrating with Express
    const app = (0, express_1.default)();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = (0, http_1.createServer)(app);
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/',
    });
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers: resolvers_1.default });
    const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new server_1.ApolloServer({
        schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    // Ensure we wait for our server to start
    await server.start();
    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use('/', (0, cors_1.default)(), body_parser_1.default.json(), 
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({
            token: req.headers.token,
            pubsub: new graphql_subscriptions_1.PubSub(),
        }),
    }));
    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log('🚀 Server ready at http://localhost:4000/');
})();
//# sourceMappingURL=server.js.map