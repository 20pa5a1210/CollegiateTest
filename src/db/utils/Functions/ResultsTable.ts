import { Pool } from "pg";
import { QueryResponse } from "src/Types/ResponseTypes";
import { StudentResult } from "src/Types/StudentTypes";

export async function insertResult(pool: Pool, props: StudentResult): Promise<QueryResponse<StudentResult>> {

    try {
        // check examid and studentid exists
        // if exists then update or else insert

        const checkQuery = {
            text: `select resultid from results where examid=$1 and studentid=$2`,
            values: [props.examid, props.studentid]
        }

        const { rows: ExistResult } = await pool.query(checkQuery);

        if (ExistResult.length > 0) {
            const updateQuery = {
                text: `UPDATE results SET totalmarks=$1,marksobtained=$2,totalduration=$3,timetaken=$4 WHERE resultid=$5 RETURNING *`,
                values: [props.totalmarks, props.marksobtained, props.totalduration, props.timetaken, ExistResult[0].resultid]
            }
            const { rows } = await pool.query<StudentResult>(updateQuery);
            if (rows.length > 0) {
                return {
                    success: true,
                    message: "Result Updated Successfully",
                    data: rows[0]
                }
            }
            return {
                success: false,
                message: "Result Updation Failed",
                data: null
            }
        }

        const query = {
            text: `INSERT INTO results (examid,studentid,subjectid,totalmarks,marksobtained,totalduration,timetaken)
                        values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`
            ,
            values: [props.examid, props.studentid, props.subjectid, props.totalmarks, props.marksobtained, props.totalduration, props.timetaken]
        }
        const { rows } = await pool.query<StudentResult>(query);
        if (rows.length > 0) {
            return {
                success: true,
                message: "Result Inserted Successfully",
                data: rows[0]
            }
        }
        return {
            success: false,
            message: "Result Insertion Failed",
            data: null
        }
    } catch (error) {
        return error;
    }
}

export async function getResultOne(pool: Pool, examid: number, studentid: string): Promise<QueryResponse<StudentResult>> {

    try {

        const query = {
            text: `SELECT * FROM results WHERE examid=$1 AND studentid=$2`
            ,
            values: [examid, studentid]
        }
        const { rows } = await pool.query<StudentResult>(query);
        console.log(rows);

        if (rows.length > 0) {
            return {
                success: true,
                message: "Result Found",
                data: rows[0]
            }
        }
        return {
            success: false,
            message: "Result Not Found",
            data: null
        }
    } catch (error) {
        return error;
    }
}

export async function getResults(pool: Pool, studentid: string): Promise<QueryResponse<StudentResult[]>> {

    try {
        const query = {
            text: `SELECT * FROM results WHERE studentid=$1`
            ,
            values: [studentid]
        }
        const { rows } = await pool.query<StudentResult>(query);
        if (rows.length > 0) {
            return {
                success: true,
                message: "Result Found",
                data: rows
            }
        }
        return {
            success: false,
            message: "Result Not Found",
            data: null
        }
    } catch (error) {
        return error;
    }
}
