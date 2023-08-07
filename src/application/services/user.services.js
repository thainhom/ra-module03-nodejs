import userRepositories from "../repositories/user.repositories.js"

const searchUsers = (params, callback) => {

    userRepositories.searchUsers(params, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }

    })

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