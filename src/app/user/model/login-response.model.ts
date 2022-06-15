export class LoginResponse {
    fullName: string;
    emailId: string;
    phone: string;
    message: string;

    constructor(){
        this.fullName = "";
        this.emailId = "";
        this.phone = "";
        this.message = "";
    }
}