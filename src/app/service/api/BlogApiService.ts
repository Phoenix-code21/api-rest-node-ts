import MysqlBlogRepository from "../../../domain/repositories/MysqlBlogRepository";
import BlogDTO from "../../dto/BlogDTO";
import ApiResultDTO from "../../dto/ApiResultDTO";

class BlogApiService {

    private repository: MysqlBlogRepository;

    constructor() {
        this.repository = new MysqlBlogRepository();
    }

    public async create(data: BlogDTO): Promise<ApiResultDTO> {
        return await this.repository.create(data.name);
    }

    public async update(data: BlogDTO): Promise<ApiResultDTO> {
        return await this.repository.update(data);
    }

    public async delete(data: BlogDTO): Promise<ApiResultDTO> {
        return await this.repository.delete(data);
    }

}

export default BlogApiService;