export class RegisterRequest {
    fullName: string;
    phone: string;
    emailId: string;
    password: string;

    constructor() {
        this.fullName = "";
        this.phone = "";
        this.emailId = "";
        this.password = "";
    }
}