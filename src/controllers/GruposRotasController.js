import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class GruposRotasController {
  static listarGruposRotas = async (req, res) => {
    try {
      const gruposRotas = await prisma.gruposRotas.findMany();
      return res.status(200).json(gruposRotas);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static listarGrupoRotaPorId = async (req, res) => {
    try {
      const grupoRotaId = req.params.id;
      const grupoRota = await prisma.gruposRotas.findFirst({
        where: {
          id: grupoRotaId,
        },
      });
      if (grupoRota) {
        return res.status(200).json(grupoRota);
      } else {
        return res.status(404).json({ error: true, code: 404, message: "GrupoRota não encontrado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static cadastrarGrupoRota = async (req, res) => {
    try {
      const { grupo_id, rota_id, verbo_get, verbo_post, verbo_put, verbo_delete, verbo_patch } = req.body;

      const grupoRota = await prisma.gruposRotas.create({
        data: {
          grupo_id,
          rota_id,
          verbo_get,
          verbo_post,
          verbo_put,
          verbo_delete,
          verbo_patch,
        },
      });

      return res.status(201).json(grupoRota);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarGrupoRota = async (req, res) => {
    try {
      const grupoRotaId = req.params.id;
      const { grupo_id, rota_id, verbo_get, verbo_post, verbo_put, verbo_delete, verbo_patch } = req.body;

      const grupoRotaAtualizado = await prisma.gruposRotas.update({
        where: {
          id: grupoRotaId,
        },
        data: {
          grupo_id,
          rota_id,
          verbo_get,
          verbo_post,
          verbo_put,
          verbo_delete,
          verbo_patch,
        },
      });

      return res.status(200).json(grupoRotaAtualizado);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirGrupoRota = async (req, res) => {
    try {
      const grupoRotaId = req.params.id;

      await prisma.gruposRotas.delete({
        where: {
          id: grupoRotaId,
        },
      });

      return res.status(200).json({ message: "GrupoRota excluído com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default GruposRotasController;