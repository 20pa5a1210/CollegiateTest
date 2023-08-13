import { Pool, QueryResult } from "pg";
import { StudentInput } from "src/Types/StudentTypes";

export class StudentApi {
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }

    async insertStudent(
        studentid: string,
        name: string,
        branch: string,
        email: string,
        password: string,
        confirmpassword: string
    ): Promise<{ success: boolean, message: string, student: StudentInput | null }> {

        try {
            const { rows: student }: QueryResult<StudentInput> = await this.pool.query('SELECT * FROM students WHERE studentid = $1', [studentid]);

            if (student.length > 0) {
                return { success: false, message: `Student with studentid: ${studentid} already exists`, student: student[0] };
            }

            const query = {
                text: 'INSERT INTO students(studentid, name, email,branch, password, confirmpassword) VALUES($1, $2, $3, $4, $5, $6) returning *',
                values: [studentid, name, email, branch, password, confirmpassword],
            }

            const { rows }: QueryResult<StudentInput> = await this.pool.query(query);

            return { success: true, message: `Student with studentid: ${studentid} inserted successfully`, student: rows[0] };

        } catch (error) {
            return error;
        }

    }

    async getStudentById(id: string): Promise<{ success: boolean, message: string, student: StudentInput | null }> {

        try {
            const query = {
                text: 'SELECT * FROM students WHERE studentid = $1',
                values: [id],
            }

            const { rows: Student } = await this.pool.query(query);

            if (Student.length > 0) {
                return { success: true, message: `Student with studentid: ${id} found`, student: Student[0] };
            }

            return { success: false, message: `Student with studentid: ${id} not found`, student: null };

        } catch (error) {
            return error;
        }

    }

}