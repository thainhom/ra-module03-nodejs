import productServices from './../services/product.services.js';
const searchProduct = (request, response) => {
    const { name, page, limit, orderPrice, categories } = request.query;
    productServices.searchProduct({
        name: name,
        page: page,
        limit: limit,
        orderPrice: orderPrice,
        categories: categories
    }, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            })
        } else {
            response.send(
                result
            )
        }
    })

}
const addProduct = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const requsetBody = request.body;
    const image = request.file;

    productServices.addProduct({
        ...requsetBody,
        image: image,
        authId: request.auth.user_id
    }, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error,
            })
        } else {
            response.status(201).send();
        }
    })
}
const getDetailProduct = (request, response) => {
    const { id } = request.params;
    productServices.getDetailProduct(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            })
        } else {
            response.send(result)
        }
    })

}
const updateProduct = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }

    const { id } = request.params;
    const requestbody = request.body;

    productServices.updateProduct(id, {
        ...requestbody,
        authId: request.auth.user_id,
    }, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error
            })
        } else {
            response.status(204).send()
        }
    })

}
const deleteProduct = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403)
            .send({
                error: 'Không có quyền truy cập.'
            })

        return;
    }
    const { id } = request.params;
    productServices.deleteProduct(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            })
        } else {
            response.status(204).send()
        }
    })
}
export default {
    searchProduct,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}