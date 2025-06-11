"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    // Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).end();
        return;
    }
    const [, token] = authToken.split(" ");
    try {
        // Validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req
        req.user_id = sub;
        return next();
    }
    catch (error) {
        res.status(401).end();
        return;
    }
};
exports.isAuthenticated = isAuthenticated;
