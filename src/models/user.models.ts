export enum cargo {
    "aluno",
    "professor"
}

export class User {
    private _id: number;
    private _email: string;
    private _nome: string;
    private _senha: string;
    private _autoridade: cargo;

    constructor (
        id: number,
        email: string,
        nome: string,
        senha: string,
        autoridade: cargo
    ){
        this._id = id;
        this._email = email;
        this._nome = nome;
        this._senha = senha;
        this._autoridade = autoridade
    };

    get id(): number { return this._id }
    get email(): string { return this._email }
    get nome(): string { return this._nome }
    get senha(): string { return this._senha }
    get autoridade(): cargo { return this._autoridade}

    set email(newEmail) {
        if(!newEmail.includes('@')) throw new Error("sei la")
        this._email = newEmail.trim()
    }
    set nome(newNome: string) {
        if(newNome.trim() === '') return;
        this._nome = newNome.trim()
    }
}