function grandTotal(obj) {
    var self = this;
    self.grandTotal = ko.pureComputed(function() {
        var total = 0;
        for(var i=0; i<obj.length; i++) {
    		total += parseInt(obj[i]["price"]*obj[i]["quantity"]);
    	}
        return total;
    });
}

function cartModel() {
    this.cart = ko.observable(koCart);
    this.products = koProducts;

    grandTotal(this.cart());

}
ko.applyBindings(new cartModel());
