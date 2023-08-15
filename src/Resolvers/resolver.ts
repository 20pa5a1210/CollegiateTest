import { StudentInput } from "src/Types/StudentTypes";
import { MyContext } from "../server";
import { ExamResponse, FacultyResp, QuestionInput, SubjectResp } from "src/Types/FacultyTypes";

const resolvers = {
    Query: {
        getStudentById: async (_: any, { id }: { id: string }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.studentApi.getStudentById(id);
        },
        getFacultyByEmail: async (_: any, { facultyemail }: { facultyemail: string }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.getFacultyByEmail(facultyemail);
        },
        getExamDetails: async (_: any, { examid }: { examid: string }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.getExamDetails(examid);
        },
        getFaculty: async (_: any, { }: any, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            const response = await dataSources.facultyApi.getAllFaculty();
            if (response.success) {
                return response.data;
            }
            return [];
        },
    },
    Mutation: {
        insertStudent: async (_: any, { input }: { input: StudentInput }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.studentApi.insertStudent(input.studentid, input.name, input.email, input.branch, input.password, input.confirmpassword);
        },
        addFaculty: async (_: any, { faculty }: { faculty: FacultyResp }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.insertFaculty(faculty.facultyemail, faculty.facultyname, faculty.facultynumber, faculty.password, faculty.confirmpassword);
        },
        addSubject: async (_: any, { subject }: { subject: SubjectResp }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.insertSubject(subject.subjectid, subject.subjectname, subject.facultyemail);
        },
        addQuestions: async (_: any, { questions }: { questions: QuestionInput[] }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.insertQuestions(questions);
        },
        CreateExam: async (_: any, { exam }: { exam: ExamResponse }, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            return await dataSources.facultyApi.CreateExam(exam);

        }
    },
    Faculty: {
        subjects: async (parent: FacultyResp, _: any, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            const response = await dataSources.facultyApi.getSubjectsByFacultyEmail(parent.facultyemail);

            if (response.success) {
                return response.data;
            }
            return [];
        },
        feedbacks: async (parent: FacultyResp, _: any, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            const response = await dataSources.facultyApi.getFeedbacksByFacultyEmail(parent.facultyemail);

            if (response.success) {
                return response.data;
            }
            return [];
        }
    },
    Exam: {
        questions: async (parent: ExamResponse, _: any, { dataSources }: { dataSources: MyContext["dataSources"] }) => {
            const response = await dataSources.facultyApi.getQuestions(parent.examid);

            if (response.success) {
                return response.data;
            }
            return [];
        },
    }
}
export default resolvers;