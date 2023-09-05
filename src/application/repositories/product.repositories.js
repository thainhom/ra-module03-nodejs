import getConnection from "../../config/connection.database.js"
import moment from 'moment';
const searchProduct = (params, callback) => {
    const connection = getConnection()
    const { orderPrice, categories } = params;
    let orderby = ' ORDER BY `unit_price`';
    if (orderPrice === 'DESC') {
        orderby += ' DESC';
    }

    let sql = ' FROM products WHERE 1';
    const bindParams = [];
    const page = params.page || 1;
    const limit = params.limit || 5
    const offset = (page - 1) * limit;
    if (params.name) {

        const name = '%' + params.name + '%';
        sql += ' AND name LIKE ?';
        bindParams.push(name)

    }
    if
        (categories && categories.length > 0) {
        sql += ' AND category IN (?)';
        bindParams.push(categories)
    }

    const countQuery = 'SELECT COUNT(1) AS total' + sql;
    connection.query(countQuery, bindParams, (error, countResult) => {
        if (error) {
            callback(error, null);

        } else if (countResult[0].total !== 0) {
            const selectColumnsQuery = 'SELECT *' + sql + orderby + ` LIMIT ${limit} OFFSET ${offset}`;
            connection.query(selectColumnsQuery, bindParams, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, {
                        total: countResult[0].total,
                        records: result
                    })
                }
            })
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


const addProduct = (product, callback) => {
    const connection = getConnection()
    const productTocreate = {
        ...product,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    connection.query('INSERT INTO products SET ?', productTocreate, (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();

}
const getDetailProduct = (id, callback) => {
    const connection = getConnection();
    connection.query('SELECT * FROM products where product_id = ?', [id], (error, result) => {
        if (error) {
            callback(error, null)

        } else {
            callback(null, result)
        }
    });
    connection.end()
}
const updateProduct = (product_id, params, callback) => {
    const connection = getConnection();
    let sql = 'UPDATE products SET sku = ?, name = ?, category = ?, unit_price = ?, description = ?, updated_by_id = ? ';
    let bindParams = [
        params.sku,
        params.name,
        params.category,
        params.unit_price,
        params.description,
        params.updated_by_id
    ]
    if (params.image) {

        sql += ', image = ?';
        bindParams.push(params.image)
    }
    sql += ' WHERE product_id = ? '
    bindParams.push(product_id);
    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();
}

const deleteProduct = (id, callback) => {
    const connection = getConnection();
    connection.query('DELETE FROM products WHERE product_id = ?', [id], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end()
}
export default {
    searchProduct,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}