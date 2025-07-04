import { Request, Response } from "express";
import Controller from "../../core/Controller";
import AuthUserDTO from "../../app/dto/AuthUserDTO";
import UserApiService from "../../app/service/api/UserApiService";

class AuthApiController extends Controller {

    public async auth(request: Request, response: Response): Promise<void> {
        const data: AuthUserDTO = request.body;
        try {
            const json = await (new UserApiService).auth(data);

            response.status(200).json({
                "success": true,
                "data": json
            });
        } catch (exception: any) {
            response.status(401).json({
                "success": false,
                "message": exception.message
            })
        }
    }
}

export default AuthApiController;