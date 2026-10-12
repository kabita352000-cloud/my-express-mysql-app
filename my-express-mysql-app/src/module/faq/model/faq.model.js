const pool = require("../../../config/db");

const Faq = {
    // Get all users
    //   getAllFaq: async () => {
    //     const [rows] = await pool.query("SELECT id, question,answer,status,isDelete, created_at updated_at FROM faqs");
    //     return rows;
    //   },

    getAllFaq: async (page = 1, limit = 10) => {
        const offset = (page - 1) * limit;

        // Fetch only active, not-deleted FAQs
        const [rows] = await pool.query(
            `SELECT id, question, answer, status, isDelete, created_at, updated_at FROM faqs
     WHERE isDelete = 0 AND status = 'active' LIMIT ? OFFSET ?`, [parseInt(limit), parseInt(offset)]);

        // Get total count of active FAQs
        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) AS total FROM faqs WHERE isDelete = 0 AND status = 'active'`);

        return {
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
            data: rows,
        };
    },

    // Create
    createFaq: async (question, answer) => {
        console.log("📌 Query params:", question, answer); // debug
        const [result] = await pool.query(
            "INSERT INTO faqs (question,answer) VALUES (?, ?)",
            [question, answer]  // 👈 match the placeholders
        );
        // return result
        return {
            id: result.insertId,   // MySQL gives the auto_increment id
            question, answer
        };
    },


    // update
    updateFaq: async (id, question, answer) => {
        console.log("📌 Query params:", id, question, answer); // debug

        const [result] = await pool.query(
            "UPDATE faqs SET question = ?, answer = ? WHERE id = ?",
            [question, answer, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("FAQ not found or nothing updated");
        }

        // Return the updated FAQ data
        return {
            id,
            question,
            answer
        };
    },


    // delete
    deleteFaq: async (id) => {
        console.log("📌 Deleting FAQ with id:", id);

        const [result] = await pool.query(
            "UPDATE faqs SET isDelete = 1 WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("FAQ not found or already deleted");
        }

        return { id, message: "FAQ deleted successfully" };
    },
    getFaqById: async (id) => {
        const [rows] = await pool.query(
            `SELECT id, question, answer, status, isDelete, created_at, updated_at
     FROM faqs
     WHERE id = ? AND isDelete = 0 AND status = 'active'`,
            [id]
        );

        if (rows.length === 0) {
            throw new Error("FAQ not found");
        }

        return rows[0];
    }




}


module.exports = Faq;
