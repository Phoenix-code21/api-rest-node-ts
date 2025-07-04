import bcrypt from "bcrypt";

class PasswordHelper {
    private static SALT_ROUNDS = 10;

    public static async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    public static async compare(str: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(str, hashed);
    }
}

export default PasswordHelper;