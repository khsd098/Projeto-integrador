import { Router } from "express";
import { TextController } from "../controllers/text.controllers";

const router = Router()
const controllers = new TextController

router.get("/texto/:id", controllers.acessarTexto)
router.post("/texto", controllers.salvarTexto)
router.post("/texto/:id", controllers.atualizarTexto)
router.delete("/texto/:id", controllers.removerTexto)