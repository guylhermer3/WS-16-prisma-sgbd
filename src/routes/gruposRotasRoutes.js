import express from "express";
import GruposRotasController from "../controllers/GruposRotasController.js";

const router = express.Router();

router.get("/grupos-rotas", GruposRotasController.listarGruposRotas);
router.get("/grupos-rotas/:id", GruposRotasController.listarGrupoRotaPorId);
router.post("/grupos-rotas", GruposRotasController.cadastrarGrupoRota);
router.patch("/grupos-rotas/:id", GruposRotasController.atualizarGrupoRota);
router.delete("/grupos-rotas/:id", GruposRotasController.excluirGrupoRota);

/**
 * @swagger
 * tags:
 *   name: GruposRotas
 *   description: Operações relacionadas aos Grupos de Rotas
 * 
 * definitions:
 *   GrupoRota:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID do Grupo de Rota
 *       grupo_id:
 *         type: string
 *         description: ID do Grupo relacionado
 *       rota_id:
 *         type: string
 *         description: ID da Rota relacionada
 *       verbo_get:
 *         type: boolean
 *         description: Permissão de verbo GET para o Grupo de Rota
 *       verbo_post:
 *         type: boolean
 *         description: Permissão de verbo POST para o Grupo de Rota
 *       verbo_put:
 *         type: boolean
 *         description: Permissão de verbo PUT para o Grupo de Rota
 *       verbo_delete:
 *         type: boolean
 *         description: Permissão de verbo DELETE para o Grupo de Rota
 *       verbo_patch:
 *         type: boolean
 *         description: Permissão de verbo PATCH para o Grupo de Rota
 * 
 * /grupos-rotas:
 *   get:
 *     tags: [GruposRotas]
 *     summary: Lista todos os Grupos de Rotas
 *     responses:
 *       200:
 *         description: Retorna a lista de Grupos de Rotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/GrupoRota'
 *   post:
 *     tags: [GruposRotas]
 *     summary: Cria um novo Grupo de Rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/GrupoRota'
 *     responses:
 *       201:
 *         description: Grupo de Rota criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/GrupoRota'
 *       400:
 *         description: Erro ao criar o Grupo de Rota
 *       500:
 *         description: Erro interno do servidor
 * 
 * /grupos-rotas/{id}:
 *   get:
 *     tags: [GruposRotas]
 *     summary: Obtém um Grupo de Rota por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Grupo de Rota a ser obtido
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna o Grupo de Rota encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/GrupoRota'
 *       400:
 *         description: ID inválido ou não encontrado
 *       404:
 *         description: Grupo de Rota não encontrado
 * 
 *   //PATCH e DELETE...
 */

export default router;