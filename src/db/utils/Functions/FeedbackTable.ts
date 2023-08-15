import { Pool, QueryResult } from "pg";
import { FeedbackResponse } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes";

export async function getFeedbacksByFacultyEmail(pool: Pool, facultyemail: string): Promise<QueryResponse<FeedbackResponse[]>> {
    try {

        const query = {
            text: `SELECT * FROM feedback WHERE facultyemail = $1`,
            values: [facultyemail]
        }
        const { rows: Feedbacks }: QueryResult<FeedbackResponse> = await pool.query(query);

        if (Feedbacks.length === 0) {
            return {
                success: false,
                message: "No feedbacks found",
                data: []
            }
        }

        return {
            success: true,
            message: "Feedbacks found",
            data: Feedbacks
        }
    } catch (error) {
        return error
    }
}

export async function insertFeedbacks(pool: Pool, feedback: FeedbackResponse): Promise<QueryResponse<FeedbackResponse>> {
    try {

        const query = {
            text: `INSERT INTO feedback (facultyemail,studentid,feedbackmessage) VALUES ($1,$2,$3) returning *`,
            values: [feedback.facultyemail, feedback.studentid, feedback.feedbackmessage]
        }
        const { rows: Feedback }: QueryResult<FeedbackResponse> = await pool.query(query);
        if (Feedback.length === 0) {
            return {
                success: false,
                message: "Feedback not inserted",
                data: null
            }
        }

        return {
            success: true,
            message: "Feedback inserted",
            data: Feedback[0]
        }
    } catch (error) {
        return error
    }
}

