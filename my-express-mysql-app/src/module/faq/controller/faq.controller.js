const Faq = require("../model/faq.model");
const getFaqs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.body;  // read from body

        const result = await Faq.getAllFaq(page, limit);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "FAQ fetched successfully",
                pagination: result.pagination,
                faq: result.data,

            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const addFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await Faq.createFaq(question, answer);

        // Send response in consistent format
        res.json({
            data: {
                message: "Faq created successfully",
                faq
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const updateFaq = async (req, res) => {
    try {
        const { id, question, answer } = req.body;

        const updatedFaq = await Faq.updateFaq(id, question, answer);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "FAQ updated successfully",
                faq: updatedFaq
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteFaq = async (req, res) => {
    try {
        const { id } = req.body;

        const result = await Faq.deleteFaq(id);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: result.message,
                faq: { id }
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;  // read ID from URL parameter
        const faq = await Faq.getFaqById(id);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "FAQ fetched successfully",
                faq
            }
        });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};






module.exports = { getFaqs, addFaq, updateFaq, deleteFaq, getFaqById };
