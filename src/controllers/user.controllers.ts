import type { Request, Response } from "express";
import { User } from "../models/user.models";
import { UserRepositories } from "../repositories/user.repositories";

const repo =  new UserRepositories()

export class UserController {
    public async cadastrar(req: Request, res: Response): Promise<void> {
        try{
            const {
                email,
                nome,
                senha,
                autoridade
            } = req.body
            const emailUnico = repo.findByEmail(email)

            if (emailUnico instanceof User) {
                res.status(404).json({erro : "O usuario já existe"})
                return;
            }

            await repo.create(email, nome, senha, autoridade)

            res.status(201)
            .cookie("login", true, {maxAge: 900000, httpOnly: true})
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel fazer o cadastro"})
        }
    }
    public async login(req: Request, res: Response): Promise<void> {
        try{
            const {email, senha} = req.body
            const usuario = await repo.findByEmail(email)

            if (!usuario) {
                res.status(404).json({erro : "O usuario nao existe"})
                return;
            }
            if (usuario.senha !== senha) {
                res.status(401).json({erro : "Senha incorreta"})
                return;
            }
            
            res.status(200)
            .cookie("login", true, {maxAge: 900000, httpOnly: true})
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel fazer login"})
        }
    }
    public async procurarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id)
            const usuario = repo.findById(id)

            if (!usuario) {
                res.status(404).json({erro : "O usuario nao existe"})
                return;
            }

            res.status(200).json(usuario)
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel encontrar o usuario"})
        }
    }
}