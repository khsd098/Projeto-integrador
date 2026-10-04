import { PrismaClient, Prisma, Text } from '../../generated/prisma'

const prisma = new PrismaClient()

export class TextRepositories {
    public async create (
        profId: number,
        texto: string,
        data: string,
        disciplina: string,
    ): Promise<Text> {
        return await prisma
        .text
        .create
        ({
            data : {
                profId,
                texto,
                data,
                disciplina,
            }
        })
    }
    public async findById(id: number): Promise<Text | null> {
        return await prisma
        .text
        .findUnique
        ({
            where: { id }
        })
    }
    public async update(id: number, conteudo: Prisma.TextUpdateInput ): Promise<Text | null> {
        const updateData : Prisma.TextUpdateInput = {}
        if(conteudo.texto !== undefined) updateData.texto = conteudo.texto
        if(conteudo.disciplina !== undefined) updateData.disciplina = conteudo.disciplina

        return await prisma
        .text
        .update
        ({
            where : { id },
            data : updateData
        })
    }
    public async delete(id: number) {
        return await prisma
        .text
        .delete
        ({
            where : { id }
        })
        
    }
}
