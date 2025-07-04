import Config from './Config';
import { createPool, Pool, PoolOptions } from 'mysql2';

abstract class DB {
    private static connection: Pool;

    static {
        const options: PoolOptions = {
            host: Config.get("DB_HOST"),
            user: Config.get("DB_USER"),
            password: Config.get("DB_PASSWORD"),
            database: Config.get("DB_NAME"),
            namedPlaceholders: true
        };
        this.connection = createPool(options);
    }

    protected static getConnection(): Pool {
        return this.connection;
    }

    protected static async query<T = any>(sql: string, params: object | null): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!this.isSecure(sql)) {
                return reject("Query insegura! favor revisar sua query.");
            }

            this.getConnection().execute(sql, params || {}, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result as T);
            });
        });
    }

    private static isSecure(sql: string): boolean {
        const trimmed = sql.trim().toUpperCase();

        if (trimmed.startsWith("UPDATE") || trimmed.startsWith("DELETE")) {
            return /\sWHERE\s/i.test(trimmed);
        }

        return true;
    }
}

export default DB;
