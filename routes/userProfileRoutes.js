const express = require('express');

const { getUsers, getUserById, updateProfile, deleteUser } = require('../controllers/userProfile');
const { validateToken, authorizeRoles } = require('../middleware/authMiddleware');

const userRoutes = express.Router()

userRoutes.get('/', validateToken, authorizeRoles("admin"), getUsers)

userRoutes.get('/:id', validateToken, authorizeRoles("admin"), getUserById)

userRoutes.put('/profile', validateToken, updateProfile)

userRoutes.delete('/:id',validateToken, authorizeRoles("admin"), deleteUser)

module.exports = userRoutes