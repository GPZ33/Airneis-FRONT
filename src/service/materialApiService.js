import { FetchRequest } from "./fetchRequest";

async function getAllMaterials() {
    let materials = [];
    let page = 1;
    let totalPages = 1;

    try {
        while (page <= totalPages) {
            const data = await FetchRequest.get(`/api/materials?_page=${page}`).send();
            materials = [...materials, ...data['hydra:member']];
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
        console.error('Error fetching materials:', error);
    }
    return materials;
}

function createMaterial(material) {
    return FetchRequest.post("/api/materials")
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .withBody(material)
        .send();
}

function getMaterials() {
    return FetchRequest.get("/api/materials")
        .send();
}

export const materialApiService = { createMaterial, getMaterials, getAllMaterials };