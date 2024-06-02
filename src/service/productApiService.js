import {FetchRequest} from "./fetchRequest";

function getProducts(page) {
    return FetchRequest.get(`/api/products?_page=${page}`)
        .send();
}

function getHighlanders() {
    return FetchRequest.get("/api/products")
        .send();
}

function getProductById(productId) {
    return FetchRequest.get(productId)
        .send();
}

function getMaterialsOfProductById(materialId){
    return FetchRequest.get(materialId).send();
}

function putProduct(product) {
    const productId = product['@id'].split('/').pop();
    return FetchRequest.put(`/api/products/${productId}`)
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .withBody(product)
        .send();
}

function deleteProduct(product){
    const productId = product['@id'].split('/').pop();
    return FetchRequest.delete(`/api/products/${productId}`)
        .send();
}

function deleteProducts(productIds){
    const deleteRequests = productIds.map(productId => {
        const id = productId.split('/').pop();
        return FetchRequest.delete(`/api/products/${id}`).send();
    });

    return Promise.all(deleteRequests);
}

export const productApiService = {
    getProducts, getHighlanders, getProductById, getMaterialsOfProductById, putProduct, deleteProduct, deleteProducts
};