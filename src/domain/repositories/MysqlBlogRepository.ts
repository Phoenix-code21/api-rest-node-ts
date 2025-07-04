import BlogDTO from "../../app/dto/BlogDTO";
import MysqlResultDTO from "../../app/dto/MysqlResultDTO";
import DatabaseRepository from "../../core/DatabaseRepository";
import ApiResultDTO from "../../app/dto/ApiResultDTO";

class MysqlBlogRepository extends DatabaseRepository {

    constructor() {
        super();
        this.setEntity("node_api.blogs");
    }

    public async create(name: string): Promise<ApiResultDTO> {

        let sql = `SELECT * FROM ${this.getEntity()} WHERE name = :name`;
        let params = {
            "name": name
        }

        const blog = await this.find<BlogDTO>(sql, params);
        if (blog != null) {
            return {
                "status": 409,
                "success": false,
                "message": "O blog informado já está criado."
            }
        }

        sql = `INSERT INTO ${this.getEntity()} (name) VALUES (:name)`;
        const result = await this.execute<MysqlResultDTO>(sql, params);

        return {
            "status": 201,
            "success": true,
            "message": `Blog [${result.insertId}] criado com sucesso!`
        };
    }

    public async update(data: BlogDTO): Promise<ApiResultDTO> {

        let sql = `SELECT * FROM ${this.getEntity()} WHERE id = :id`;
        let params = {
            "id": data.id
        }

        const result = await this.find<BlogDTO>(sql, params);
        if (result == null) {
            return {
                "status": 404,
                "success": false,
                "message": "Blog não identificado."
            }
        }

        let update_sql = `UPDATE ${this.getEntity()} SET name = :name WHERE id = :id`;
        let update_params = {
            "id": data.id,
            "name": data.name
        }

        const rows = await this.execute<MysqlResultDTO>(update_sql, update_params);
        if (rows.affectedRows > 0) {
            return {
                "status": 200,
                "success": true,
                "message": `Blog [${data.id}] atualizado com sucesso!`
            };
        }

        return {
            "status": 500,
            "success": false,
            "message": "Erro ao atualizar blog."
        };
    }

    public async delete(data: BlogDTO) {

        let sql = `SELECT * FROM ${this.getEntity()} WHERE id = :id`;
        let params = {
            "id": data.id
        }

        const result = await this.find<BlogDTO>(sql, params);
        if (result == null) {
            return {
                "status": 404,
                "success": false,
                "message": "Blog não identificado."
            }
        }

        sql = `DELETE FROM ${this.getEntity()} WHERE id = :id`;

        const rows = await this.execute<MysqlResultDTO>(sql, params);
        if (rows.affectedRows > 0) {
            return {
                "status": 200,
                "success": true,
                "message": `Blog [${data.id}] deletado com sucesso!`
            };
        }

        return {
            "status": 500,
            "success": false,
            "message": "Erro ao atualizar blog."
        };
    }

}

export default MysqlBlogRepository;