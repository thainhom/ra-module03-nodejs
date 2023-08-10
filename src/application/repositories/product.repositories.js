import getConnection from "../../config/connection.database.js"
const searchProduct = (params, callback) => {
    const connection = getConnection()
    let sql = ' FROM products';
    const bindParams = [];
    const page = params.page || 1;
    const limit = params.limit || 5
    const offset = (page - 1) * limit;
    if (params.name) {
        const name = '%' + params.name + '%';
        sql += ' WHERE name LIKE ?';
        bindParams.push(name)
    }
    sql += ` LIMIT ${limit} OFFSET ${offset}`
    connection.query('SELECT COUNT(1) AS total' + sql, bindParams, (error, countResult) => {
        if (error) {
            callback(error, null);

        } else if (countResult[0].total !== 0) {
            connection.query('SELECT *' + sql, bindParams, (error, result) => {
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
        created_by_id: 1, // TODO: chờ làm login
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_by_id: 1, // TODO: chờ làm login
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    connection.query('INSERT INTO PRODUCTS SET ?', productTocreate, (error, result) => {
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
const updateProduct = (request, response) => {

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