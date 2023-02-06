export class CompanyProfileModel {
    public companyName?: string;
    public cFirstName?: string;
    public cLastName?: string;
    public streetAddress?: string;
    public city?: string;
    public state?: string ;
    public email?: string;
    public mobile?: string;
    public Register(registerUser:CompanyProfileModel){
        this.companyName = registerUser.companyName;
        this.cFirstName = "test";
        this.cLastName = "test";
        this.streetAddress = registerUser.streetAddress;
        this.city = registerUser.city;
        this.state = registerUser.state;
        this.email = registerUser.email;
        this.mobile = registerUser.mobile;
    };
}