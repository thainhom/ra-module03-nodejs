import productServices from './../services/product.services.js';
const searchProduct = (request, response) => {
    const { name, page, limit } = request.query;
    productServices.searchProduct({
        name: name,
        page: page,
        limit: limit
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
    const requsetBody = request.body;
    productServices.addProduct(requsetBody, (error, result) => {
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

}
const deleteProduct = (request, response) => {
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