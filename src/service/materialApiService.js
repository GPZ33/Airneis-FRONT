import {FetchRequest} from "./fetchRequest";

function getMaterials() {
    return FetchRequest.get("/api/materials")
        .send();
}

export const materialApiService = {
    getMaterials
}