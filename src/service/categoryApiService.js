import {FetchRequest} from "./fetchRequest";

function createCategory(category) {
    return FetchRequest.post("/api/categories")
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .withBody(category)
        .send();
}

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

function deleteCategory(category) {
    const categoryId = category['@id'].split('/').pop();
    return FetchRequest.delete(`/api/categories/${categoryId}`).send();
}

function putCategory(category) {
    const categoryId = category['@id'].split('/').pop();
    return FetchRequest.put(`/api/categories/${categoryId}`)
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .withBody(category)
        .send();
}

export const categoryApiService = {
    createCategory, getCategories, getCategoryOfProduct, getCategoryById, deleteCategory, putCategory
}