
function cartModel() {
    var self = this;
    self.products = koProducts;

    //build cart rows
    self.cart = ko.observableArray(koCart);

    //add to cart
    self.addToCart = function(){
        self.cart.push(
            {
                id:this.id,name: this.name,price: this.price,quantity:1,subtotal:this.price
            }
        )
    }

    //remove from cart
    self.removeFromCart = function(){
        self.cart.remove(this);
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
