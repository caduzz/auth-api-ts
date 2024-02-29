import bcrypt from 'bcryptjs';

export default class crypto {
    encrypt = async (encrypt:string) : Promise<string> => {
        const salt = await bcrypt.genSalt(10);
    
        encrypt = await bcrypt.hash(encrypt, salt);
        return encrypt
    }
    encrypt_validate = async (encrypt:string, liken_ecrypt:string) => {
        return !await bcrypt.compare(encrypt, liken_ecrypt)
    }
}