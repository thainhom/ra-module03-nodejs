import userRepositories from "../repositories/user.repositories.js"
import { getFileExtension } from '../../utilities/upload.util.js';
const searchUsers = (params, callback) => {
    if (params.limit && !(/^[0-9]+$/.test(params.limit))) {
        callback({ message: 'Limit phải là số' }, null)
    } else if (params.page && !(/^[0-9]+$/.test(params.page))) {
        callback({ message: 'Page phải là số' }, null)
    } else {
        userRepositories.searchUsers(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

}
const addUser = async (requestBody, callback) => {
    let originalname = null;
    let path = null;

    if (requestBody.avatar) {
        originalname = requestBody.avatar.originalname;
        path = requestBody.avatar.path;
    }

    const validate = (params) => {
        let errors = {};

        // Validate username
        if (!params.username) {
            errors.username = 'Tên đăng nhập không được bỏ trống.'
        } else if (typeof params.username !== 'string') {
            errors.username = 'Tên đăng nhập phải là chuỗi'
        } else if (params.username.length < 4 || params.username.length > 10) {
            errors.username = 'Tên đăng nhập chỉ cho phép 4 đến 10 ký tự.'
        }

        // Validate email
        if (!params.email) {
            errors.email = 'Email không được bỏ trống.'
        } else if (typeof params.email !== 'string') {
            errors.email = 'Email phải là chuỗi.'
        } else if (params.email.length < 4 || params.email.length > 50) {
            errors.email = 'Email chỉ cho phép 4 đến 50 ký tự.'
        }


        // Validate first name
        if (typeof params.first_name !== 'string') {
            errors.first_name = 'Họ phải là chuỗi.'
        } else if (params.first_name && params.first_name.length > 50) {
            errors.first_name = 'Họ chỉ cho phép dưới 50 ký tự.'
        }

        // Validate last name
        if (typeof params.last_name !== 'string') {
            errors.last_name = 'Tên phải là chuỗi.'
        } else if (params.first_name && params.first_name.length > 50) {
            errors.last_name = 'Tên chỉ cho phép dưới 50 ký tự.'
        }

        // Validate password
        if (typeof params.password !== 'string') {
            errors.password = 'Mật khẩu phải là chuỗi.'
        } else if (params.password < 8 || params.password.length > 20) {
            errors.password = 'Mật khẩu chỉ cho phép từ 8 đến 20 ký tự.'
        }

        // Validate password
        if (!params.password) {
            errors.password = 'Mật khẩu không được bỏ trống.'
        } else if (typeof params.password !== 'string') {
            errors.password = 'Mật khẩu phải là chuỗi.'
        } else if (params.password < 8 || params.password.length > 20) {
            errors.password = 'Mật khẩu chỉ cho phép từ 8 đến 20 ký tự.'
        }

        if (typeof params.role !== 'string') {
            errors.role = 'Vai trò phải là chuỗi.'
        } else if (params.role !== '1' && params.role !== '2') {
            errors.role = 'Vai trò chỉ cho phép nhập 1 hoặc 2.'
        }

        return errors;
    }

    const validateErrors = validate(requestBody);

    if (Object.keys(validateErrors).length !== 0) {
        callback(validateErrors, null);
    } else {
        let avatar = null;

        if (requestBody.avatar) {
            const avatarExtension = getFileExtension(originalname);
            avatar = `avatar/${requestBody.username}.${avatarExtension}`;
            const avatarLocation = `./public/${avatar}`;

            // Copy upload file to saving location
            fs.cpSync(path, avatarLocation);
        }
        const newUser = {
            username: requestBody.username,
            email: requestBody.email,
            first_name: requestBody.first_name,
            last_name: requestBody.last_name,
            password: requestBody.password,
            role: requestBody.role,
            avatar: avatar
        };

        userRepositories.addUser(newUser, (error, result) => {
            if (path) {
                fs.rmSync(path);
            }
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        })
    }
}
const getDetailUser = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'ID phải là số' }, null)
    } else {
        userRepositories.getDetailUser(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: 'User not found' }, null);
            } else {
                callback(null, result);
            }
        });
    }


}
const updateUser = (id, updateData, callback) => {
    const validate = (params) => {
        let errors = {};

        // Validate username
        if (!params.username) {
            errors.username = 'Tên đăng nhập không được bỏ trống.'
        } else if (typeof params.username !== 'string') {
            errors.username = 'Tên đăng nhập phải là chuỗi'
        } else if (params.username.length < 4 || params.username.length > 10) {
            errors.username = 'Tên đăng nhập chỉ cho phép 4 đến 10 ký tự.'
        }

        // Validate email
        if (!params.email) {
            errors.email = 'Email không được bỏ trống.'
        } else if (typeof params.email !== 'string') {
            errors.email = 'Email phải là chuỗi.'
        } else if (params.email.length < 4 || params.email.length > 50) {
            errors.email = 'Email chỉ cho phép 4 đến 50 ký tự.'
        }


        // Validate first name
        if (typeof params.first_name !== 'string') {
            errors.first_name = 'Họ phải là chuỗi.'
        } else if (params.first_name && params.first_name.length > 50) {
            errors.first_name = 'Họ chỉ cho phép dưới 50 ký tự.'
        }

        // Validate last name
        if (typeof params.last_name !== 'string') {
            errors.last_name = 'Tên phải là chuỗi.'
        } else if (params.first_name && params.first_name.length > 50) {
            errors.last_name = 'Tên chỉ cho phép dưới 50 ký tự.'
        }

        // Validate password
        if (typeof params.password !== 'string') {
            errors.password = 'Mật khẩu phải là chuỗi.'
        } else if (params.password < 8 || params.password.length > 20) {
            errors.password = 'Mật khẩu chỉ cho phép từ 8 đến 20 ký tự.'
        }

        // Validate password
        if (!params.password) {
            errors.password = 'Mật khẩu không được bỏ trống.'
        } else if (typeof params.password !== 'string') {
            errors.password = 'Mật khẩu phải là chuỗi.'
        } else if (params.password < 8 || params.password.length > 20) {
            errors.password = 'Mật khẩu chỉ cho phép từ 8 đến 20 ký tự.'
        }

        if (typeof params.role !== 'number') {
            errors.role = 'Vai trò phải là chuỗi.'
        } else if (params.role !== 1 && params.role !== 2) {
            errors.role = 'Vai trò chỉ cho phép nhập 1 hoặc 2.'
        }

        return errors;
    }


    // Kiểm tra tính hợp lệ của dữ liệu cần cập nhật (giống validate ở phần addUser)
    const validateErrors = validate(updateData);
    if (Object.keys(validateErrors).length !== 0) {
        callback(validateErrors, null);
        console.log(validateErrors);
    } else {
        userRepositories.updateUser(id, updateData, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        })
    }

    // Gọi hàm cập nhật user từ userRepositories
    // userRepositories.updateUser(id, updateData, (error, result) => {
    //     if (error) {
    //         callback(error, null);
    //     } else {
    //         callback(null, result);
    //     }
    // });






}
const deleteUser = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'ID phải là số' }, null)
    } else {
        userRepositories.deleteUser(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.affectedRows === 0) {
                callback({ message: 'User not found' }, null);
            } else {
                callback(null, result);
            }
        });
    }

}
export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser,

}
