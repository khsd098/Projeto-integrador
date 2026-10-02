import type { Request, Response } from "express";
import { Text } from "../models/text.models";
import { TextRepositories } from "../repositories/text.repositories";

export class TextController {
  private repo: TextRepositories;

  constructor() {
    this.repo = new TextRepositories("./dados/text.json");
  }

  // 1. Salvar texto
  public salvarTexto = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      const { texto, disciplina } = req.body;

      // Autenticação
      if (!user || !user.id) {
        return res.status(401).json({ erro: "Usuário não autenticado" });
      }

      const userId = Number(user.id);

      // Validação dos campos obrigatórios
      if (!texto || typeof texto !== "string" || texto.trim().length === 0) {
        return res.status(400).json({ erro: "O campo 'texto' é obrigatório e deve ser uma string não vazia" });
      }

      if (!disciplina || typeof disciplina !== "string" || disciplina.trim().length === 0) {
        return res.status(400).json({ erro: "O campo 'disciplina' é obrigatório e deve ser uma string não vazia" });
      }

      const data = await this.repo.read();

      // Geração do ID sequencial
      const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      const dataCriacao = new Date().toISOString().split("T")[0] ?? "";

      const novoTexto = new Text(
        newId,
        userId,
        texto.trim(),
        dataCriacao,
        disciplina.trim()
      );

      data.push(novoTexto);
      await this.repo.write(data);

      return res.status(201).json({ 
        mensagem: "Texto salvo com sucesso", 
        texto: novoTexto 
      });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao salvar o texto" });
    }
  };

  // 2. Acessar texto por ID
  public acessarTexto = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      // Validação de parâmetro de rota
      if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "O parâmetro 'id' deve ser um número inteiro positivo" });
      }

      const data = await this.repo.read();
      const texto = data.find((item) => item.id === id);

      if (!texto) {
        return res.status(404).json({ erro: "Texto não encontrado" });
      }

      return res.status(200).json(texto);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao acessar o texto" });
    }
  };

  // 3. Atualizar texto (Apenas o autor)
  public atualizarTexto = async (req: Request, res: Response): Promise<Response> => {
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

      // Validação: ao menos um campo válido deve ser fornecido
      const possuiTextoValido = typeof texto === "string" && texto.trim().length > 0;
      const possuiDisciplinaValida = typeof disciplina === "string" && disciplina.trim().length > 0;

      if (!possuiTextoValido && !possuiDisciplinaValida) {
        return res.status(400).json({
          erro: "Forneça ao menos um campo válido ('texto' ou 'disciplina') em formato de texto para atualização"
        });
      }

      const data = await this.repo.read();
      const index = data.findIndex((item) => item.id === id);

      if (index === -1) {
        return res.status(404).json({ erro: "Texto não encontrado" });
      }

      const itemExistente = data[index];

      // Verificação explícita para eliminar o aviso de 'possibly undefined'
      if (!itemExistente) {
        return res.status(404).json({ erro: "Texto não encontrado" });
      }

      // Autorização: verifica se o usuário autenticado é o criador
      if (itemExistente.profId !== userId) {
        return res.status(403).json({ erro: "Acesso negado: Você não tem permissão para alterar este texto" });
      }

      // Atualização seletiva
      if (possuiTextoValido) {
        itemExistente.texto = texto.trim();
      }
      if (possuiDisciplinaValida) {
        itemExistente.disciplina = disciplina.trim();
      }

      await this.repo.write(data);

      return res.status(200).json({ 
        mensagem: "Texto atualizado com sucesso", 
        texto: itemExistente 
      });
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

      const data = await this.repo.read();
      const texto = data.find((item) => item.id === id);

      if (!texto) {
        return res.status(404).json({ erro: "Texto não encontrado" });
      }

      // Autorização: verifica se o usuário autenticado é o criador
      if (texto.profId !== userId) {
        return res.status(403).json({ erro: "Acesso negado: Você não tem permissão para remover este texto" });
      }

      const dataFiltrada = data.filter((item) => item.id !== id);
      await this.repo.write(dataFiltrada);

      return res.status(200).json({ mensagem: "Texto removido com sucesso" });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro interno ao remover o texto" });
    }
  };
} 