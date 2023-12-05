import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class UsuariosRotasController {
  static listarUsuariosRotas = async (req, res) => {
    try {
      const usuariosRotas = await prisma.usuariosRotas.findMany();
      return res.status(200).json(usuariosRotas);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static listarUsuarioRotaPorId = async (req, res) => {
    try {
      const usuarioRotaId = req.params.id;
      const usuarioRota = await prisma.usuariosRotas.findFirst({
        where: {
          id: usuarioRotaId,
        },
      });
      if (usuarioRota) {
        return res.status(200).json(usuarioRota);
      } else {
        return res.status(404).json({ error: true, code: 404, message: "UsuárioRota não encontrado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static cadastrarUsuarioRota = async (req, res) => {
    try {
      const { usuario_id, rota_id, verbo_get, verbo_post, verbo_put, verbo_delete, verbo_patch } = req.body;

      const usuarioRota = await prisma.usuariosRotas.create({
        data: {
          usuario_id,
          rota_id,
          verbo_get,
          verbo_post,
          verbo_put,
          verbo_delete,
          verbo_patch,
        },
      });

      return res.status(201).json(usuarioRota);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarUsuarioRota = async (req, res) => {
    try {
      const usuarioRotaId = req.params.id;
      const { usuario_id, rota_id, verbo_get, verbo_post, verbo_put, verbo_delete, verbo_patch } = req.body;

      const usuarioRotaAtualizado = await prisma.usuariosRotas.update({
        where: {
          id: usuarioRotaId,
        },
        data: {
          usuario_id,
          rota_id,
          verbo_get,
          verbo_post,
          verbo_put,
          verbo_delete,
          verbo_patch,
        },
      });

      return res.status(200).json(usuarioRotaAtualizado);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirUsuarioRota = async (req, res) => {
    try {
      const usuarioRotaId = req.params.id;

      await prisma.usuariosRotas.delete({
        where: {
          id: usuarioRotaId,
        },
      });

      return res.status(200).json({ message: "UsuárioRota excluído com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default UsuariosRotasController;