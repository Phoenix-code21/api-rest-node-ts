import { PoolConnection } from "mysql2/typings/mysql/lib/PoolConnection";
import EntityBoundRepository from "./interface/EntityBoundRepository";
import DB from "./DB";

class DatabaseRepository extends DB implements EntityBoundRepository {
    private entity: string = "";
    private connection: PoolConnection | null = null;

    /**
     * Obtem resultado único
     * @param sql 
     * @param params 
     * @returns 
     */
    public async find<T = any>(sql: string, params: object | null): Promise<T> {
        const result = await DB.query<T[]>(sql, params);
        return result.length > 0 ? result[0] : (null as T);
    }

    /**
     * Obtem multiplos resultados
     * @param sql 
     * @param params 
     * @returns 
     */
    public async findAll<T = any>(sql: string, params: object | null): Promise<T> {
        return await DB.query<T[]>(sql, params) as T;
    }

    /**
     * Executa uma query
     * @param sql 
     * @param params 
     * @returns 
     */
    public async execute<T = any>(sql: string, params: object | null): Promise<T> {
        try {
           return await DB.query<T>(sql, params) as T;
        } catch (exeception) {
            throw new Error("Erro ao executar operação no banco de dados.");
        }
    }

    /**
    * Inicia uma transação
    */
    public async beginTransaction() {
        const pool = DB.getConnection();
        this.connection = await new Promise<PoolConnection>((accept, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);
                conn.beginTransaction(err => {
                    if (err) return reject(err);
                    accept(conn);
                });
            });
        });
    }

    /**
     * Commit
     */
    public async commit() {
        if (!this.connection) throw new Error("Nenhuma transação iniciada");
        await new Promise<void>((resolve, reject) => {
            this.connection!.commit(err => {
                if (err) return reject(err);
                resolve();
            });
        });
        this.connection.release();
        this.connection = null;
    }

    /**
     * Rollback
     */
    public async rollback() {
        if (!this.connection) throw new Error("Nenhuma transação iniciada");
        await new Promise<void>((accept, reject) => {
            this.connection!.rollback(() => accept());
        });
        this.connection.release();
        this.connection = null;
    }

    /**
     * Seta um entidade
     * @param entity 
     */
    public setEntity(entity: string): void {
        this.entity = entity
    }

    /**
     * Obtem entidade
     * @returns
     */
    public getEntity(): string {
        return this.entity;
    }

}

export default DatabaseRepository;