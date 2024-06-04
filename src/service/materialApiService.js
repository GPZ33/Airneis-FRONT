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

function createMaterial(material, token) {
    return FetchRequest.post("/api/materials")
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .addHeader("Authorization", `Bearer ` + token)
        .withBody(material)
        .send();
}

function putMaterial(material, token) {
    const materialId = material['@id'].split('/').pop();
    return FetchRequest.put(`/api/materials/${materialId}`)
        .addHeader("Content-Type", "application/ld+json")
        .addHeader("Accept", "application/ld+json")
        .addHeader("Authorization", `Bearer ` + token)
        .withBody(material)
        .send();
}

function getMaterials() {
    return FetchRequest.get("/api/materials")
        .send();
}

function deleteMaterial(material, token) {
    const materialId = material['@id'].split('/').pop();
    return FetchRequest.delete(`/api/materials/${materialId}`)
        .addHeader("Authorization", `Bearer ` + token)
        .send();
}

export const materialApiService = { createMaterial, getMaterials, getAllMaterials, putMaterial, deleteMaterial };