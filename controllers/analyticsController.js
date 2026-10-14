const Product = require("../models/product");

// Get Product Recommendations
const getRecommendations = async (req, res) => {
    try {
        const { category, maxPrice } = req.query;

        // Get products from MongoDB
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products available"
            });
        }

        // Basic recommendation
        let recommendations = products;

        if (category) {
            recommendations = recommendations.filter(
                product =>
                    product.category.toLowerCase() ===
                    category.toLowerCase()
            );
        }

        if (maxPrice !== undefined) {
            const budget = Number(maxPrice);

            if (!Number.isFinite(budget) || budget < 0) {
                return res.status(400).json({
                    message: "Invalid maxPrice value"
                });
            }

            recommendations = recommendations.filter(
                product => product.price <= budget
            );
        }

        return res.status(200).json({
            message: "Basic product recommendations",
            data: recommendations
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getRecommendations
};

