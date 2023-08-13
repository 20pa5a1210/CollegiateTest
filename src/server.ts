import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import resolvers from "./Resolvers/resolver";
import { typeDefs } from "./Schema/typedefs";

const startServer = async () => {

    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at ${url}`);
}

startServer();