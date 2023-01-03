export class Register {
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public password?: string;
    public companyId:string;
   // public userConfirmPassword?: string;
    
    public Register(registerUser:Register){
        this.firstName = registerUser.firstName;
        this.lastName = registerUser.lastName;
        this.email = registerUser.email;
        this.password = registerUser.password;
        this.companyId ="";
    };
}
export class Login {
    public email?: string;
    public password?: string;
 
}
export class Token {
    public firstName?:string;
    public lastName?:string;
    public companyId?:string;
    public isLoggedIn?:boolean;
    public token?: string;
    public Token(token:Token){
        this.firstName = token.firstName;
        this.lastName = token.lastName;
        this.companyId = token.companyId;
        this.isLoggedIn = token.isLoggedIn;
        this.token = token.token;
    };
}