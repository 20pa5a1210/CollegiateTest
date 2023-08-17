import { Pool } from "pg";
import { Announcements, QueryResponse } from "src/Types/ResponseTypes";
import { StudentResult } from "src/Types/StudentTypes";
import { getResultOne, getResults, insertResult } from "./Functions/ResultsTable";
import { addAnnouncement, getAnnouncementById, getAnnouncements } from "./Functions/Announcements";

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

    async addAnnouncement(title: string, content: string, postedby: string): Promise<QueryResponse<Announcements[]>> {
        console.log(title, content, postedby, "in result api");

        return addAnnouncement(this.pool, title, content, postedby);
    }

    async getAnnouncements(): Promise<QueryResponse<Announcements[]>> {
        return getAnnouncements(this.pool);
    }

    async getAnnouncementById(announcementid: string): Promise<QueryResponse<Announcements[]>> {
        return getAnnouncementById(this.pool, announcementid);
    }
}