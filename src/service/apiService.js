import {FetchRequest} from "./fetchRequest";
const token = localStorage.getItem("token");


function getImageDetails(imageId) {
    return FetchRequest.get(imageId).send();
}

function getOrdersOfUser(token) {
    const request = FetchRequest.get("/api/orders");
    request.addHeader("Authorization", `Bearer `+ token);
    return request.send();
}

function getOrderById(orderId, token) {
    const request = FetchRequest.get("/api/orders/" + orderId);
    request.addHeader("Authorization", `Bearer ` + token);
    return request.send();
}

function getOrderProducts(token) {
    const request = FetchRequest.get("/api/order_products");
    request.addHeader("Authorization", `Bearer ` + token);
    return request.send();
}

function addOrder(token, data) {
    const request = FetchRequest.post("/api/orders");
    request.addHeader("Authorization", `Bearer ` + token);
    request.addHeader("Content-type", "application/ld+json");
    request.withBody(data);
    return request.send();
}


export const apiService = {
   getImageDetails, getOrdersOfUser, getOrderById, getOrderProducts, addOrder

};