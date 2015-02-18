var PotDonView = function(service, id) {

    var pot

    this.initialize = function() {
        //pot.percentage_collected =  pot.cash_collected / pot.cash_demand * 100;
        this.$el = $('<div/>');
        this.$el.on('click' , '.donGratuit', this.donGratuit);
    };

    this.render = function() {
        pot = service.findById(id);
        console.log(pot);
        this.$el.html(this.template(pot));
        return this;
    };

    this.donGratuit = function() {
        console.log("donGratuit");
        service.donateCredit(id).done(function() {
            alert("Crédit envoyé !\n" + pot.fname + "et Coud'Pouce vous remercient.");
            window.location.href = "#pots/"+ pot.id;
        });
    }

    donMoney = function(amount) {
        if(amount == undefined) {
            amount = document.amountForm.amount.value;
        }
        console.log("donCash : " + amount);
        service.donateCash(id, amount).done(function() {
            alert("Vous avez envoyé " + amount + " euros !\n" + pot.fname + "et Coud'Pouce vous remercient.");
            window.location.href = "#pots/"+ pot.id;
        });
        
    }

    this.initialize();

}