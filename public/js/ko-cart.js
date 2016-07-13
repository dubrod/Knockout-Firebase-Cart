
function cartModel() {
    var self = this;

    //assign products array to observable data
    var products_obsrv = [];
    for(var i=0;i<koProducts.length; i++){
        var prow = [];
        var prow = {
            id:    ko.observable(koProducts[i].id),
            name:  ko.observable(koProducts[i].name),
            price: ko.observable(koProducts[i].price),
            desc:  ko.observable(koProducts[i].desc),
            link:  ko.observable(koProducts[i].link),
            img:   ko.observable(koProducts[i].img),
            quantity: ko.observable(koProducts[i].quantity),
            options: ko.observableArray(koProducts[i].options),
            chosenOptions: ko.observable()
        };
        products_obsrv.push(prow);
    }
    self.products = ko.observableArray(products_obsrv);

    //assign cart array
    var ls = localStorage.getItem('cartStorage');
    if(ls){
        var koCart = JSON.parse(localStorage.getItem('cartStorage'));
    } else {
        var koCart = [];
    }
    self.cart = ko.observableArray(koCart);

    //add to cart
    self.addToCart = function(){
        if(this.chosenOptions()){
            var formattedOption = ""+this.chosenOptions()+"";
            var formattedOption = formattedOption.split("-");
            var formattedName = ""+this.name()+" - "+formattedOption[0];
        } else {
            var formattedName = this.name();
        }

        self.cart.push(
            {
                id:this.id(),
                name: formattedName,
                price: this.price(),
                quantity:this.quantity(),
                subtotal:((parseInt(this.price()))*(parseInt(this.quantity())))
            }
        )
        localStorage.setItem('cartStorage',JSON.stringify(self.cart()));
    }

    //remove from cart
    self.removeFromCart = function(){
        self.cart.remove(this);
        localStorage.setItem('cartStorage',JSON.stringify(self.cart()));
    }

    self.updatePrice = function(){
        var optValue = ""+this.chosenOptions()+"";
        var optValue = optValue.split("-");
        if(optValue[1]){
            var formatPrice = optValue[1].replace("$", "");
            this.price(parseInt(formatPrice));
        }
    }

    //make grandtotal
    self.grandTotal = function() {
        var total = 0;
        for(var i=0; i<self.cart().length; i++) {
    		total += parseInt(self.cart()[i]["price"]*self.cart()[i]["quantity"]);
    	}
        return total;
    };

}


ko.applyBindings(new cartModel());
