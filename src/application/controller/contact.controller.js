import contactServices from './../services/contact.services.js';

const searchContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const { name, page, limit } = request.query;

    contactServices.searchContact({ name: name, page: page, limit: limit }, (error, result) => {
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
const addContact = (request, response) => {


    const requestBody = request.body;


    contactServices.addContact({
        ...requestBody,
        authId: request.auth.user_id,
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
    });


}
const getDetailContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }

    const { id } = request.params;
    contactServices.getDetailContact(id, (error, result) => {
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
const updateContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const userId = request.params.id;
    const requestBody = request.body;
    contactServices.updateContact(userId, {
        ...requestBody,
        authId: request.auth.user_id,
    }, (error, result) => {
        if (error) {
            response.status(500)
                .send({
                    error: error,
                });
        } else {
            response.status(200)
                .send();
        }
    });


}
const deleteContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }

    const { id } = request.params;

    contactServices.deleteContact(id, (error, result) => {
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
    searchContact,
    addContact,
    getDetailContact,
    updateContact,
    deleteContact
}