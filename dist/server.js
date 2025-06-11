"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
// Informa ao express que as rotas devem ser tratadas como JSON
app.use(express_1.default.json());
// Habilitando o cors
app.use((0, cors_1.default)());
// Habilitando o upload de arquivos
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // No máximo 50MB
}));
// Informa ao express onde estão as rotas da aplicação
app.use(routes_1.router);
// Middleware para tratar erros
app.use((error, req, res, next) => {
    // Se for uma instância do tipo Error
    if (error instanceof Error) {
        res.status(400).json({
            error: error.message
        });
    }
    ;
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3333');
});
