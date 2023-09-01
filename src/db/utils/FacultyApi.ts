import { Pool } from "pg";
import { ExamResponse, FacultyResp, FeedbackResponse, QuestionInput, SubjectResp } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes";
import { getSubjectById, getSubjectsByFacultyEmail, insertSubject } from "./Functions/SubjectTable";
import { getFacultyByEmail, insertFaculty } from "./Functions/FacultyTable";
import { getQuestions, insertQuestion } from "./Functions/QuestionsTable";
import { CreateExam, deleteExam, getExamDetails } from "./Functions/ExamTable";
import { getFeedbacksByFacultyEmail } from "./Functions/FeedbackTable";
export class FacultyApi {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    // get all faculty
    async getAllFaculty(): Promise<QueryResponse<FacultyResp[]>> {
        const { rows } = await this.pool.query<FacultyResp>(`SELECT * FROM faculty`);
        if (rows.length === 0) {
            return {
                success: true,
                message: "No faculty found",
                data: []
            }
        }
        return {
            success: true,
            message: "Faculty found",
            data: rows
        }
    }
    // insert into faculty table
    async insertFaculty(
        facultyemail: string,
        facultyname: string,
        facultynumber: string,
        password: string,
        confirmpassword: string
    ): Promise<QueryResponse<FacultyResp>> {
        return insertFaculty(this.pool, facultyemail, facultyname, facultynumber, password, confirmpassword)
    }
    // get faculty by email
    async getFacultyByEmail(facultyemail: string)
        : Promise<QueryResponse<FacultyResp>> {
        return getFacultyByEmail(this.pool, facultyemail);
    }
    // insert into subject table
    async insertSubject(subjectid: string, subjectname: string, facultyemail: string)
        : Promise<QueryResponse<SubjectResp>> {
        return insertSubject(this.pool, subjectid, subjectname, facultyemail);
    }
    // get subject by id
    async getSubjectById(subjectid: string): Promise<QueryResponse<SubjectResp>> {
        return getSubjectById(this.pool, subjectid);
    }
    // get subject by faculty email
    async getSubjectsByFacultyEmail(facultyemail: string): Promise<QueryResponse<SubjectResp[]>> {
        return getSubjectsByFacultyEmail(this.pool, facultyemail);
    }
    // insert into questions table
    async insertQuestions(questions: QuestionInput[]): Promise<QueryResponse<QuestionInput[]>> {
        return insertQuestion(this.pool, questions)
    }
    // get questions by examid
    async getQuestions(examid: string): Promise<QueryResponse<QuestionInput[]>> {
        return getQuestions(this.pool, examid);
    }
    // get exam details by examid
    async getExamDetails(examid: string): Promise<QueryResponse<ExamResponse>> {
        return getExamDetails(this.pool, examid);
    }
    // create exam (insert into exam table)
    async CreateExam(examData: ExamResponse): Promise<QueryResponse<ExamResponse>> {
        return CreateExam(this.pool, examData);
    }
    // get feedbacks by faculty email
    async getFeedbacksByFacultyEmail(facultyemail: string): Promise<QueryResponse<FeedbackResponse[]>> {
        return getFeedbacksByFacultyEmail(this.pool, facultyemail);
    }
    // delete exam by examid
    async deleteExam(examid: string): Promise<QueryResponse<ExamResponse>> {
        return deleteExam(this.pool, examid);
    }
}
