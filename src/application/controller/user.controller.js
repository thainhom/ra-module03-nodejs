import userService from './../services/user.services.js'
const searchUsers = (request, response) => {
    const { name, page, limit } = request.query;

    userService.searchUsers({ name: name, page: page, limit: limit }, (error, result) => {
        if (error) {
            response.status(500)
                .send({
                    error: error.message,
                });
        } else {
            response.send(result);
        }
    })


}
const addUser = (request, response) => {
    const requestBody = request.body;
    const avatar = request.file;

    userService.addUser({
        ...requestBody,
        avatar: avatar
    }, (error, result) => {
        if (error) {
            response.status(500)
                .send({
                    error: error,
                });
        } else {
            response.status(201)
                .send();
        }
    })
}
const getDetailUser = (request, response) => {
    const { id } = request.params;
    userService.getDetailUser(id, (error, result) => {
        if (error) {
            response.status(500)
                .send({
                    error: error.message,
                });
        } else {
            response.send(result);
        }
    })

}
const updateUser = (request, response) => {
    const { id } = request.params;
    const requestBody = request.body;
    userService.updateUser(id, requestBody, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error,
            })
        } else {
            response.status(204).send()
        }
    })


}
const deleteUser = (request, response) => {
    const { id } = request.params;

    userService.deleteUser(id, (error, result) => {
        if (error) {
            response.status(500)
                .send({
                    error: error.message,
                });
        } else {
            response.status(204).send();
        }
    })

}
export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
}