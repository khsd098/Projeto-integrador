import type { Request, Response } from "express";
import { Text } from "../models/text.models";
import { TextRepositories } from "../repositories/text.repositories";

const repo = new TextRepositories()

export class TextController {
  public async salvarTexto(req: Request, res: Response) {
    try {
      const user = req.user;
      const {
        texto, 
        disciplina
      } = req.body;

      if (!user || !user.id) {
        res.status(401).json({ erro: "Usuário não autenticado" });
        return
      }

      const userId = Number(user.id);

      if (!texto || typeof texto !== "string" || texto.trim().length === 0) {
        res.status(400).json({ erro: "O campo 'texto' é obrigatório e deve ser uma string não vazia" });
        return;
      }
      if (!disciplina || typeof disciplina !== "string" || disciplina.trim().length === 0) {
        res.status(400).json({ erro: "O campo 'disciplina' é obrigatório e deve ser uma string não vazia" });
        return;
      }
      const dataCriacao = new Date().toISOString().split("T")[0] ?? "";
      
      await repo.create(userId, texto, dataCriacao, disciplina)

      res.status(201)
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao salvar o texto" });
    }
  };
  public async acessarTexto(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "O parâmetro 'id' deve ser um número inteiro positivo" });
      }
 
      const texto = repo.findById(id)

      if (!texto) {
        return res.status(404).json({ erro: "Texto não encontrado" });
      }

      return res.status(200).json(texto);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao acessar o texto" });
    }
  };

  // 3. Atualizar texto (Apenas o autor)
  public async atualizarTexto(req: Request, res: Response) {
    try {
      const user = req.user;
      const id = Number(req.params.id);
      const { texto, disciplina } = req.body;

      if (!user || !user.id) {
        return res.status(401).json({ erro: "Usuário não autenticado" });
      }

      const userId = Number(user.id);

      if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "O parâmetro 'id' deve ser um número inteiro positivo" });
      }

      const possuiTextoValido = typeof texto === "string" && texto.trim().length > 0;
      const possuiDisciplinaValida = typeof disciplina === "string" && disciplina.trim().length > 0;

      if (!possuiTextoValido && !possuiDisciplinaValida) {
        res.status(400).json({
          erro: "Forneça ao menos um campo válido ('texto' ou 'disciplina') em formato de texto para atualização"
        });
        return;
      }

      const text = await repo.findById(id)

      if (!text) {
        res.status(404).json({ erro: "Texto não encontrado" })
        return;
      }
      if (text?.profId !== userId) {
        res.status(403).json({ erro: "Acesso negado: Você não tem permissão para alterar este texto" })
        return;
      }

      const textoFinal = possuiTextoValido ? texto.trim() : text.texto
      const disciplinaFinal = possuiDisciplinaValida ? disciplina.trim() : text.disciplina
      const conteudo = {
        texto : textoFinal,
        disciplina : disciplinaFinal
      }

      const textoAtt = await repo.update(id, conteudo)

      res.status(200).json(textoAtt)
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao atualizar o texto" });
    }
  };

  // 4. Remover texto (Apenas o autor)
  public removerTexto = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      const id = Number(req.params.id);

      if (!user || !user.id) {
        return res.status(401).json({ erro: "Usuário não autenticado" });
      }

      const userId = Number(user.id);

      if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "O parâmetro 'id' deve ser um número inteiro positivo" });
      }

      const texto = await repo.findById(id)

      if (!texto) {
        return res.status(404).json({ erro: "Texto não encontrado" });
      }

      if (texto.profId !== userId) {
        return res.status(403).json({ erro: "Acesso negado: Você não tem permissão para remover este texto" });
      }

      await repo.delete(id)

      return res.status(200)
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao remover o texto" });
    }
  };
} 