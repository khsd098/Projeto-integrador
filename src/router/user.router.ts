import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

const router = Router()
const controllers = new UserController

router.post("/cadastro", controllers.cadastrar)
router.post("/login", controllers.login)
router.post("/usuario/:id", controllers.searchForId)