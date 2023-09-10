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
    const { cart, note, authId } = requestBody;
    const validate = (params) => {
        let error = new Map();

        return error
    }
    const validateError = validate(cart)
    if (validateError.size !== 0) {
        callback(Object.fromEntries(validateError), null);
    } else {
        let totalPrice = 0;

        const orderDetails = cart.map((item, index) => {
            const subTotalPrice = item.unit_price * item.quantity;
            totalPrice += subTotalPrice;

            return {
                sequence_no: index + 1,
                product_id: item.product_id,
                sku: item.sku,
                name: item.name,
                unit_price: item.unit_price,
                quantity: item.quantity,
                sub_total_price: subTotalPrice
            }
        })
        const newOrder = {
            serial_number: (new Date()).getTime(),
            user_id: requestBody.authId,
            total_price: totalPrice,
            status: 1,
            note: requestBody.note,
            created_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,
        };

        orderRepositories.addOrder(newOrder, orderDetails, (error, result) => {
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
        orderRepositories.getDetailOrder(id, (error, orderResult) => {
            if (error) {
                callback(error, null);
            } else if (orderResult.length === 0) {
                callback({ message: 'Đơn hàng không tồn tại' }, null);
            } else {
                orderRepositories.getOrderDetailsByOrderId(id, (error, orderDetailResult) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        const order = orderResult[0];
                        order.order_details = orderDetailResult;

                        callback(null, order);
                    }
                })
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
const deleteOrderDetail = (order_detail_id, callback) => {
    if (!(/^[0-9]+$/.test(order_detail_id))) {
        callback({
            message: 'Id phải là số'
        }, null)
    } else {
        orderRepositories.deleteOrderDetail(order_detail_id, (error, result) => {
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
    deleteOrder,
    deleteOrderDetail


}