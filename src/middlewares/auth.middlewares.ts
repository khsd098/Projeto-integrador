import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export interface CustomPayload extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor de autenticação" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [scheme, token] = authHeader.split(" ");

  // Garante que o esquema seja 'Bearer' e que o 'token' exista (não seja undefined)
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato do token inválido" });
  }

  try {
    // Agora o TypeScript sabe que 'token' é 100% string
    const decoded = jwt.verify(token, secret) as unknown as CustomPayload;

    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}