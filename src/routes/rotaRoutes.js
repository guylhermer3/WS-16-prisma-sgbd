import express from "express";
import RotaController from "../controllers/RotaController.js";

const router = express.Router();

router.get("/rotas", RotaController.listarRotas);
router.get("/rotas/:id", RotaController.listarRotaPorId);
router.post("/rotas", RotaController.cadastrarRota);
router.patch("/rotas/:id", RotaController.atualizarRota);
router.delete("/rotas/:id", RotaController.excluirRota);

/**
 * @swagger
 * paths:
 *  /rotas:
 *    get:
 *      tags:
 *        - Rotas
 *      summary: Lista todas as rotas
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Nome da rota para filtrar
 *      responses:
 *        200:
 *          description: Retorna a lista de rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Rota'
 *    post:
 *      tags:
 *        - Rotas
 *      summary: Cadastra uma nova rota
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rota'
 *      responses:
 *        201:
 *          description: Rota cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rota'
 *        400:
 *          description: Erro ao cadastrar a rota
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
 *  /rotas/{id}:
 *    get:
 *      summary: Rota encontrada por ID
 *      operationId: getRotaPorId
 *      tags:
 *        - Rotas
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna a rota encontrada
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rota'
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
 *          description: Rota não encontrada
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
 *      summary: Atualiza a rota por ID
 *      tags:
 *        - Rotas
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rota'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Rota atualizada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rota'
 *        400:
 *          description: Erro ao atualizar a rota
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
 *      summary: Exclui uma rota por ID
 *      tags:
 *        - Rotas
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota a ser excluída
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Rota excluída com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rota'
 *        400:
 *          description: Erro ao excluir a rota
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