import { Pool, QueryResult } from "pg";
import { QueryResponse } from "src/Types/ResponseTypes";
import { StudentInput } from "src/Types/StudentTypes";

export async function getStudentById(pool: Pool, id: string): Promise<QueryResponse<StudentInput>> {

    try {
        const query = {
            text: `SELECT * FROM students WHERE studentid = $1`,
            values: [id],
        }

        const { rows: Student }: QueryResult<StudentInput> = await pool.query(query);

        if (Student.length > 0) {
            return { success: true, message: `Student with studentid: ${id} found`, data: Student[0] };
        }

        return { success: false, message: `Student with studentid: ${id} not found`, data: null };

    } catch (error) {
        return error;
    }

}
export async function insertStudent(
    pool: Pool,
    studentid: string,
    name: string,
    branch: string,
    email: string,
    password: string,
    confirmpassword: string
): Promise<QueryResponse<StudentInput>> {

    try {

        const { success, data: student } = await getStudentById(pool, studentid);

        if (success) {
            return { success: false, message: `Student with studentid: ${studentid} already exists`, data: student };
        }

        const query = {
            text: 'INSERT INTO students(studentid, name, email,branch, password, confirmpassword) VALUES($1, $2, $3, $4, $5, $6) returning *',
            values: [studentid, name, email, branch, password, confirmpassword],
        }

        const { rows }: QueryResult<StudentInput> = await pool.query(query);

        return { success: true, message: `Student with studentid: ${studentid} inserted successfully`, data: rows[0] };

    } catch (error) {
        return error;
    }

}