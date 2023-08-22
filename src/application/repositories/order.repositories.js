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
const addOrder = (order, callback) => {
    const connection = getConnection();

    const orderToCreate = {
        ...order,
        order_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    connection.query('INSERT INTO orders SET ?', orderToCreate, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });

    connection.end();
}
const getDetailOrder = (id, callback) => {
    const connection = getConnection();
    connection.query('SELECT * FROM orders ?', [id], (error, result) => {
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
    deleteOrder


}