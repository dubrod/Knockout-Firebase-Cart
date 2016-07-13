
function cartModel() {
    var self = this;

    //assign products array
    self.products = koProducts;

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
        self.cart.push(
            {
                id:this.id,name: this.name,price: this.price,quantity:this.quantity,subtotal:((parseInt(this.price))*(parseInt(this.quantity)))
            }
        )
        //database.ref('/opencarts/'+cartId).set({ cart: self.cart() });
        localStorage.setItem('cartStorage',JSON.stringify(self.cart()));
    }

    //remove from cart
    self.removeFromCart = function(){
        self.cart.remove(this);
        localStorage.setItem('cartStorage',JSON.stringify(self.cart()));
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
