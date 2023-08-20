import authService from "../services/auth.services.js";

const login = (request, response) => {
    const requestBody = request.body;

    const params = {
        username: requestBody.username,
        password: requestBody.password,
        type: requestBody.type,
    }

    authService.login(params, (error, result) => {
        if (error) {
            response.status(error.code)
                .send({
                    error: error.message,
                });
        } else {
            response.send(result);
        }
    })
}

const getAuth = (request, response) => {
    authService.getAuth(request.auth.user_id, (error, result) => {
        if (error) {
            response.status(401)
                .send({
                    error: error,
                });
        } else {
            response.send(result);
        }
    })
}

const logout = (request, response) => {
    authService.logout(request.auth.user_id, (error, result) => {
        if (error) {
            response.status(401)
                .send({
                    error: error,
                });
        } else {
            response.send(result);
        }
    })
}

const register = (request, response) => {
    //
}

export default {
    login,
    getAuth,
    logout,
    register,
}