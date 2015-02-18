var Data = function() {

    var potsWithUsers;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : "http://cp-back.herokuapp.com/";
        var deferred = $.Deferred();

        this.loadPots().done(function() {
            console.log(potsWithUsers);
            deferred.resolve();
        })        
        return deferred.promise();
    }


    // this.initialize = function() {
    //     // var deferred = $.Deferred();
    //     // //var combinedPromise = $.when(loadShops(), loadUser(1));

    //     // loadPots.done(function () {
    //     //     deferred.resolve();
    //     // });

    //     // return deferred.promise();

    //   this.$el = $('<div/>');
    // };

    //Va chercher tous les pots sur heroku
    this.loadPots = function() {
        var deferred = $.Deferred();

        console.log("in loadpots");

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

