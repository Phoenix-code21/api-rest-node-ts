import MysqlUserRepository from "../../../domain/repositories/MysqlUserRepository";
import PasswordHelper from "../../../utils/PasswordHelper";
import AuthUserDTO from "../../dto/AuthUserDTO";
import JwtHelper from "../../../utils/JwtHelper";
import UserApiInterface from "../../interface/api/UserApiInterface";

class UserApiService implements UserApiInterface {

    private repository: MysqlUserRepository;

    constructor() {
        this.repository = new MysqlUserRepository();
    }

    public async auth(data: AuthUserDTO): Promise<{ token: string; }> {

        const result = await this.repository.findByUsername(data.username);

        if (!await PasswordHelper.compare(data.password, (result.getPassword()))) {
            throw new Error("Credencial de senha inválida");
        }

        return { token: JwtHelper.sign({ id: result.getId(), username: result.getUsername() }) }
    }
}

export default UserApiService;