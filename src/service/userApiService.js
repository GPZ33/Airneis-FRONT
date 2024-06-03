import {FetchRequest} from "./fetchRequest";


function getUsers(token) {
    const request = FetchRequest.get("/api/users");
    request.addHeader("Authorization", `Bearer ${token}`);
    return request.send();
}

function updateUser(userId, token, data) {
    const request = FetchRequest.put("/api/users/" + userId);
    request.addHeader("Authorization", `Bearer ${token}`);
    request.addHeader("Content-type", "application/merge-patch+json")
    request.withBody(data);
    return request.send();
}

function getUserAddresses(token) {
    const request = FetchRequest.get("/api/adresses");
    request.addHeader("Authorization", `Bearer ${token}`);
    return request.send();
}

function addAddress(token,data) {
    const request = FetchRequest.post("/api/adresses");
    request.addHeader("Authorization", `Bearer ${token}`);
    request.addHeader("Content-type", "application/ld+json")
    request.withBody(data);
    return request.send();
}

function getAddressById(token, addressId) {
    const request = FetchRequest.get("/api/adresses/" + addressId);
    request.addHeader("Authorization", `Bearer ${token}`);
    return request.send();
}

export const userApiService = {
    getUsers, updateUser, getUserAddresses, addAddress, getAddressById
};