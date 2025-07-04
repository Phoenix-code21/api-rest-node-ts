import { error } from "console";
import DatabaseRepository from "../../core/DatabaseRepository";
import User from "../entities/User";
import UserDTO from "../../app/dto/UserDTO";

class MysqlUserRepository extends DatabaseRepository {

    constructor() {
        super();
        this.setEntity("node_api.users");
    }

    /**
     * Obtem dados do usuário pelo username
     * @param username 
     * @returns
     */
    public async findByUsername(username: string): Promise<User> {

        let sql: string = `SELECT * FROM ${this.getEntity()} WHERE username = :username`;
        let params: object = {
            "username": username,
        }

        let result = await this.find<UserDTO>(sql, params);

        if (result == null) {
            throw new Error("Credencial de usuário inválida");
        }

        return new User(result.id, result.username, result.password);
    }

}

export default MysqlUserRepository;