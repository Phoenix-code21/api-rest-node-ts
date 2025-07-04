import { Request, Response } from "express";
import BlogDTO from "../../app/dto/BlogDTO";
import BlogApiService from "../../app/service/api/BlogApiService";

class BlogApiController {

    /**
     * Cria um blog
     * @param request 
     * @param response 
     */
    public async create(request: Request, response: Response): Promise<void> {
        const data: BlogDTO = request.body;

        try {
            const json: any = await (new BlogApiService).create(data);
            response.status(json.status).json(json)
        } catch (exception: any) {
            response.status(400).json({
                "success": false,
                "message": exception.message
            })
        }

    }

    /**
     * Atualiza um blog
     * @param request 
     * @param response 
     */
    public async update(request: Request, response: Response): Promise<void> {
        try {
            const data = request.body;
            const json: any = await (new BlogApiService).update(data);
            response.status(json.status).json(json)
        } catch (exception: any) {
            response.status(400).json({
                "success": false,
                "message": exception.message
            })
        }
    }

    /**
     * Deleta um blog
     * @param request 
     * @param response 
     */
    public async delete(request: Request, response: Response): Promise<void> {
        try {
            const data = request.body;
            const json: any = await (new BlogApiService).delete(data);
            response.status(json.status).json(json)
        } catch (exception: any) {
            response.status(400).json({
                "success": false,
                "message": exception.message
            })
        }
    }

}

export default BlogApiController;