export enum Cargo {
    ALUNO = "aluno",
    PROFESSOR = "professor"
  }
  
  export class User {
    private _id: number;
    private _email: string;
    private _nome: string;
    private _senha: string;
    private _autoridade: Cargo;
  
    constructor(
      id: number,
      email: string,
      nome: string,
      senha: string,
      autoridade: Cargo
    ) {
      this.validarId(id);
      this._id = id;
  
      this._email = this.validarEmail(email);
      this._nome = this.validarNome(nome);
      this._senha = this.validarSenha(senha);
      this._autoridade = this.validarAutoridade(autoridade);
    }
  
    // Getters
    get id(): number { return this._id; }
    get email(): string { return this._email; }
    get nome(): string { return this._nome; }
    get senha(): string { return this._senha; }
    get autoridade(): Cargo { return this._autoridade; }
  
    // Setters com validações
    set email(newEmail: string) {
      this._email = this.validarEmail(newEmail);
    }
  
    set nome(newNome: string) {
      this._nome = this.validarNome(newNome);
    }
  
    set senha(newSenha: string) {
      this._senha = this.validarSenha(newSenha);
    }
  
    set autoridade(newAutoridade: Cargo) {
      this._autoridade = this.validarAutoridade(newAutoridade);
    }
  
    // --- MÉTODOS PRIVADOS DE VALIDAÇÃO ---
  
    private validarId(id: number): void {
      if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("O 'id' deve ser um número inteiro positivo.");
      }
    }
  
    private validarEmail(email: string): string {
      const emailTratado = email ? email.trim().toLowerCase() : "";
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailTratado || !regexEmail.test(emailTratado)) {
        throw new Error("O e-mail fornecido é inválido.");
      }
  
      return emailTratado;
    }
  
    private validarNome(nome: string): string {
      const nomeTratado = nome ? nome.trim() : "";
  
      if (!nomeTratado || nomeTratado.length < 2) {
        throw new Error("O nome deve conter pelo menos 2 caracteres.");
      }
  
      return nomeTratado;
    }
  
    private validarSenha(senha: string): string {
      if (!senha || senha.trim().length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres.");
      }
  
      return senha;
    }
  
    private validarAutoridade(autoridade: Cargo): Cargo {
      const cargosValidos = Object.values(Cargo);
  
      if (!cargosValidos.includes(autoridade)) {
        throw new Error("O cargo deve ser 'aluno' ou 'professor'.");
      }
  
      return autoridade;
    }
  }