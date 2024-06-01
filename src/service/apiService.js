import {FetchRequest} from "./fetchRequest";
const token = localStorage.getItem("token");


function getImageDetails(imageId) {
    return FetchRequest.get(imageId).send();
}

function getOrdersOfUser() {
    const request = FetchRequest.get("/api/orders");
    request.addHeader("Authorization", `Bearer ${token}`);
    return request.send();
}

function getOrderById(orderId) {
    const request = FetchRequest.get("/api/orders/" + orderId);
    request.addHeader("Authorization", `Bearer ${token}`);
    return request.send();
}


export const apiService = {
   getImageDetails, getOrdersOfUser, getOrderById

};