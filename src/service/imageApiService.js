import { FetchRequest } from "./fetchRequest";

async function getAllImages() {
    let images = [];
    let page = 1;
    let totalPages = 1;

    try {
        while (page <= totalPages) {
            const data = await FetchRequest.get(`/api/imagess?_page=${page}`).send();
            images = [...images, ...data['hydra:member']];
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
        console.error('Error fetching images:', error);
    }

    return images;
}

function getImages() {
    return FetchRequest.get("/api/imagess").send();
}

function getImageById(id) {
    return FetchRequest.get(`/api/imagess/${id}`).send();
}

function createImage(formData) {
    return FetchRequest.post("/api/imagess")
        .withFormData(formData)
        .send();
}

export const imageApiService = {getAllImages, getImages, getImageById, createImage};
