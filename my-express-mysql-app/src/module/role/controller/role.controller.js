const Role = require("../model/role.model");
const getRole = async (req, res) => {
    try {
        const result = await Role.getAllRole();
        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "Role fetched successfully",
                role: result.data,

            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const addRole = async (req, res) => {
    try {
        const { role} = req.body;
        const roles = await Role.createRole(role);
        res.json({
            data: {
                message: "Role created successfully",
                roles
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const update = async (req, res) => {
    try {
        const { id, role } = req.body;
        const updated = await Role.updateRole(id, role);
        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "Role updated successfully",
                role: updated
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Role.deleteRole(id);
        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: result.message,
                role: { id }
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;  // read ID from URL parameter
        const role = await Role.getRoleById(id);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "Role fetched successfully",
                role
            }
        });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};






module.exports = { getRole, addRole, update, deleteRole, getRoleById };
