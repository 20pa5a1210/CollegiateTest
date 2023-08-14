import { StudentInput } from "src/Types/StudentTypes";
import { MyContext } from "../server";
import { FacultyResp } from "src/Types/FacultyTypes";

const resolvers = {
    Query: {
        getStudentById: async (_: any, { id }: { id: string }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.studentApi.getStudentById(id);
        },
        getFacultyByEmail: async (_: any, { facultyemail }: { facultyemail: string }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.getFacultyByEmail(facultyemail);
        }
    },

    Mutation: {
        insertStudent: async (_: any, { input }: { input: StudentInput }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.studentApi.insertStudent(input.studentid, input.name, input.email, input.branch, input.password, input.confirmpassword);
        },
        addFaculty: async (_: any, { faculty }: { faculty: FacultyResp }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.insertFaculty(faculty.facultyemail, faculty.facultyname, faculty.facultynumber, faculty.password, faculty.confirmpassword);
        }

    }
}

export default resolvers;