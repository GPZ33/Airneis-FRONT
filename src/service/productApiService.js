import {FetchRequest} from "./fetchRequest";

function getProducts(page) {
    return FetchRequest.get(`/api/products?_page=${page}`)
        .send();
}

async function getAllProducts() {
    let products = [];
    let page = 1;
    let totalPages = 1;

    try {
        while (page <= totalPages) {
            const data = await FetchRequest.get(`/api/products?_page=${page}`).send();
            products = [...products, ...data['hydra:member']];
            if (data['hydra:view'] && data['hydra:view']['hydra:last']) {
                const lastPageLink = data['hydra:view']['hydra:last'];
                const match = lastPageLink.match(/_page=(\d+)/);
                if (match && match[1]) {
                    totalPages = parseInt(match[1]);
                }
            }

            page += 1;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return products;
}


function getProductById(productId) {
    return FetchRequest.get(productId)
        .send();
}

function getMaterialsOfProductById(materialId){
    return FetchRequest.get(materialId).send();
}

function createProduct(product) {
    return FetchRequest.post("/api/products")
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .withBody(product)
        .send();
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
    getProducts, getAllProducts, getProductById, getMaterialsOfProductById, createProduct, putProduct, deleteProduct, deleteProducts
};