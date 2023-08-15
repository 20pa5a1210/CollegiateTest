import { Pool, QueryResult } from "pg";
import { ExamResponse } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes";

export async function getExamDetails(pool: Pool, examid: string): Promise<QueryResponse<ExamResponse>> {
    try {
        const query = {
            text: `SELECT * FROM exams WHERE examid = $1`,
            values: [examid]
        }
        const { rows: ExamData }: QueryResult<ExamResponse> = await pool.query(query);

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

export async function CreateExam(pool: Pool, examData: ExamResponse): Promise<QueryResponse<ExamResponse>> {

    try {
        const query = {
            text: `INSERT INTO exams (subjectid,facultyemail,starttime,endtime,totalmarks,passmarks,totalduration)
            VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            values: [examData.subjectid, examData.facultyemail, examData.starttime, examData.endtime, examData.totalmarks, examData.passmarks, examData.totalduration]
        }
        const { rows }: QueryResult<ExamResponse> = await pool.query(query);

        if (rows.length === 0) {
            return {
                success: false,
                message: "Exam Not Created",
                data: null
            }
        }
        return {
            success: true,
            message: "Exam Created",
            data: rows[0]
        }
    } catch (error) {
        return error
    }
}