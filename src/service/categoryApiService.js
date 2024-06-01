import {FetchRequest} from "./fetchRequest";

function getCategories() {
    return FetchRequest.get("/api/categories")
        .send();
}

function getCategoryById(categoryId) {
    return FetchRequest.get("/api/categories/" + categoryId).send()
}

function getCategoryOfProduct(categoryId) {
    return FetchRequest.get(categoryId).send();
}

export const categoryApiService = {
    getCategories, getCategoryOfProduct, getCategoryById
}