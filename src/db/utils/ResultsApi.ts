import { Pool } from "pg";
import { QueryResponse } from "src/Types/ResponseTypes";
import { StudentResult } from "src/Types/StudentTypes";
import { getResultOne, getResults, insertResult } from "./Functions/ResultsTable";

export class ResultApi {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getResults(studentid: string): Promise<QueryResponse<StudentResult[]>> {
        return getResults(this.pool, studentid);
    }

    async getResultsByExam(examid: number, studentid: string): Promise<QueryResponse<StudentResult>> {
        return getResultOne(this.pool, examid, studentid);
    }

    async insertResult(args: StudentResult): Promise<QueryResponse<StudentResult>> {
        return insertResult(this.pool, args);
    }
}