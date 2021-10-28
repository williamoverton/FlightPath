export default class FPResponse {
    constructor() {
        this._body = "";
        this.status = 0;
        this.headers = new Headers();
    }
    send(body) {
        this._body = body;
    }
    get body() {
        return this._body;
    }
    // Set sensible values if things are not set, such as 200 status code if the user doesnt set a status code.
    setDefaults() {
        if (this.status == 0) {
            if (this.body.length == 0) {
                this.status = 404;
                this._body = "Not Found";
            }
            else {
                this.status = 200;
            }
        }
    }
}
