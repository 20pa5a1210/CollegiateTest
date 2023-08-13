import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import resolvers from "./Resolvers/resolver";
import { typeDefs } from "./Schema/typedefs";
import { pool } from "./db/db";
import { StudentApi } from "./db/utils/StudentApi";

export interface MyContext {
    dataSources: {
        studentApi: StudentApi
    }
}

const startServer = async () => {

    const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async () => {
            const studentApi = new StudentApi(pool);
            return {
                dataSources: {
                    studentApi
                }
            }
        }
    });

    console.log(`🚀  Server ready at ${url}`);
}

startServer();
