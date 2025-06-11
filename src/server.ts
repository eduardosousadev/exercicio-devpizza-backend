import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { router } from './routes';
import fileUpload from "express-fileupload";

const app = express();

// Informa ao express que as rotas devem ser tratadas como JSON
app.use(express.json());

// Habilitando o cors
app.use(cors());

// Habilitando o upload de arquivos
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 } // No máximo 50MB
}));

// Informa ao express onde estão as rotas da aplicação
app.use(router);

// Middleware para tratar erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // Se for uma instância do tipo Error
  if(error instanceof Error) {
     res.status(400).json({
      error: error.message
    });
  };

  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3333');
});