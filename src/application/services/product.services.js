import productRepositories from "../repositories/product.repositories.js";
import { getFileExtension } from '../../utilities/upload.util.js';
import fs from 'fs';
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
    let originalname = null;
    let path = null;
    if (requestBody.image) {
        originalname = requestBody.image.originalname;
        path = requestBody.image.path;
    }
    const validate = (params) => {
        let errors = {}
        // validate sku 
        if (!params.sku) {
            errors.sku = 'msp không được bỏ trống'
        }
        // validate name 
        if (!params.name) {
            errors.name = 'Tên sản phẩm không được bỏ trống'
        }
        // validate category
        if (!params.category) {
            errors.category = 'Phân loại sản phẩm không được để trống'
        }
        // validate description 
        if (!params.description) {
            errors.description = 'mô tả không được để trống'
        }
        // validate unit_price
        if (!params.unit_price) {
            errors.unit_price = 'giá tiền không được để trống'
        } else if (isNaN(params.unit_price)) {
            errors.unit_price = 'giá tiền phải là số'
        }
        // validate image
        if (!params.image) {
            errors.image = 'Hinh ảnh không được để trống '
        }
        return errors

    }
    const validateErrors = validate(requestBody)
    if (Object.keys(validateErrors).length !== 0) {
        callback(validateErrors, null)
    }
    else {
        let image = null
        if (requestBody.image) {
            const imageExtension = getFileExtension(originalname)
            image = `image/${requestBody.sku}.${imageExtension}`;
            const imageLocation = `./public/${image}`;
            fs.cpSync(path, imageLocation)
        }
        const newProduct = {
            sku: requestBody.sku,
            name: requestBody.name,
            category: requestBody.category,
            description: requestBody.description,
            unit_price: requestBody.unit_price,
            image: image,
            created_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,
        };
        productRepositories.addProduct(
            newProduct
            , (error, result) => {
                if (path) {
                    fs.rmSync(path)
                }
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, result);
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
                callback(null, result[0])
            }
        })
    }

}
const updateProduct = (productId, updateData, callback) => {
    let originalname = null;
    let path = null;
    if (updateData.image) {
        originalname = updateData.image.originalname;
        path = updateData.image.path
    }
    const validate = (params) => {
        let errors = {}
        // validate sku
        if (!params.sku) {
            errors.sku = 'msp không được để trống'
        }
        if (!params.name) {
            errors.name = 'tên sản phẩm không được để trống'
        }
        if (!params.category) {
            errors.category = 'loại sản phẩm không được để trống'
        }
        if (!params.unit_price) {
            errors.unit_price = 'giá tiền không được để trống'
        }
        if (!params.description) {
            errors.description = 'mô tả không được để trống'
        }

        return errors
    }
    const validateErros = validate(updateData)
    if (Object.keys(validateErros).length !== 0) {
        callback(validateErros, null)
        console.log(validateErros);
    } else {
        let image = null
        if (updateData.image) {
            const imageExtension = getFileExtension(originalname)
            image = `image/${updateData.sku}.${imageExtension}`
            const imageLocation = `./public/${image}`
            // Copy upload file to saving location
            fs.cpSync(path, imageLocation);
        }
        const updateProduct = {
            sku: updateData.sku,
            name: updateData.name,
            category: updateData.category,
            unit_price: updateData.unit_price,
            description: updateData.description,
            image: image,
            updated_by_id: updateData.authId,
        }
        productRepositories.updateProduct(productId, updateProduct, (error, result) => {
            if (path) {
                fs.rmdirSync(path)

            } if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        })
    }


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
            } else if (result.affcetedRows == 0) {
                callback({
                    message: 'sản phẩm không tồn tại'
                })
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