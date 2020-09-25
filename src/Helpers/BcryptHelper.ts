import bcrypt from 'bcrypt';

class BcryptHelper {

    static async hash(param) {

        
        return await bcrypt.hash(param, 10)
    }

    static async compare(param, hashValue) {
        return bcrypt.compare(param, hashValue)
    }

}

export default BcryptHelper;