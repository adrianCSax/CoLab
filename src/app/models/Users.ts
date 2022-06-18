export class Users {
    private creationDate : string;
    constructor(
        private tagname : string, 
        private password : string,
        private email : string
    ) {
        this.creationDate = new Date().toUTCString();
    }

    getEmail() {
     return this.email;
    }
    getTagname() {
     return this.tagname;
    }
    getPassword() {
     return this.password;
    }
}