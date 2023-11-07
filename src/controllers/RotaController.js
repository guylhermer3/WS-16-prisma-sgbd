import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class RotaController {

  static listarRotas = async (req, res) => {
    try {
      const rotas = await prisma.rotas.findMany();
      return res.status(200).json(rotas);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static listarRotaPorId = async (req, res) => {
    try {
      const rotaId = req.params.id;
      const rota = await prisma.rotas.findFirst({
        where: {
          id: rotaId,
        },
      });
      if (rota) {
        return res.status(200).json(rota);
      } else {
        return res.status(404).json({ error: true, code: 404, message: "Rota não encontrada" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static cadastrarRota = async (req, res) => {
    try {
      const { rota, dominio, verbo_get, verbo_post, verbo_put, verbo_delete, verbo_patch, ativo } = req.body;

      const erros = [];

      if (!rota) {
        erros.push({ error: true, code: 400, message: "Rota é obrigatória" });
      }
      if (!dominio) {
        erros.push({ error: true, code: 400, message: "Domínio é obrigatório" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      const rotaExists = await prisma.rotas.findFirst({
        where: {
          rota: rota,
          dominio: dominio,
        },
      });

      if (rotaExists) {
        return res.status(400).json({ error: true, code: 400, message: "Rota já cadastrada" });
      }

      const rotaCreated = await prisma.rotas.create({
        data: {
          rota,
          dominio,
          verbo_get,
          verbo_post,
          verbo_put,
          verbo_delete,
          verbo_patch,
          ativo,
        },
      });

      return res.status(201).json(rotaCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarRota = async (req, res) => {
    try {
      const rotaId = req.params.id;
      const { rota: novaRota, dominio: novoDominio, verbo_get, verbo_post, verbo_put, verbo_delete, verbo_patch, ativo } = req.body;

      const erros = [];

      if (!novaRota && !novoDominio && verbo_get === undefined && verbo_post === undefined && verbo_put === undefined && verbo_delete === undefined && verbo_patch === undefined && ativo === undefined) {
        return res.status(400).json({ error: true, code: 400, message: "Nenhum dado informado para atualização" });
      }

      const rotaAtual = await prisma.rotas.findFirst({
        where: {
          id: rotaId,
        },
      });

      if (!rotaAtual) {
        return res.status(404).json({ error: true, code: 404, message: "Rota não encontrada" });
      }

      if (novaRota && novoDominio) {
        const rotaExists = await prisma.rotas.findFirst({
          where: {
            rota: novaRota,
            dominio: novoDominio,
            id: { not: rotaId },
          },
        });
        if (rotaExists) {
          return res.status(400).json({ error: true, code: 400, message: "Rota com o mesmo nome e domínio já existe" });
        }
      }

      const rotaData = {
        rota: novaRota || rotaAtual.rota,
        dominio: novoDominio || rotaAtual.dominio,
        verbo_get: verbo_get !== undefined ? verbo_get : rotaAtual.verbo_get,
        verbo_post: verbo_post !== undefined ? verbo_post : rotaAtual.verbo_post,
        verbo_put: verbo_put !== undefined ? verbo_put : rotaAtual.verbo_put,
        verbo_delete: verbo_delete !== undefined ? verbo_delete : rotaAtual.verbo_delete,
        verbo_patch: verbo_patch !== undefined ? verbo_patch : rotaAtual.verbo_patch,
        ativo: ativo !== undefined ? ativo : rotaAtual.ativo,
      };

      const rotaUpdated = await prisma.rotas.update({
        where: {
          id: rotaId,
        },
        data: rotaData,
      });

      return res.status(200).json(rotaUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirRota = async (req, res) => {
    try {
      const rotaId = req.params.id;
      const rota = await prisma.rotas.findFirst({
        where: {
          id: rotaId,
        },
      });

      if (!rota) {
        return res.status(404).json({ error: true, code: 404, message: "Rota não encontrada" });
      }

      const gruposRotas = await prisma.gruposRotas.findMany({
        where: {
          rota_id: rotaId,
        },
      });

      const usuariosRotas = await prisma.usuariosRotas.findMany({
        where: {
          rota_id: rotaId,
        },
      });

      if (gruposRotas.length > 0 || usuariosRotas.length > 0) {
        return res.status(400).json({ error: true, code: 400, message: "Não é possível excluir a rota devido a relacionamentos com grupos ou usuários" });
      }

      const rotaDeleted = await prisma.rotas.delete({
        where: {
          id: rotaId,
        },
      });

      return res.status(200).json(rotaDeleted);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default RotaController;