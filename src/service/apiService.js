import {FetchRequest} from "./fetchRequest";

function getHighlanders() {
    return FetchRequest.get("api/products")
        .send();
}

export const apiService = {getHighlanders};