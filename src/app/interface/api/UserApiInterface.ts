import AuthUserDTO from "../../dto/AuthUserDTO";

interface UserApiInterface {

    // autenticação via API
    auth(data: AuthUserDTO): Promise<{ token: string }>;
}

export default UserApiInterface;