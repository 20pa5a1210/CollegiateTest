import { Pool } from "pg"
import { QuestionInput } from "src/Types/FacultyTypes";
import { QueryResponse } from "src/Types/ResponseTypes"

export async function insertQuestion(
    pool: Pool,
    questions: QuestionInput[]
): Promise<QueryResponse<QuestionInput[]>> {

    try {

        const inserted: QuestionInput[] = []
        for (const question of questions) {
            const query = {
                text: 'INSERT INTO Questions(examid, question, options, answer) VALUES($1, $2, $3, $4) returning *',
                values: [question.examid, question.question, question.options, question.answer],
            }

            const { rows } = await pool.query(query);

            inserted.push(rows[0]);
        }

        // return how many questions were inserted

        const query = {
            text: 'SELECT COUNT(*) FROM Questions WHERE examid = $1',
            values: [questions[0].examid],
        }

        const { rows } = await pool.query(query);

        console.log(inserted);

        return { success: true, message: `Questions inserted successfully ${rows[0].count}`, data: inserted };


    } catch (error) {
        console.log(error);
        return error;
    }
}