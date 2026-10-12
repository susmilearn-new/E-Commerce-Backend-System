const express = require("express");

const { validateToken } = require("../middleware/authMiddleware");
const { getRecommendations } = require("../controllers/analyticsController");

const analyticsRoutes = express.Router();

analyticsRoutes.get("/recommendations", validateToken, getRecommendations)

module.exports = analyticsRoutes;