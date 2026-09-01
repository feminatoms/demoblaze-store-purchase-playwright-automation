const Checkout = require("./CartSummary_Checkout");
const HomeScreen = require("./HomeScreen");
const Login = require("./Login");
const ProductSummary = require("./Product_Summary");
const Signup = require("./Signup");


class POManager{
    constructor(page)
    {
        this.page = page;
        this.homescreen = new HomeScreen(page);
        this.signup = new Signup(page);
        this.login = new Login(page);
        this.productSummary = new ProductSummary(page);
        this.checkout= new Checkout(page);
    }


    getHomescreen()
        {
            return this.homescreen;
        }

    getSignup()
        {
            return this.signup;
        }

    getLogin()
        {
            return this.login;
        }

    getProductData()
        {
            return this.productSummary;
        }

    getCheckoutDetails()
        {
            return this.checkout;
        }
}

module.exports = POManager;
