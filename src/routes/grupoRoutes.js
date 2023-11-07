import express from "express";
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router();

router.get("/grupos", GrupoController.listarGrupos);
router.get("/grupos/:id", GrupoController.listarGrupoPorId);
router.post("/grupos", GrupoController.cadastrarGrupo);
router.patch("/grupos/:id", GrupoController.atualizarGrupo);
router.delete("/grupos/:id", GrupoController.excluirGrupo);

/**
 * @swagger
 * paths:
 *  /grupos:
 *    get:
 *      tags:
 *        - Grupos
 *      summary: Lista todos os grupos
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Nome do grupo para filtrar
 *      responses:
 *        200:
 *          description: Retorna a lista de grupos
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Grupo'
 *    post:
 *      tags:
 *        - Grupos
 *      summary: Cadastra um novo grupo
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grupo'
 *      responses:
 *        201:
 *          description: Grupo cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        400:
 *          description: Erro ao cadastrar o grupo
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        500:
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *  /grupos/{id}:
 *    get:
 *      summary: Grupo encontrado por ID
 *      tags:
 *        - Grupos
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna o grupo encontrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        400:
 *          description: ID inválido ou não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: Grupo não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *    patch:
 *      summary: Atualiza o grupo por ID
 *      tags:
 *        - Grupos
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grupo'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Grupo atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        400:
 *          description: Erro ao atualizar o grupo
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        500:
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *    delete:
 *      summary: Exclui um grupo por ID
 *      tags:
 *        - Grupos
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo a ser excluído
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Grupo excluído com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        400:
 *          description: Erro ao excluir o grupo
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        500:
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 */

export default router;