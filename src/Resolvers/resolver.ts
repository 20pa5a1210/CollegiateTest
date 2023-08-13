import { StudentInput } from "src/Types/StudentTypes";
import { MyContext } from "../server";

const resolvers = {
    Query: {
        getStudentById: async (_: any, { id }: { id: string }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.studentApi.getStudentById(id);
        },
    },

    Mutation: {
        insertStudent: async (_: any, { input }: { input: StudentInput }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.studentApi.insertStudent(input.studentid, input.name, input.email, input.branch, input.password, input.confirmpassword);
        }
    }
}

export default resolvers;