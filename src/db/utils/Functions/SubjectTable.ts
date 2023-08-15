import { Pool, QueryResult } from "pg";
import { SubjectResp } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes";

export async function getSubjectsByFacultyEmail(pool: Pool, facultyemail: string): Promise<QueryResponse<SubjectResp[]>> {
    try {
        const query = {
            text: 'SELECT * FROM subjects WHERE facultyemail = $1',
            values: [facultyemail],
        }

        const { rows: Subjects }: QueryResult<SubjectResp> = await pool.query(query);
        console.log(Subjects);


        if (Subjects.length > 0) {
            return { success: true, message: `Subjects found`, data: Subjects };
        }
        return { success: false, message: `Subjects not found`, data: null };
    } catch (error) {
        return error;
    }
}


export async function getSubjectById(pool: Pool, subjectid: string): Promise<QueryResponse<SubjectResp>> {
    try {
        const query = {
            text: 'SELECT * FROM subjects WHERE subjectid = $1',
            values: [subjectid],
        }

        const { rows: Subject }: QueryResult<SubjectResp> = await pool.query(query);

        if (Subject.length > 0) {
            return { success: true, message: `Subject with subjectid: ${subjectid} found`, data: Subject[0] };
        }

        return { success: false, message: `Subject with subjectid: ${subjectid} not found`, data: null };
    } catch (error) {
        return error;
    }
}


export async function insertSubject(pool: Pool, subjectid: string, subjectname: string, facultyemail: string)
    : Promise<QueryResponse<SubjectResp>> {

    try {

        const { success, data: subject } = await getSubjectById(pool, subjectid);

        if (success) {
            return { success: false, message: `Subject with subjectid: ${subjectid} already exists`, data: subject };
        }

        const query = {
            text: 'INSERT INTO subjects(subjectid, subjectname, facultyemail) VALUES($1, $2, $3) returning *',
            values: [subjectid, subjectname, facultyemail],
        }

        const { rows }: QueryResult<SubjectResp> = await pool.query(query);

        return { success: true, message: `Subject with subjectid: ${subjectid} inserted successfully`, data: rows[0] };

    } catch (error) {
        return error;
    }
}