const express = require("express")

const { createOrder, getOrder, getAllOrder, updateOrderStatus, deleteOrder } = require("../controllers/orderController")
const { validateToken, authorizeRoles } = require("../middleware/authMiddleware")

const orderRoutes = express.Router()

orderRoutes.post("/create", validateToken, createOrder)

orderRoutes.get("/myorder", validateToken, getOrder)

orderRoutes.get("/listorder", validateToken, authorizeRoles("admin"), getAllOrder)

orderRoutes.put("/:id", validateToken, authorizeRoles("admin"), updateOrderStatus)

orderRoutes.delete("/:id", validateToken, authorizeRoles("admin"), deleteOrder)

module.exports = orderRoutes