import getConnection from "./../../config/connection.database.js"

const searchUsers = (params, callback) => {
    const sql = "SELECT * FROM users "
    let bindparams = []
    if (params.name) {
        const name = '%' + params.name + '%';
        sql += ' where username LIKE ? ';

    }


    const name = '%' + params.name + '%';
    const connection = getConnection();
    connection.query(`SELECT * FROM users where username LIKE ? or last_name`, [name, '%le%'], (error, result) => {
        if (error) {
            console.log(error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
    connection.end();

}
const addUser = (params, callback) => {

}
const getDetailUser = (params, callback) => {

}
const updateUser = (params, callback) => {

}
const deleteUser = (params, callback) => {

}
export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
}