import { Pool } from "pg";
import { Announcements, QueryResponse } from "src/Types/ResponseTypes";

export async function getAnnouncements(pool: Pool): Promise<QueryResponse<Announcements[]>> {
    try {

        const query = `SELECT * FROM announcements`;
        const { rows: announcements } = await pool.query<Announcements>(query);
        if (announcements.length === 0) {
            return {
                success: false,
                message: "No announcements found",
                data: null
            }
        }
        return {
            success: true,
            message: "Announcements found",
            data: announcements
        }
    } catch (error) {
        return error
    }
}

export async function getAnnouncementById(pool: Pool, announcementid: string): Promise<QueryResponse<Announcements[]>> {
    try {
        const query = {
            text: `SELECT * FROM announcements WHERE announcementid = $1`,
            values: [announcementid]
        };
        const { rows: announcements } = await pool.query<Announcements>(query);
        if (announcements.length === 0) {
            return {
                success: false,
                message: "No announcements found",
                data: null
            }
        }
        return {
            success: true,
            message: "Announcements found",
            data: announcements
        }
    } catch (error) {
        return error
    }
}

export async function addAnnouncement(pool: Pool, title: string, content: string, postedby: string): Promise<QueryResponse<Announcements[]>> {
    try {
        console.log(title, content, postedby)
        const query = {
            text: `INSERT INTO announcements (title, content, postedby) VALUES ($1, $2, $3) RETURNING *`,
            values: [title, content, postedby]
        };
        const resp = await pool.query<Announcements>(query);
        console.log(resp)
        if (resp.rows.length === 0) {
            return {
                success: false,
                message: "No announcements found",
                data: null
            }
        }
        return {
            success: true,
            message: "Announcements found",
            data: resp.rows
        }
    } catch (error) {
        return error
    }
}