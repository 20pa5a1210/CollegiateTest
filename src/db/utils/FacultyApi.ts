import { Pool } from "pg";

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
    ) {

        try {

            const { success, faculty } = await this.getFacultyByEmail(facultyemail);

            if (success) {
                return { success: false, message: `Faculty with facultyemail: ${facultyemail} already exists`, faculty: faculty };
            }

            const query = {
                text: 'INSERT INTO faculty(facultyemail, facultyname, facultynumber, password, confirmpassword) VALUES($1, $2, $3, $4, $5) returning *',
                values: [facultyemail, facultyname, facultynumber, password, confirmpassword],
            }

            const { rows } = await this.pool.query(query);

            return { success: true, message: `Faculty with facultyemail: ${facultyemail} inserted successfully`, faculty: rows[0] };

        } catch (error) {
            return error;
        }


    }
    async getFacultyByEmail(facultyemail: string) {
        try {
            const query = {
                text: 'SELECT * FROM faculty WHERE facultyemail = $1',
                values: [facultyemail],
            }

            const { rows: Faculty } = await this.pool.query(query);

            if (Faculty.length > 0) {
                return { success: true, message: `Faculty with facultyemail: ${facultyemail} found`, faculty: Faculty[0] };
            }

            return { success: false, message: `Faculty with facultyemail: ${facultyemail} not found`, faculty: null };

        } catch (error) {
            return error;
        }
    }
}