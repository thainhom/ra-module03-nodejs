import productRepositories from "../repositories/product.repositories.js";

const searchProduct = (params, callback) => {
    if (params.limit && !(/^[0-9]+$/.test(params.limit))) {
        callback({ message: 'limit phải là số' }, null)
    } else if (params.page && !(/^[0-9]+$/.test(params.page))) {
        callback({ message: 'Page phải là số' }, null)
    } else {
        productRepositories.searchProduct(params, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        })
    }
}
const addProduct = (requestBody, callback) => {
    const validate = (params) => {
        let errors = Map()
        // validate sku 
        if (!params.sku) {
            errors.set('msp không được bỏ trống')
        }
        // validate name 
        if (!params.name) {
            errors.set('Tên sản phẩm không được bỏ trống')
        }
        // validate category
        if (!params.category) {
            errors.set('Phân loại sản phẩm không được để trống')
        }
        // validate description 
        if (!params.description) {
            errors.set('mô tả không được để trống')
        }
        // validate unit_price
        if (!params.unit_price) {
            errors.set('giá tiền không được để trống')
        } else if (typeof params.unit_price !== 'number') {
            errors.set('giá tiền phải là số')
        }
        // validate image
        if (!params.image) {
            errors.set('Hinh ảnh không được để trống ')
        }
        return errors

    }
    const validateErrors = validate(requestBody)
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        productRepositories.addProduct({
            sku: params.sku,
            name: params.name,
            category: params.category,
            description: params.description,
            unit_price: params.unit_price,
            image: params.image,

        }, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(result, null);
            }
        })
    }

}
const getDetailProduct = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({
            message: 'ID phải là số'
        }, null)
    } else {
        productRepositories.getDetailProduct(id, (error, result) => {
            if (error) {
                callback(error, null)
            } else if (result.length === 0) {
                callback({
                    message: 'user not found'
                }, null)
            }
            else {
                callback(null, result)
            }
        })
    }

}
const updateProduct = (request, response) => {

}
const deleteProduct = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'Id phải là số' }, null)
    } else {
        productRepositories.deleteProduct(id, (error, result) => {
            if (error) {
                callback(
                    error, null
                );
            } else {
                callback(null, result)
            }
        })
    }


}
export default {
    searchProduct,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}