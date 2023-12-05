import express from "express";
import UsuariosGruposController from "../controllers/UsuariosGruposController.js";

const router = express.Router();

router.get("/usuarios-grupos", UsuariosGruposController.listarUsuariosGrupos);
router.get("/usuarios-grupos/:id", UsuariosGruposController.listarUsuarioGrupoPorId);
router.post("/usuarios-grupos", UsuariosGruposController.cadastrarUsuarioGrupo);
router.patch("/usuarios-grupos/:id", UsuariosGruposController.atualizarUsuarioGrupo);
router.delete("/usuarios-grupos/:id", UsuariosGruposController.excluirUsuarioGrupo);

/**
 * @swagger
 * tags:
 *   name: UsuariosGrupos
 *   description: Operações relacionadas aos Usuários e Grupos
 * 
 * definitions:
 *   UsuarioGrupo:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID do Usuário-Grupo
 *       usuario_id:
 *         type: string
 *         description: ID do Usuário relacionado
 *       grupo_id:
 *         type: string
 *         description: ID do Grupo relacionado
 * 
 * /usuarios-grupos:
 *   get:
 *     tags: [UsuariosGrupos]
 *     summary: Lista todos os Usuários-Grupos
 *     responses:
 *       200:
 *         description: Retorna a lista de Usuários-Grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/UsuarioGrupo'
 *   post:
 *     tags: [UsuariosGrupos]
 *     summary: Cria um novo Usuário-Grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UsuarioGrupo'
 *     responses:
 *       201:
 *         description: Usuário-Grupo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UsuarioGrupo'
 *       400:
 *         description: Erro ao criar o Usuário-Grupo
 *       500:
 *         description: Erro interno do servidor
 * 
 * /usuarios-grupos/{id}:
 *   get:
 *     tags: [UsuariosGrupos]
 *     summary: Obtém um Usuário-Grupo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Usuário-Grupo a ser obtido
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna o Usuário-Grupo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UsuarioGrupo'
 *       400:
 *         description: ID inválido ou não encontrado
 *       404:
 *         description: Usuário-Grupo não encontrado
 * 
 *   patch:
 *     tags: [UsuariosGrupos]
 *     summary: Atualiza um Usuário-Grupo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Usuário-Grupo a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UsuarioGrupo'
 *     responses:
 *       200:
 *         description: Usuário-Grupo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UsuarioGrupo'
 *       400:
 *         description: Erro ao atualizar o Usuário-Grupo
 *       500:
 *         description: Erro interno do servidor
 * 
 *   delete:
 *     tags: [UsuariosGrupos]
 *     summary: Exclui um Usuário-Grupo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Usuário-Grupo a ser excluído
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário-Grupo excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UsuarioGrupo'
 *       400:
 *         description: Erro ao excluir o Usuário-Grupo
 *       500:
 *         description: Erro interno do servidor
 */

export default router;