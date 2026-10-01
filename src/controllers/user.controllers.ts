import type { Request, Response } from "express";
import { User } from "../models/user.models";
import { UserRepositories } from "../repositories/user.repositories";

const repo =  new UserRepositories("./dados/user.json")

export class UserController {
    public async cadastrar(req: Request, res: Response): Promise<void> {
        try{
            const data = await repo.read()
            const {email, nome, senha, autoridade} = req.body
            const emailUnico = data.some( a => a.email === email)

            if(emailUnico){
                res.status(404).json({erro : "O usuario já existe"})
                return;
            }

            const newId = data.reduce((max, atual) => Math.max(max, atual.id), 0) + 1
            const newUser = new User(newId, email, nome, senha, autoridade)

            data.push(newUser)
            await repo.write(data)
            res.status(201).cookie("login", true, {maxAge: 900000, httpOnly: true})
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel fazer o cadastro"})
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try{
            const data = await repo.read()
            const {email, senha} = req.body
            const usuario = data.find( a => a.email === email)

            if(!usuario) throw new Error("O usuario nao existe")
            if(usuario.senha !== senha) res.status(404).json({erro : "Senha incorreta"})
            
            res.status(200).cookie("login", true, {maxAge: 900000, httpOnly: true})
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel fazer login"})
        }
    }
    public async searchForId(req: Request, res: Response): Promise<void> {
        try{
            const data = await repo.read()
            const id = Number(req.params.id)
            const usuario = data.find( a => a.id === id)

            if(!usuario) res.status(404).json({erro : "O usuario nao existe"})
            res.status(200).json(usuario)
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel encontrar o usuario"})
        }
    }
}