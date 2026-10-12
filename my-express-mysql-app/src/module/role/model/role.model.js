const pool = require("../../../config/db");

const Role = {
    // Get all Role
    getAllRole: async () => {
        const [rows] = await pool.query("SELECT id, role,status,isDelete, created_at updated_at FROM roles");
        return rows;
    },

    // Create
    createRole: async (role) => {
        const [result] = await pool.query(
            "INSERT INTO roles (role) VALUES (?)",
            [role]
        );
        return {
            id: result.insertId,
            role
        };
    },


    // update
    updateRole: async (id, role) => {
        const [result] = await pool.query(
            "UPDATE roles SET role = ? WHERE id = ?",
            [role, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Role not found or nothing updated");
        }
        return {
            id, role
        };
    },


    // delete
    deleteRole: async (id) => {
        const [result] = await pool.query(
            "UPDATE roles SET isDelete = 1 WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Role not found or already deleted");
        }
        return { id, message: "Role deleted successfully" };
    },

    
    getRoleById: async (id) => {
        const [rows] = await pool.query(
            `SELECT id, role, status, isDelete, created_at, updated_at FROM roles WHERE id = ? AND isDelete = 0 AND status = 'active'`,
            [id]
        );
        if (rows.length === 0) {
            throw new Error("Role not found");
        }
        return rows[0];
    }

}


module.exports = Role;
