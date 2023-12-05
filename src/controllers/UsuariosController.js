import bcrypt from "bcryptjs";
import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class UsuariosController {
  static listarUsuarios = async (req, res) => {
    try {
      let userExists = null;

      if (!req.query.nome && !req.query.email) {
        userExists = await prisma.usuarios.findMany();
      }

      if (!req.query.email && req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      if (req.query.email && !req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      if (req.query.email && req.query.nome) {
        userExists = await prisma.usuarios.findMany({
          where: {
            email: {
              contains: req.query.email,
            },
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      return res.status(200).json(userExists);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    try {
      const userExists = await prisma.usuarios.findFirst({
        where: {
          id: {
            equals: req.params.id,
          }
        },
      });
      if (userExists) {
        return res.status(200).json(userExists);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  static cadastrarUsuario = async (req, res) => {
    try {

      const { nome, email, senha, ativo } = req.body;

      const erros = [];

      if (!nome) {
        erros.push({ error: true, code: 400, message: "Nome é obrigatório" })
      }
      if (!email) {
        erros.push({ error: true, code: 400, message: "Email é obrigatório" })
      }
      if (!senha) {
        erros.push({ error: true, code: 400, message: "Senha é obrigatório" })
      }
      if (!ativo) {
        erros.push({ error: true, code: 400, message: "Ativo é obrigatório" })
      }

      if (erros.length > 0) {
        return res.status(400).json(erros)
      }

      const userExists = await prisma.usuarios.findFirst({
        where: {
          email: {
            equals: email,
          }
        },
      });

      if (userExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Email já cadastrado" }])
      }

      const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));

      const userCreated = await prisma.usuarios.create({
        data: {
          nome,
          email,
          senha: senhaCrypt,
          ativo,
        },
      });

      delete userCreated.senha;
      return res.status(201).json(userCreated);

    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  static PATCHAtualizarUsuario = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID do usuário é obrigatório" }])
      }

      const id = req.params.id
      const { nome, email, senha, ativo } = req.body;

      if (nome || email || senha || ativo && id) {
      } else {
        return res.status(400).json([{ error: true, code: 400, message: "Algum dado deve ser informado para atualizar o usuário" }])
      }

      const emailExists = await prisma.usuarios.findFirst({
        where: {
          id: id
        },
      });

      console.log(email)
      console.log(typeof email)

      if (email !== undefined) {
        if (emailExists.email !== email) {
          const emailExistsOutherUser = await prisma.usuarios.findFirst({
            where: {
              email: {
                equals: email,
              },
              id: {
                not: {
                  equals: id,
                }
              }
            },
          });
          if (emailExistsOutherUser) {
            return res.status(400).json([{ error: true, code: 400, message: "Email já cadastrado" }])
          }
        }
      }

      if (senha) {
        const senhaCrypt = bcrypt.hashSync(senha, parseInt(process.env.SALT));
      }

      const userUpdated = await prisma.usuarios.update({
        where: {
          id: id,
        },
        data: {
          nome,
          email,
          senha,
          ativo,
        },
      });

      delete userUpdated.senha;
      return res.status(201).json(userUpdated);

    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }

  static excluirUsuario = async (req, res) => {
    try {
      const erros = [];

      if (!req.params.id) {
        return res.status(400).json([{ error: true, code: 400, message: "ID do usuário é obrigatório" }])
      }

      const id = req.params.id

      const userExists = await prisma.usuarios.findFirst({
        where: {
          id: id,
        },
      });

      if (!userExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Usuário não encontrado" }])
      }

      const userExistsRotas = await prisma.usuariosRotas.findMany({
        where: {
          usuario_id: id,
        },
      });

      const userExistsGrupos = await prisma.usuariosGrupos.findMany({
        where: {
          usuario_id: id,
        },
      });

      if (userExistsRotas) {
        erros.push({ error: true, code: 400, message: "Usuário possui rotas vinculadas, a exclusão só é permitida se o usuário não possuir rotas vinculadas" })
      }

      if (userExistsGrupos) {
        erros.push({ error: true, code: 400, message: "Usuário possui grupos vinculados, a exclusão só é permitida se o usuário não possuir grupos vinculados" })
      }

      if (erros.length > 0) {
        return res.status(400).json(erros)
      }

      const userDeleted = await prisma.usuarios.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(userDeleted);

    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    }
  }
}

export default UsuariosController;