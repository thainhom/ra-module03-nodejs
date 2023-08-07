import userService from './../services/user.services.js'
const searchUsers = (request, response) => {
    const { name } = request.query;


    userService.searchUsers({ name: name }, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            })
        } else {
            response.send({
                users: result
            });
        }

    })


}
const addUser = (request, response) => {

}
const getDetailUser = (request, response) => {

}
const updateUser = (request, response) => {

}
const deleteUser = (request, response) => {

}
export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
}