var Data = function() {

    var potsWithUsers;
    var user;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : "http://cp-back.herokuapp.com/";
        var deferred = $.Deferred();

        $.when(this.loadPots(), this.loadUser()).done(function() {
            deferred.resolve();
        });

        /*this.loadPots().done(function() {
            //console.log(potsWithUsers);
            this.loadUser().done(function() {
                
            });
        });*/        
        return deferred.promise();
    }

    //Va chercher tous les pots sur heroku
    this.loadPots = function() {
        var deferred = $.Deferred();

        //get sur heroku
        $.getJSON(url + 'pots.json')
        .done(function(data) {
            //enregistrement des données recues
            potsWithUsers = data;

            var deferred2 = $.Deferred();
            loadPotsWithUsers(0, deferred2)
            deferred2.done(function() {
                deferred.resolve();
            });

        });

        return deferred.promise();
    }

    this.loadUser = function() {
        var idUser = 1;
        var deferred = $.Deferred();

        //get sur heroku
        $.getJSON(url + 'users/' + idUser + '.json')
        .done(function(data) {
            //enregistrement des données recues
            user = data;
            deferred.resolve();

        });

        return deferred.promise();
    }

    function loadPotsWithUsers(index, deferred2) {
        //console.log("loadPotsWithUsers " + index);
        if(index < potsWithUsers.length) {
            updatePots(index, deferred2)
        }
        else {
            deferred2.resolve();
        }
        return deferred2.promise();
    }

    function updatePots(index, deferred2) {
        //console.log('updatePots ' + index);
        $.getJSON(url + 'users/' + potsWithUsers[index].user_id + '.json').done(function(data) {
            potsWithUsers[index].fname = data.fname;
            potsWithUsers[index].lname = data.lname;
            potsWithUsers[index].lname_initial = data.lname.substr(0,1) +'.';
            potsWithUsers[index].date_of_birth = data.date_of_birth;
            potsWithUsers[index].email = data.email;
            
            var year = Number(data.date_of_birth.substr(0,4));
            var month = Number(data.date_of_birth.substr(5,2));
            var day = Number(data.date_of_birth.substr(8,2));
            potsWithUsers[index].age = calculate_age(month, day, year)

            loadPotsWithUsers(index + 1, deferred2);
        });
    }

    this.getPots = function() {

        console.log("in getpots");

        //get sur heroku
        return potsWithUsers;
    }

    this.findByName = function (searchKey) {
        var deferred = $.Deferred();
        var results = potsWithUsers.filter(function (element) {
                var fullName = element.fname + " " + element.lname;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        //console.log("results = " + results);
        deferred.resolve(results);
        return deferred.promise();
    }

    this.findById = function (id) {
        for (var i = 0; i < potsWithUsers.length; i++) {
            if(potsWithUsers[i].id == id) {
                return potsWithUsers[i];
            }
        };
        return null;
    }

    this.donateCredit = function(idPot) {
        var deferred = $.Deferred();
        potsWithUsers[idPot].credit_collected = potsWithUsers[idPot].credit_collected + 1;
        $.post(url + "pots/"+ idPot +"/donate_credit", {"donation_credit": {"user_id" : user.id, "quantity":1}}).done(function() {
            deferred.resolve();
        });

        return deferred.promise();
    }

    this.donateCash = function(idPot, amount) {
        var deferred = $.Deferred();
        var p = this.findById(idPot);
        p.cash_collected = p.cash_collected + amount;
        $.post(url + "pots/"+ idPot +"/donate_cash", {"donation_cash": {"user_id" : user.id, "amount":amount}}).done(function() {
            deferred.resolve();
        });

        return deferred.promise();
    }
    
}

function calculate_age(birth_month,birth_day,birth_year) {
    
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}

