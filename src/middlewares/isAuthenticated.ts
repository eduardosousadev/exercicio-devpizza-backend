import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Receber o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).end();
    return;
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar token
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

    // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req
    req.user_id = sub;

    return next();
  } catch (error) {
    res.status(401).end();
    return;
  }
}