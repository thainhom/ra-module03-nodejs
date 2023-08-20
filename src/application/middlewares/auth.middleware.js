import url from "url";
import userRepositories from "./../repositories/user.repositories.js";

export default function (request, response, next) {
    const { pathname } = url.parse(request.url, true);
    const method = request.method;

    if (
        (method === 'POST' && pathname === '/login')
        || (method === 'POST' && pathname === '/register')
    ) {
        next();
    } else {
        const apiKey = request.header("X-API-Key");

        console.log('auth middleware', apiKey)
        if (!apiKey) {
            response.status(401)
                .send({
                    error: 'Không thể xác thực.'
                });
        } else {
            userRepositories.getUserByApiKey(apiKey, (error, result) => {
                if (error) {
                    response.status(500)
                        .send({
                            error: error.message
                        });
                } else if (result.length === 0) {
                    response.status(401)
                        .send({
                            error: 'Không thể xác thực.'
                        });
                } else {
                    const auth = result[0];
                    request.auth = auth;

                    next();
                }
            });
        }
    }
}