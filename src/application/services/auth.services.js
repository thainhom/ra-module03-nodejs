import userRepository from "../repositories/user.repositories.js";
import { comparePassword } from "../../utilities/hash.util.js";
import { randomString } from "../../utilities/string.util.js";

const checkExistUsername = (username) => {
    return new Promise((resolve, reject) => {
        userRepository.getUserByUsername(username, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result);
            }
        });
    });
};
const checkExistUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        userRepository.getUserByEmail(email, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result);
            }
        });
    });
};

const register = async (params, callback) => {
    const validate = async (params) => {
        let errors = new Map();
        // validate password
        if (!params.password) {
            errors.set('password', 'password không được để trống');
        } else if (typeof params.password !== "string") {
            errors.set('password', 'password phải là dạng chuỗi');
        } else if (params.password.length < 8 || params.password.length > 20) {
            errors.set('password', 'password phải ít nhất 8 ký tự và không quá 20 ký tự');
        }
        // validate username
        if (!params.username) {
            errors.set('username', 'Tên đăng nhập không được bỏ trống.');
        } else if (typeof params.username !== 'string') {
            errors.set('username', 'Tên đăng nhập phải là chuỗi.');
        } else if (params.username.length < 4 || params.username.length > 10) {
            errors.set('username', 'Tên đăng nhập chỉ cho phép 4 đến 10 ký tự.');
        } else {
            await checkExistUsername(params.username)
                .then(result => {
                    if (result.length !== 0) {
                        errors.set('username', 'Tên đăng nhập đã tồn tại.');
                    }
                }).catch(error => {
                    errors.set('username', error.message);
                });
        }
        // Validate email
        if (!params.email) {
            errors.set('email', 'Email không được bỏ trống.');
        } else if (typeof params.email !== 'string') {
            errors.set('email', 'Email phải là chuỗi.');
        } else if (params.email.length < 4 || params.email.length > 50) {
            errors.set('email', 'Email chỉ cho phép 4 đến 50 ký tự.');
        } else {
            await checkExistUserEmail(params.email)
                .then(result => {
                    if (result.length !== 0) {
                        errors.set('email', 'email đả tồn tại');
                    }
                }).catch(error => {
                    errors.set('email', error.message);
                });
        }
        return errors
    }
    const validateErrors = await validate(params)
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null)
    } else {
        userRepository.register(params, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        })
    }


}


const login = (params, callback) => {
    const { username, password, type } = params;
    // TODO: Validate

    let role = null;
    if (type === 'admin') {
        role = 1;
    } else if (type === 'customer') {
        role = 2;
    }

    userRepository.getUserByUsernameAndRole(username, role, (error, result) => {
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
                const apiKey = user.user_id + randomString(128);

                userRepository.createApiKey(user.user_id, apiKey, (error, result) => {
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

const getAuth = (authId, callback) => {
    userRepository.getDetailUser(authId, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result[0]);
        }
    })
}

const logout = (authId, callback) => {
    userRepository.createApiKey(authId, null, (error, result) => {
        if (error) {
            callback({
                code: 500,
                message: error.message,
            }, null);
        } else {
            callback(null, {});
        }
    });
}



export default {
    login,
    logout,
    getAuth,
    register,
}