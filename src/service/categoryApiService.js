import {FetchRequest} from "./fetchRequest";

function createCategory(category, token) {
    return FetchRequest.post("/api/categories")
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .addHeader("Authorization", `Bearer ` + token)
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

function deleteCategory(category, token) {
    const categoryId = category['@id'].split('/').pop();
    return FetchRequest.delete(`/api/categories/${categoryId}`).addHeader("Authorization", `Bearer ` + token).send();
}

function putCategory(category, token) {
    const categoryId = category['@id'].split('/').pop();
    return FetchRequest.put(`/api/categories/${categoryId}`)
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .addHeader("Authorization", `Bearer ` + token)
        .withBody(category)
        .send();
}

export const categoryApiService = {
    createCategory, getCategories, getCategoryOfProduct, getCategoryById, deleteCategory, putCategory
}