var PotView = function (service) {

    var potListView;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-key', this.findByName);
        potListView = new PotListView();
        potListView.setPots(service.getPots());
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        $('.content', this.$el).html(potListView.$el);
        return this;
    };

    this.findByName = function() {
        service.findByName($('.search-key').val()).done(function(pots) {
            //console.log("pots : "+ pots);
            potListView.setPots(pots);
        });
    };

    this.initialize();
}