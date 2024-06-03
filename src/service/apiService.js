import {FetchRequest} from "./fetchRequest";


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

function updateOrder(token, orderId, data) {
    const request = FetchRequest.patch("/api/orders/" + orderId);
    request.addHeader("Authorization", `Bearer ` + token);
    request.addHeader("Content-type", "application/merge-patch+json");
    request.withBody(data);
    return request.send();
}

function deleteOrder(token, orderId) {
    const request = FetchRequest.delete("/api/orders/" + orderId);
    request.addHeader("Authorization", `Bearer ` + token);
    return request.send();
}

function deleteProductFromOrder(token, orderProductId) {
    const request = FetchRequest.delete("/api/order_products/" + orderProductId);
    request.addHeader("Authorization", `Bearer ` + token);
    return request.send();
}


export const apiService = {
   getImageDetails, getOrdersOfUser, getOrderById, getOrderProducts, addOrder, updateOrder, deleteOrder, deleteProductFromOrder

};