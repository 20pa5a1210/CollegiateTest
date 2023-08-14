import { Pool, QueryResult } from "pg";
import { FacultyResp } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes";

export async function getFacultyByEmail(pool: Pool, facultyemail: string)
    : Promise<QueryResponse<FacultyResp>> {
    try {
        const query = {
            text: 'SELECT * FROM faculty WHERE facultyemail = $1',
            values: [facultyemail],
        }

        const { rows: Faculty }: QueryResult<FacultyResp> = await pool.query(query);

        if (Faculty.length > 0) {
            return { success: true, message: `Faculty with facultyemail: ${facultyemail} found`, data: Faculty[0] };
        }

        return { success: false, message: `Faculty with facultyemail: ${facultyemail} not found`, data: null };

    } catch (error) {
        return error;
    }
}

export async function insertFaculty(
    pool: Pool, facultyemail: string, facultyname: string, facultynumber: string, password: string, confirmpassword: string
): Promise<QueryResponse<FacultyResp>> {
    try {
        const { success, data: faculty } = await getFacultyByEmail(pool, facultyemail);

        if (success) {
            return { success: false, message: `Faculty with facultyemail: ${facultyemail} already exists`, data: faculty };
        }

        const query = {
            text: 'INSERT INTO faculty(facultyemail, facultyname, facultynumber, password, confirmpassword) VALUES($1, $2, $3, $4, $5) returning *',
            values: [facultyemail, facultyname, facultynumber, password, confirmpassword],
        }

        const { rows }: QueryResult<FacultyResp> = await pool.query(query);

        return { success: true, message: `Faculty with facultyemail: ${facultyemail} inserted successfully`, data: rows[0] };

    } catch (error) {
        return error;
    }


}