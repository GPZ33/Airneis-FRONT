import { FetchRequest } from "./fetchRequest";

function getImages() {
    return FetchRequest.get("/api/imagess").send();
}

function getImageById(id) {
    return FetchRequest.get(`/api/imagess/${id}`).send();
}

export const imageApiService = {
    getImages,
    getImageById
};
