define(['backbone','studentiM/studenti','studentiV/studenti','studentiM/dodaj-student', 'studentiV/dodaj-student','studentiM/student-info', 'studentiV/student-info','studentiM/semestar', 'studentiV/semestar','studentiM/skolarina', 'studentiV/skolarina','studentiM/upis-ocjene', 'studentiV/upis-ocjene'], 
    function(Backbone, StudentiModel, StudentiView, DodajStudentModel, DodajStudentView, StudentInfoModel, StudentInfoView, StudentSemestarModel, StudentSemestarView, SkolarinaModel, SkolarinaView, UpisOcjeneModel, UpisOcjeneView) {
    var StudentiRuter = Backbone.Router.extend({
        routes: {
            'studenti/': 'studenti',
            'studenti/dodaj-student/': 'dodaj',
            'studenti/:student/': 'prikazi',
            'studenti/:student/obrisi/': 'obrisi',
            'studenti/:student/semestri/': 'semestar',
            'studenti/:student/semestri/aktiviraj/': 'aktiviraj',
            'studenti/:student/semestri/:predmet/': 'upisOcjene',
            'studenti/:student/skolarina/': 'skolarina'
        },
        initialize: function() {
            
        },
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
               delete this.currentView.model;
               this.currentView.remove();
                this.currentView = null;
            }
            window.pogled = view;
            this.currentView = view;
            //this.currentView.setElement($('.sadrzajPodaci')).render();
           // var html = this.currentView.render().el;
            //$('.sadrzajPodaci').append();
            //this.currentView.render();
            //$('.sadrzajPodaci').append(this.currentView.el);
        },
        studenti: function(){
            this.changeView(new StudentiView({model: new StudentiModel()}));
        },
        dodaj: function() {
            this.changeView(new DodajStudentView({ model: new DodajStudentModel()})); 
        },
        prikazi: function(student){
           this.changeView( new StudentInfoView({model: new StudentInfoModel({urlRoot:'/administracija/' + Backbone.lokacija()})}));
        },
        obrisi: function() {
            if(confirm('Da li ste sigurni da zelite obrisati?')){
            $.ajax({
                type: "GET",
                url: '/administracija/' + Backbone.lokacija(),
            }).done(function() {
                Backbone.trigger('ruta:lokacija',[Backbone.lokacija(2)]);
            });}
        },
        semestar: function(){
            this.changeView( new StudentSemestarView({model: new StudentSemestarModel({url: '/administracija/' + Backbone.lokacija()})}));
        },
        upisOcjene: function(){
            this.changeView( new UpisOcjeneView({model: new UpisOcjeneModel({url: '/administracija/' + Backbone.lokacija()})}));
        },
        aktiviraj: function(){
            if(confirm('Potvrdnim odgovorom izvrsiti ce se aktivacija narednog semestra.')){
            $.ajax({
                type: "GET",
                url: '/administracija/' + Backbone.lokacija(),
            }).done(function() {
                Backbone.trigger('ruta:lokacija',[Backbone.lokacija(1)]);
            });}
        },
         skolarina: function(){
            this.changeView( new SkolarinaView({model: new SkolarinaModel({url: '/administracija/' + Backbone.lokacija()})}));
        },
    });
    return StudentiRuter;
});