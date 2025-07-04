import { NextFunction, Request, Response } from "express";
import JwtHelper from "../../../utils/JwtHelper";

class AuthApiMiddleware {

    public static handle(request: Request, response: Response, next: NextFunction): void {
        const authorization: any = request.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            response.status(401).json({
                success: false,
                message: "Token não fornecido"
            });
            return;
        }

        const bearer = authorization.split(" ")[1];

        try {
            const payload = JwtHelper.verify(bearer);
            if (payload == null) {
                response.status(401).json({
                    success: false,
                    message: "Token inválido ou expirado"
                });
                return;
            }

            next();
        } catch (exception: any) {
            response.status(401).json({
                success: false,
                message: "Token inválido ou expirado"
            });
        }
    }

}

export default AuthApiMiddleware;