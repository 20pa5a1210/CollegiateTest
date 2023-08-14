import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import resolvers from "./Resolvers/resolver";
import { pool } from "./db/db";
import { StudentApi } from "./db/utils/StudentApi";
import { FacultyApi } from "./db/utils/FacultyApi";
import { StudentDefs } from "./Schema/StudentDefs";

export interface MyContext {
    dataSources: {
        studentApi: StudentApi
        facultyApi: FacultyApi
    }
}

const startServer = async () => {

    const server = new ApolloServer<MyContext>({ typeDefs: [StudentDefs], resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async () => {
            const studentApi = new StudentApi(pool);
            const facultyApi = new FacultyApi(pool);
            return {
                dataSources: {
                    studentApi,
                    facultyApi
                }
            }
        }
    });

    console.log(`🚀  Server ready at ${url}`);
}

startServer();
