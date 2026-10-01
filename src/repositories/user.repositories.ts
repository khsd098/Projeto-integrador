import { writeFile, readFile } from "fs/promises"
import { User } from "../models/user.models"

export class UserRepositories {
    constructor(public arquivo: string){}

    public async read(): Promise<User[]> {
        try{
            const origData = await readFile(this.arquivo, "utf-8")
            const modData = JSON.parse(origData)

            return modData
        } catch (erro) {
            await this.write([])
            return []
        }
    }
    public async write(data: User[]): Promise<void> {
        await writeFile(this.arquivo, JSON.stringify(data))
    }
}