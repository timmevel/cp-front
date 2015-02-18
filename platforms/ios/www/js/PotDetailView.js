var PotDetailView = function(service, id) {

    this.initialize = function() {
        pot = service.findById(id);
        pot.percentage_collected =  Math.round(pot.cash_collected / pot.cash_demand * 100);
        this.$el = $('<div/>');
    };

    this.render = function() {
        pot = service.findById(id);
        console.log(pot);
        this.$el.html(this.template(pot));
        return this;
    };

    this.initialize();

}