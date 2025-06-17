import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
};

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      console.error("Usuário não encontrado");
      throw new Error("User/password incorrect");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.error("Senha incorreta");
      throw new Error("User/password incorrect");
    }

    // Gerar um token JWT e devolver os dados do usuário
    const token = sign(
      {
        name: user.name,
        email: user.email
      }, 
      process.env.JWT_SECRET as string, 
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    console.log("Usuário autenticado:", user.email);
    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    };
  }
}

export { AuthUserService };