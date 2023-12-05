import express from "express";
import UsuariosRotasController from "../controllers/UsuariosRotasController.js";

const router = express.Router();

router.get("/usuarios-rotas", UsuariosRotasController.listarUsuariosRotas);
router.get("/usuarios-rotas/:id", UsuariosRotasController.listarUsuarioRotaPorId);
router.post("/usuarios-rotas", UsuariosRotasController.cadastrarUsuarioRota);
router.patch("/usuarios-rotas/:id", UsuariosRotasController.atualizarUsuarioRota);
router.delete("/usuarios-rotas/:id", UsuariosRotasController.excluirUsuarioRota);

/**
 * @swagger
 * tags:
 *   name: UsuariosRotas
 *   description: Endpoints para operações relacionadas a UsuariosRotas
 * 
 * components:
 *   schemas:
 *     UsuarioRota:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: string
 *           description: ID do usuário associado à rota
 *         rota_id:
 *           type: string
 *           description: ID da rota associada ao usuário
 *         verbo_get:
 *           type: boolean
 *           description: Permissão de verbo GET para a rota
 *         verbo_post:
 *           type: boolean
 *           description: Permissão de verbo POST para a rota
 *         verbo_put:
 *           type: boolean
 *           description: Permissão de verbo PUT para a rota
 *         verbo_delete:
 *           type: boolean
 *           description: Permissão de verbo DELETE para a rota
 *         verbo_patch:
 *           type: boolean
 *           description: Permissão de verbo PATCH para a rota
 *       required:
 *         - usuario_id
 *         - rota_id
 *         - verbo_get
 *         - verbo_post
 *         - verbo_put
 *         - verbo_delete
 *         - verbo_patch
 * 
 * /usuarios-rotas:
 *   get:
 *     summary: Lista todos os relacionamentos entre usuários e rotas
 *     tags: [UsuariosRotas]
 *     responses:
 *       200:
 *         description: Retorna a lista de relacionamentos entre usuários e rotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioRota'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 * 
 *   post:
 *     summary: Cria um novo relacionamento entre usuário e rota
 *     tags: [UsuariosRotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRota'
 *     responses:
 *       201:
 *         description: Relacionamento entre usuário e rota criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRota'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 * 
 * /usuarios-rotas/{id}:
 *   get:
 *     summary: Busca um relacionamento entre usuário e rota pelo ID
 *     tags: [UsuariosRotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do relacionamento entre usuário e rota
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna o relacionamento entre usuário e rota encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRota'
 *       404:
 *         description: Relacionamento entre usuário e rota não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 * 
 *   patch:
 *     summary: Atualiza um relacionamento entre usuário e rota pelo ID
 *     tags: [UsuariosRotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do relacionamento entre usuário e rota
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRota'
 *     responses:
 *       200:
 *         description: Relacionamento entre usuário e rota atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRota'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 * 
 *   delete:
 *     summary: Exclui um relacionamento entre usuário e rota pelo ID
 *     tags: [UsuariosRotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do relacionamento entre usuário e rota
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relacionamento entre usuário e rota excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 */
 
export default router;