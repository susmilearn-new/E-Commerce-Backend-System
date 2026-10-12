const express = require("express");

const { createUser, login, logout } = require('../controllers/authentication');

const authenticationRoutes = express.Router()

authenticationRoutes.post("/create", createUser)

authenticationRoutes.post("/login", login)

authenticationRoutes.post("/logout", logout)

module.exports = authenticationRoutes;