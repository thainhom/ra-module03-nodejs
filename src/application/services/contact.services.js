import contactRepositories from "../repositories/contact.repositories.js";

const searchContact = (params, callback) => {
    if (params.limit && !(/^[0-9]+$/.test(params.limit))) {
        callback({ message: 'Limit phải là số' }, null)
    } else if (params.page && !(/^[0-9]+$/.test(params.page))) {
        callback({ message: 'Page phải là số' }, null)
    } else {
        contactRepositories.searchContact(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

}
const addContact = (requestBody, callback) => {
    const validate = (params) => {
        let errors = new Map();
        if (!params.full_name) {
            errors.set('full_name', 'Tên người liên hệ không được bỏ trống')
        }
        if (!params.email) {
            errors.set('email', 'email người liên hệ không được bỏ trống')
        }
        if (!params.content) {
            errors.set('content', 'Nội dung người liên hệ không được bỏ trông')
        }

        return errors
    }

    const validateErrors = validate(requestBody)
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);

    } else {
        const newContent = {
            full_name: requestBody.full_name,
            email: requestBody.email,
            content: requestBody.content,
            status: 1,
            created_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,

        }
        contactRepositories.addContact(newContent, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        })
    }




}
const getDetailContact = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'ID phải là số' }, null)
    } else {
        contactRepositories.getDetailContact(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: 'Liên hệ không tồn tại' }, null);
            } else {
                callback(null, result[0]);
            }
        });
    }


}
const updateContact = (contentId, requestBody, callback) => {
    const validate = (params) => {
        let errors = new Map();
        if (!params.full_name) {
            errors.set('full_name', 'Tên người liên hệ không được bỏ trống')
        }
        if (!params.email) {
            errors.set('email', 'email người liên hệ không được bỏ trống')
        }
        if (!params.content) {
            errors.set('content', 'Nội dung người liên hệ không được bỏ trông')
        }
        if (!params.status) {
            errors.set('status', 'Trạng thái không được bỏ trống')
        }
        return errors
    }

    const validateErrors = validate(requestBody)
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);

    } else {
        const updateContact = {
            full_name: requestBody.full_name,
            email: requestBody.email,
            content: requestBody.content,
            status: requestBody.status,
            updated_by_id: requestBody.authId,

        }
        contactRepositories.updateContact(contentId, updateContact, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        })

    }
}

const deleteContact = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'ID phải là số' }, null)
    } else {
        contactRepositories.deleteContact(id, (error, result) => {
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
    searchContact,
    addContact,
    getDetailContact,
    updateContact,
    deleteContact
}