import orderServices from './../services/order.services.js'
const searchOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const { name, page, limit } = request.query;

    orderServices.searchOrder({ name: name, page: page, limit: limit }, (error, result) => {
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
const addOrder = (request, response) => {
    // admin không cần thêm oredr
}
const getDetailOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const { id } = request.params;
    orderServices.getDetailOrder(id, (error, result) => {
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
const updateOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const orderId = request.params.id;
    const requestBody = request.body;
    orderServices.updateOrder(orderId, {
        ...requestBody,

    }, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error,
            });
        } else {
            response.status(200).send()
        }
    })

}
const deleteOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const { id } = request.params
    orderServices.deleteOrder(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message
            })
        } else {
            response.status(204).send();
        }
    })

}
export default {
    searchOrder,
    addOrder,
    getDetailOrder,
    updateOrder,
    deleteOrder


}