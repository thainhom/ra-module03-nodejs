import moment from 'moment';
import getConnection from '../../config/connection.database.js'
const searchOrder = (params, callback) => {
    const connection = getConnection()
    let sql = ' FROM orders'
    const bindParams = [];
    const page = params.page || 1;
    const limit = params.limit || 5;
    // công thức tính phân tranh lấy trang hiên tại - đi 1 rôi nhân vs số limit 
    const offset = (page - 1) * limit
    if (params.name) {
        const name = '%' + params.name + '%';
        sql += ' WHERE serial_number OR total_price LIKE ?';
        bindParams.push(name)
    }
    const countQuery = 'SELECT COUNT(1) AS total' + sql;


    connection.query(countQuery, bindParams, (error, countResult) => {
        if (error) {
            callback(error, null);
        } else if (countResult[0].total !== 0) {
            const selectColumnsQuery = 'SELECT order_id, serial_number, user_id, order_at,total_price, status, note, created_at, created_by_id, updated_at, updated_by_id' + sql + ` LIMIT ${limit} OFFSET ${offset}`;
            connection.query(selectColumnsQuery, bindParams, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, {
                        total: countResult[0].total,
                        records: result
                    });
                }
            });
            connection.end();
        } else {
            callback(null, {
                total: 0,
                records: []
            });
            connection.end();
        }
    });
}
const addOrder = (order, orderDetails, callback) => {
    const connection = getConnection();

    const insertOrder = (order, orderDetails) => {
        const orderToCreate = {
            ...order,
            order_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

        connection.query('INSERT INTO orders SET ?', orderToCreate, (error, result) => {
            if (error) {
                rollbackTransaction();
                callback(error, null);
            } else {
                const orderId = result.insertId;
                insertOrderDetails(orderId, orderDetails);
            }
        });
    }

    const insertOrderDetails = (orderId, orderDetails) => {
        const newOrderDetails = orderDetails.map(orderDetail => {
            return [
                orderId,
                orderDetail.sequence_no,
                orderDetail.product_id,
                orderDetail.sku,
                orderDetail.name,
                orderDetail.unit_price,
                orderDetail.quantity,
                orderDetail.sub_total_price,
            ]
        });

        connection.query(
            'INSERT INTO order_details (order_id, sequence_no, product_id, sku, name, unit_price, quantity, sub_total_price) VALUES ?',
            [newOrderDetails],
            (error, result) => {
                if (error) {
                    rollbackTransaction();
                    callback(error, null);
                } else {
                    commitTransaction();
                    callback(null, result);
                }
            });
    }

    const startTransaction = (order, orderDetails) => {
        connection.query('START TRANSACTION', (error, result) => {
            if (error) {
                connection.end();
                callback(error, null);
            } else {
                insertOrder(order, orderDetails)
            }
        });
    }

    const rollbackTransaction = () => {
        connection.query('ROLLBACK', (error, result) => {
            if (error) {
                callback(error, null);
            }
            connection.end();
        });
    }

    const commitTransaction = () => {
        connection.query('COMMIT', (error, result) => {
            if (error) {
                callback(error, null);
            }
            connection.end();
        });
    }

    startTransaction(order, orderDetails);
}
const getDetailOrder = (id, callback) => {
    const connection = getConnection();
    connection.query(`
    SELECT 
        orders.*,
        users.username,
        users.first_name,
        users.last_name
    FROM orders 
    LEFT JOIN users ON orders.user_id = users.user_id
    WHERE orders.order_id = ?
    `, [id], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();

}
const getOrderDetailsByOrderId = (orderId, callback) => {
    const connection = getConnection();
    connection.query('SELECT * FROM order_details WHERE order_id = ?', [orderId], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();

}
const updateOrder = (orderId, params, callback) => {
    const connection = getConnection();
    let sql = 'UPDATE orders SET serial_number = ?, total_price = ?, status = ?, note = ?,updated_at = ?, updated_by_id = ?';
    let bindParams = [
        params.serial_number,
        params.total_price,
        params.status,
        params.note,
        params.updated_at,
        params.updated_by_id
    ]
    sql += ' WHERE order_id = ?'
    bindParams.push(orderId)
    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }

    })
    connection.end();

}
const deleteOrder = (id, callback) => {
    const connection = getConnection();
    connection.query('DELETE FROM orders WHERE order_id=?', [id], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();

}
export default {
    searchOrder,
    addOrder,
    getDetailOrder,
    updateOrder,
    deleteOrder,
    getOrderDetailsByOrderId
}