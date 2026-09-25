class texto {
    private _texto: string;
    private _data: string;
    private _disciplina: string;

    constructor(
        texto: string,
        data: string,
        disciplina: string
    ){
        this._texto = texto;
        this._data = data;
        this._disciplina = disciplina;
    }

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