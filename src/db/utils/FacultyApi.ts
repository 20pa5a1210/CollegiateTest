import { Pool } from "pg";
import { ExamResponse, FacultyResp, QuestionInput, SubjectResp } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes";
import { getSubjectById, getSubjectsByFacultyEmail, insertSubject } from "./Functions/SubjectTable";
import { getFacultyByEmail, insertFaculty } from "./Functions/FacultyTable";
import { getQuestions, insertQuestion } from "./Functions/QuestionsTable";
export class FacultyApi {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async insertFaculty(
        facultyemail: string,
        facultyname: string,
        facultynumber: string,
        password: string,
        confirmpassword: string
    ): Promise<QueryResponse<FacultyResp>> {
        return insertFaculty(this.pool, facultyemail, facultyname, facultynumber, password, confirmpassword)
    }
    async getFacultyByEmail(facultyemail: string)
        : Promise<QueryResponse<FacultyResp>> {
        return getFacultyByEmail(this.pool, facultyemail);
    }

    async insertSubject(subjectid: string, subjectname: string, facultyemail: string)
        : Promise<QueryResponse<SubjectResp>> {
        return insertSubject(this.pool, subjectid, subjectname, facultyemail);
    }

    async getSubjectById(subjectid: string): Promise<QueryResponse<SubjectResp>> {
        return getSubjectById(this.pool, subjectid);
    }

    async getSubjectsByFacultyEmail(facultyemail: string): Promise<QueryResponse<SubjectResp[]>> {
        return getSubjectsByFacultyEmail(this.pool, facultyemail);
    }

    async insertQuestions(questions: QuestionInput[]): Promise<QueryResponse<QuestionInput[]>> {
        return insertQuestion(this.pool, questions)
    }

    async getQuestions(examid: string): Promise<QueryResponse<QuestionInput[]>> {
        return getQuestions(this.pool, examid);
    }
    async getExamDetails(examid: string): Promise<QueryResponse<ExamResponse>> {
        try {
            const query = {
                text: `SELECT * FROM exams WHERE examid = $1`,
                values: [examid]
            }
            const { rows: ExamData } = await this.pool.query(query);

            if (ExamData.length === 0) {
                return {
                    success: false,
                    message: "No Exam Found",
                    data: null
                }
            }
            return {
                success: true,
                message: "Exam Found",
                data: ExamData[0]
            }
        } catch (error) {
            return error
        }
    }

}