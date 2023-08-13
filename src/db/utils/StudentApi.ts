import { Pool } from "pg";

export class StudentApi {
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }

    async insertStudent(studentid: string, name: string, branch: string, email: string, password: string, confirmpassword: string) {

        try {
            const { rows: student } = await this.pool.query('SELECT * FROM students WHERE studentid = $1', [studentid]);

            if (student.length > 0) {
                return { success: false, message: `Student with studentid: ${studentid} already exists` };
            }

            const query = {
                text: 'INSERT INTO students(studentid, name, email,branch, password, confirmpassword) VALUES($1, $2, $3, $4, $5, $6) returning *',
                values: [studentid, name, email, branch, password, confirmpassword],
            }

            const { rows } = await this.pool.query(query);

            return { success: true, message: `Student with studentid: ${studentid} inserted successfully`, student: rows[0] };

        } catch (error) {
            return error;
        }

    }

    async getStudentById(id: string) {

        const query = {
            text: 'SELECT * FROM students WHERE studentid = $1',
            values: [id],
        }

        const { rows } = await this.pool.query(query);
        return rows[0];

    }

}