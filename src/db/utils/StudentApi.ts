import { Pool } from "pg";
import { QueryResponse } from "src/Types/ResponseTypes";
import { StudentInput } from "src/Types/StudentTypes";
import { getStudentById, insertStudent } from "./Functions/StudentTable";

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
    ): Promise<QueryResponse<StudentInput>> {
        return insertStudent(this.pool, studentid, name, branch, email, password, confirmpassword)
    }

    async getStudentById(id: string): Promise<QueryResponse<StudentInput>> {
        return getStudentById(this.pool, id)
    }

}