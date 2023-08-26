import getConnection from '../../config/connection.database.js'
import moment from 'moment';
const searchContact = (params, callback) => {
    const connection = getConnection()
    let sql = ' FROM contacts';
    const bindParams = [];
    const page = params.page || 1;
    const limit = params.limit || 5
    const offset = (page - 1) * limit;
    if (params.name) {
        const name = '%' + params.name + '%';
        sql += ' WHERE full_name LIKE ?';
        bindParams.push(name)
    }
    const countQuery = 'SELECT COUNT(1) AS total' + sql;
    connection.query(countQuery, bindParams, (error, countResult) => {
        if (error) {
            callback(error, null);

        } else if (countResult[0].total !== 0) {
            const selectColumnsQuery = 'SELECT *' + sql + ` LIMIT ${limit} OFFSET ${offset}`;
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
const addContact = (contact, callback) => {
    const connection = getConnection()
    const contacttTocreate = {
        ...contact,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    connection.query('INSERT INTO contacts SET ?', contacttTocreate, (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();

}

const getDetailContact = (id, callback) => {
    const connection = getConnection();
    connection.query('SELECT * FROM contacts where contact_id = ?', [id], (error, result) => {
        if (error) {
            callback(error, null)

        } else {
            callback(null, result)
        }
    });
    connection.end()

}
const updateContact = (contentId, params, callback) => {
    const connection = getConnection();
    let sql = 'UPDATE contacts SET full_name = ?, email = ?,content = ?, status = ?, updated_by_id = ? ';
    let bindParams = [
        params.full_name,
        params.email,
        params.content,
        params.status,
        params.updated_by_id
    ]
    sql += ' WHERE contact_id = ? '

    bindParams.push(contentId)
    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end();


}
const deleteContact = (id, callback) => {
    const connection = getConnection();
    connection.query('DELETE FROM contacts WHERE contact_id = ?', [id], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end()

}
export default {
    searchContact,
    addContact,
    getDetailContact,
    updateContact,
    deleteContact
}