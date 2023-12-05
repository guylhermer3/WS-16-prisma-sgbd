import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class UsuariosGruposController {
  static listarUsuariosGrupos = async (req, res) => {
    try {
      const usuariosGrupos = await prisma.usuariosGrupos.findMany();
      return res.status(200).json(usuariosGrupos);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static listarUsuarioGrupoPorId = async (req, res) => {
    try {
      const usuarioGrupoId = req.params.id;
      const usuarioGrupo = await prisma.usuariosGrupos.findFirst({
        where: {
          id: usuarioGrupoId,
        },
      });
      if (usuarioGrupo) {
        return res.status(200).json(usuarioGrupo);
      } else {
        return res.status(404).json({ error: true, code: 404, message: "UsuárioGrupo não encontrado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static cadastrarUsuarioGrupo = async (req, res) => {
    try {
      const { usuario_id, grupo_id } = req.body;

      const usuarioGrupoExists = await prisma.usuariosGrupos.findFirst({
        where: {
          usuario_id,
          grupo_id,
        },
      });

      if (usuarioGrupoExists) {
        return res.status(400).json({ error: true, code: 400, message: "Relação Usuário-Grupo já existe" });
      }

      const usuarioGrupoCreated = await prisma.usuariosGrupos.create({
        data: {
          usuario_id,
          grupo_id,
        },
      });

      return res.status(201).json(usuarioGrupoCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarUsuarioGrupo = async (req, res) => {
    try {
      const usuarioGrupoId = req.params.id;
      const { usuario_id, grupo_id } = req.body;

      const usuarioGrupo = await prisma.usuariosGrupos.findFirst({
        where: {
          id: usuarioGrupoId,
        },
      });

      if (!usuarioGrupo) {
        return res.status(404).json({ error: true, code: 404, message: "UsuárioGrupo não encontrado" });
      }

      const usuarioGrupoUpdated = await prisma.usuariosGrupos.update({
        where: {
          id: usuarioGrupoId,
        },
        data: {
          usuario_id: usuario_id || usuarioGrupo.usuario_id,
          grupo_id: grupo_id || usuarioGrupo.grupo_id,
        },
      });

      return res.status(200).json(usuarioGrupoUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirUsuarioGrupo = async (req, res) => {
    try {
      const usuarioGrupoId = req.params.id;
      const usuarioGrupo = await prisma.usuariosGrupos.findFirst({
        where: {
          id: usuarioGrupoId,
        },
      });

      if (!usuarioGrupo) {
        return res.status(404).json({ error: true, code: 404, message: "UsuárioGrupo não encontrado" });
      }

      const usuarioGrupoDeleted = await prisma.usuariosGrupos.delete({
        where: {
          id: usuarioGrupoId,
        },
      });

      return res.status(200).json(usuarioGrupoDeleted);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default UsuariosGruposController;