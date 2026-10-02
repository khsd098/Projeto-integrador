export class Text {
    private _id: number;
    private _profId: number;
    private _texto: string;
    private _data: string;
    private _disciplina: string;

    constructor(
        id: number,
        profId: number,
        texto: string,
        data: string,
        disciplina: string
    ){
        this._id = id;
        this._profId = profId;
        this._texto = texto;
        this._data = data;
        this._disciplina = disciplina;
    }

    get id(): number { return this._id }
    get profId(): number { return this._profId }
    get texto(): string { return this._texto }
    get data(): string { return this._data}
    get disciplina(): string { return this._disciplina } 

    set texto(newText: string) {
        newText = newText.trim()
        if(newText === '') return
        this._texto = newText
    }
    set data(newData: string) {
        newData = newData.trim()
        if(newData.length != 10) return
        this._data = newData
    }
    set disciplina(newDisciplina: string) {
        newDisciplina = newDisciplina.trim()
        if(newDisciplina === '') return
        this._disciplina = newDisciplina
    }
}