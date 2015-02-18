var PotListView = function () {

    var pots;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.setPots = function(list) {
        pots = list;
        this.render();
    }

    this.render = function() {
        //console.log("renderPots : " + pots);
        this.$el.html(this.template(pots));
        return this;
    };

    this.initialize();

}