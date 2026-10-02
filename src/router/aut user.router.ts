import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();
const controllers = new UserController();

// Rotas públicas (não precisam de token)
router.post("/cadastro", controllers.cadastrar);
router.post("/login", controllers.login);

// Rota protegida (exige token JWT válido no cabeçalho Authorization)
router.get("/usuario/:id", authMiddleware, controllers.procurarPorId);

export default router;   