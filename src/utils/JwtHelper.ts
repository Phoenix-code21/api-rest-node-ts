import jwt from "jsonwebtoken";
import Config from "../core/Config";

const secret = Config.get("JWT_SECRET") || "secret";
const expiresIn = Config.get("JWT_EXPIRES_IN") || "1h";

const JwtHelper = {
    // assinatura
    sign(payload: object): string {
        return jwt.sign(payload, secret, { expiresIn });
    },

    // validação da assinatura
    verify(token: string): any {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            return null;
        }
    }
};

export default JwtHelper;
