import { Router, Request, Response } from "express";
import AuthApiMiddleware from "../infra/middlewares/auth/AuthApiMiddleware";
import AuthApiController from "../controller/auth/AuthApiController";
import BlogApiController from "../controller/blog/BlogApiController";

const router = Router();

// Autentica usuário
router.post("/auth", (request: Request, response: Response) =>
    (new AuthApiController).auth(request, response));

// cria um blog
router.post("/create/blog", AuthApiMiddleware.handle,
    (request: Request, response: Response) => {
        (new BlogApiController).create(request, response);
    });

// atualiza dados de um blog
router.put("/update/blog", AuthApiMiddleware.handle,
    (request: Request, response: Response) => {
        (new BlogApiController).update(request, response);
    });

// deleta um blog
router.delete("/delete/blog", AuthApiMiddleware.handle,
    (request: Request, response: Response) => {
        (new BlogApiController).delete(request, response);
    }
)


export default router;