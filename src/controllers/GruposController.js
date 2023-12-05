import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class GrupoController {

  static listarGrupos = async (req, res) => {
    try {
      const grupos = await prisma.grupos.findMany();
      return res.status(200).json(grupos);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static listarGrupoPorId = async (req, res) => {
    try {
      const grupoId = req.params.id;
      const grupo = await prisma.grupos.findFirst({
        where: {
          id: grupoId,
        },
      });
      if (grupo) {
        return res.status(200).json(grupo);
      } else {
        return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static cadastrarGrupo = async (req, res) => {
    try {
      const { nome, descricao, ativo, unidade } = req.body;

      const erros = [];

      if (!nome) {
        erros.push({ error: true, code: 400, message: "Nome é obrigatório" });
      }
      if (!unidade) {
        erros.push({ error: true, code: 400, message: "Unidade é obrigatória" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      const grupoExists = await prisma.grupos.findFirst({
        where: {
          nome: nome,
          unidade: unidade,
        },
      });

      if (grupoExists) {
        return res.status(400).json({ error: true, code: 400, message: "Grupo já cadastrado" });
      }

      const grupoCreated = await prisma.grupos.create({
        data: {
          nome,
          descricao,
          ativo,
          unidade,
        },
      });

      return res.status(201).json(grupoCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarGrupo = async (req, res) => {
    try {
      const grupoId = req.params.id;
      const { nome, descricao, ativo, unidade } = req.body;

      const erros = [];

      if (!nome && !descricao && ativo === undefined && !unidade) {
        return res.status(400).json({ error: true, code: 400, message: "Nenhum dado informado para atualização" });
      }

      const grupo = await prisma.grupos.findFirst({
        where: {
          id: grupoId,
        },
      });

      if (!grupo) {
        return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado" });
      }

      if (nome && unidade) {
        const grupoExists = await prisma.grupos.findFirst({
          where: {
            nome: nome,
            unidade: unidade,
            id: { not: grupoId },
          },
        });
        if (grupoExists) {
          return res.status(400).json({ error: true, code: 400, message: "Grupo com o mesmo nome e unidade já existe" });
        }
      }

      const grupoData = {
        nome: nome || grupo.nome,
        descricao: descricao !== undefined ? descricao : grupo.descricao,
        ativo: ativo !== undefined ? ativo : grupo.ativo,
        unidade: unidade || grupo.unidade,
      };

      const grupoUpdated = await prisma.grupos.update({
        where: {
          id: grupoId,
        },
        data: grupoData,
      });

      return res.status(200).json(grupoUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirGrupo = async (req, res) => {
    try {
      const grupoId = req.params.id;
      const grupo = await prisma.grupos.findFirst({
        where: {
          id: grupoId,
        },
      });

      if (!grupo) {
        return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado" });
      }

      const gruposRotas = await prisma.gruposRotas.findMany({
        where: {
          grupo_id: grupoId,
        },
      });

      const usuariosGrupos = await prisma.usuariosGrupos.findMany({
        where: {
          grupo_id: grupoId,
        },
      });

      if (gruposRotas.length > 0 || usuariosGrupos.length > 0) {
        return res.status(400).json({ error: true, code: 400, message: "Não é possível excluir o grupo devido a relacionamentos com rotas ou usuários" });
      }

      const grupoDeleted = await prisma.grupos.delete({
        where: {
          id: grupoId,
        },
      });

      return res.status(200).json(grupoDeleted);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default GrupoController;