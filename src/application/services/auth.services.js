import userRepositories from "../repositories/user.repositories.js"
import { comparePassword } from "../../utilities/hash.util.js";

const login = (params, callback) => {
    const { username, password, type } = params;
    // TODO: Validate

    let role = null;
    if (type === 'admin') {
        role = 1;
    } else if (type === 'customer') {
        role = 2;
    }

    userRepositories.getUserByUsernameAndRole(username, role, (error, result) => {
        if (error) {
            callback({
                code: 500,
                message: error.message,
            }, null);
        } else if (result.length === 0) {
            callback({
                code: 401,
                message: 'User not found'
            }, null);
        } else {
            const user = result[0];

            if (!comparePassword(password, user.password)) {
                callback({
                    code: 401,
                    message: 'Sai mật khẩu'
                }, null);
            } else {
                userRepositories.createApiKey(user.user_id, (error, result) => {
                    if (error) {
                        callback({
                            code: 500,
                            message: error.message,
                        }, null);
                    } else {
                        callback(null, {
                            token: result
                        });
                    }
                })
            }
        }
    });
}

const register = (params, callback) => {
    //
}

export default {
    login,
    register,
}