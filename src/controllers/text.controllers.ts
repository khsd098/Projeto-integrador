import type { Request, Response } from "express";
import { Text } from "../models/text.models";
import { TextRepositories } from "../repositories/text.repositories";

const repo = new TextRepositories("./dados/text.json")

export class TextController  {
    // Emanuel se você puder fazer a linkagem, profId com o id do usuário, eu agradeceria.
    public async salvarTexto(req: Request, res: Response) {
        try{
            const data = await repo.read()
            const { profId, texto, disciplina } = req.body
            const newId = data.reduce( (max, atual) => Math.max(max, atual.id), 0) + 1
            const newData = new Date().toISOString().split("T")[0] ?? ""

            const text = new Text(newId, Number(profId), texto, newData, disciplina)
            data.push(text)
            repo.write(data)

            res.status(201)
        } catch(erro) {
            res.status(400).json({erro : "Nao foi possivel salvar o texto"})
        } 
    }
    public async acessarTexto(req: Request, res: Response) {
        try{
            const data = await repo.read()
            const id = Number(req.params.id)
            const texto = data.find( a => a.id === id)
            if(!texto) {
                res.status(404).json({erro : "Texto não identificado"})
                return;
            }

            res.status(200).json(texto)
        } catch {
            res.status(400).json({erro : "Nao foi possivel acessar o texto"})
        }
    }
    public async atualizarTexto(){}
    public async removerTexto(){}
}