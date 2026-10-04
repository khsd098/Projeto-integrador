import { User, PrismaClient, Cargo } from "../../generated/prisma"

const prisma = new PrismaClient()

export class UserRepositories {
    public async create(
        email: string,
        nome: string,
        senha: string,
        autoridade: string
    ): Promise<User> {
        return prisma
        .user
        .create
        ({
            data : {
                email,
                nome,
                senha,
                autoridade : autoridade.toUpperCase() as Cargo
            }
        });
    }
    public async findById(id: number): Promise<User | null> {
        return await prisma
        .user
        .findUnique
        ({
            where: { id }
        })
    }
    public async findByEmail(email: string): Promise<User | null> {
        return await prisma
        .user
        .findUnique
        ({
            where : { email }
        })
    }
}