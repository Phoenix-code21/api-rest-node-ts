import dotenv from 'dotenv';

class Config {

    static {
        dotenv.config();
    }

    /**
     * Obtem variavel de ambiente
     * @param key 
     * @returns 
     */
    public static get(key: string): any {
        return process.env[key] ?? undefined;
    }
}

export default Config;