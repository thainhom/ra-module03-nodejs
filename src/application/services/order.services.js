import orderRepositories from './../repositories/order.repositories.js';
import moment from 'moment';
const searchOrder = (params, callback) => {
    if (params.limit && !(/^[0-9]+$/.test(params.limit))) {
        callback({ message: 'Limit phải là số' }, null)
    } else if (params.page && !(/^[0-9]+$/.test(params.page))) {
        callback({ message: 'Page phải là số' }, null)
    } else {
        orderRepositories.searchOrder(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
}
const addOrder = (requestBody, callback) => {
    const validate = (params) => {
        let error = new Map();

        return error
    }
    const validateError = validate(requestBody)
    if (validateError.size !== 0) {
        callback(Object.fromEntries(validateError), null);
    } else {


        const newOrder = {
            serial_number: (new Date()).getTime(),
            user_id: requestBody.authId,
            total_price: requestBody.total_price,
            status: 1,
            note: requestBody.note,
            created_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,

        };
        orderRepositories.addOrder(newOrder, (error, result) => {
            if (error) {
                callback(error, null);

            } else {
                callback(null, result);
            }
        })
    }


}
const getDetailOrder = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'ID phải là số' }, null)
    } else {
        orderRepositories.getDetailOrder(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: 'User not found' }, null);
            } else {
                callback(null, result[0]);
            }
        });
    }

}
const updateOrder = (orderId, requestBody, callback) => {
    const validate = (params) => {
        let error = new Map();
        // validte serial_number
        if (!params.serial_number) {
            error.set('serial_number', 'Mã đơn hàng không dược để trông')
        } else if (params.serial_number.length < 2 || params.serial_number.length > 50) {
            error.set('serial_number', "Mã đơn hàng ít nhất phải 4 ký tự và không quá 50 ký tự")
            // validate total_price
        } if (!params.total_price) {
            error.set('total_price', 'Tổng giá tiền không được để trống')
        } else if (isNaN(params.total_price)) {
            error.set('total_price', 'Giá tiền bắt buộc phải là số')
            // validate status
        } if (!params.status) {
            error.set('status', 'Trạng thái đơn hàng không được bỏ trống')
        } if (isNaN(params.status)) {
            error.set('status', 'Trạng thái đang hàng đang bắt buộc phải là số ')
        }
        return error
    }
    const validateError = validate(requestBody)
    if (validateError.size !== 0) {
        callback(Object.fromEntries(validateError), null);
    }
    const updateOrder = {
        serial_number: requestBody.serial_number,
        user_id: requestBody.authId,
        total_price: requestBody.total_price,
        status: requestBody.status,
        note: requestBody.note,
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_by_id: requestBody.authId,
    };
    orderRepositories.updateOrder(orderId, updateOrder, (error, result) => {
        if (error) {
            callback(error, null);

        } else {
            callback(null, result);
        }
    })


}
const deleteOrder = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({
            message: 'Id phải là số'
        }, null)
    } else {
        orderRepositories.deleteOrder(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.affectedRows === 0) {
                callback({
                    message: 'Đơn hàng không tồn tại'
                })
            } else {
                callback(null, result)
            }
        })

    }

}
export default {
    searchOrder,
    addOrder,
    getDetailOrder,
    updateOrder,
    deleteOrder


}