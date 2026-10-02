import { writeFile, readFile } from "fs/promises"
import { Text } from "../models/text.models";

export class TextRepositories {
    constructor(public arquivo: string) {}

    public async read(): Promise<Text[]> {
        try {
            const origData = await readFile(this.arquivo, "utf-8");
            const modData = JSON.parse(origData);

        return modData;
        } catch (erro) {
            await this.write([]);
            return [];
        }
    }
    public async write(data: Text[]): Promise<void> {
        await writeFile(this.arquivo, JSON.stringify(data));
    }
}
