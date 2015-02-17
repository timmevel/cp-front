var Data = function() {

    var url = 'http://cp-back.herokuapp.com/';
    var pots;   


    this.initialize = function() {
        var deferred = $.Deferred();
        //var combinedPromise = $.when(loadShops(), loadUser(1));

        loadPots.done(function () {
            deferred.resolve();
        });

        return deferred.promise();
    }

    //Va chercher tous les pots sur heroku
    function loadPots() {
        var deferred = $.Deferred();

        //get sur heroku
        $.getJSON(url + 'pots'.json)
        .done(function(data) {
            //enregistrement des données recues
            pots = data;

            


            deferred.resolve();
            });
        });

        return deferred.promise();
    }

    
}