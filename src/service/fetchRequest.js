export class FetchRequest {
    constructor(ressource, method) {
        this.url = "http://127.0.0.1:8000" + ressource;
        this.method = method;
        this.headers = {};
    }

    addHeader(name, value){
        this.headers[name] = value;
        return this;
    }

    withBody(body){
        this.body = JSON.stringify(body);
        return this;
    }

    withFormData(formData) {
        this.body = formData;
        return this;
    }

    send(){
        return fetch(this.url, {method: this.method, headers: this.headers, body: this.body}).then(res => {
            if(!res.ok){
                throw new Error(`An error occurred while the request : ` + res.body);
            }

            return res.json();
        });
    }
}

FetchRequest.get = function (ressource){
    return new FetchRequest(ressource, "GET");
}

FetchRequest.post = function (ressource) {
    return new FetchRequest(ressource, "POST");
}

FetchRequest.put = function (ressource, body) {
    return new FetchRequest(ressource, "PUT").withBody(body);
}

FetchRequest.delete = function (ressource){
    return new FetchRequest(ressource, "DELETE");
}

FetchRequest.patch = function (ressource) {
    return new FetchRequest(ressource, "PATCH");
}

