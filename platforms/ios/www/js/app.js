
//document.addEventListener("deviceready", onDeviceReady, false);
onDeviceReady();


function onDeviceReady() {

    // Local variables
    WelcomeView.prototype.template = Handlebars.compile($("#welcome-tpl").html());
    PotView.prototype.template = Handlebars.compile($("#pot-tpl").html());
    PotListView.prototype.template = Handlebars.compile($("#pot-list-tpl").html());


    var service = new Data();

    service.initialize().done(function () {
        router.addRoute('', function() {
            $('body').html(new WelcomeView().render().$el);
            
        });

        router.addRoute('pots', function() {
            $('body').html(new PotView(service).render().$el);
        });

        router.start();
    });
    


};



/*

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());

    var service = new EmployeeService();
    var slider = new PageSlider($('body'));
    service.initialize().done(function () {
        router.addRoute('', function() {
            console.log('empty');
            slider.slidePage(new HomeView(service).render().$el);
        });

        router.addRoute('employees/:id', function(id) {
            console.log('details');
            service.findById(parseInt(id)).done(function(employee) {
                slider.slidePage(new EmployeeView(employee).render().$el);
            });
        });

        
    });

*/