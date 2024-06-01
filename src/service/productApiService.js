import {FetchRequest} from "./fetchRequest";

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


export const productApiService = {
    getHighlanders, getProductById, getMaterialsOfProductById
};