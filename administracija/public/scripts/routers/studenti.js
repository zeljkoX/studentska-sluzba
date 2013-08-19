define(['backbone','studentiM/studenti','studentiV/studenti','studentiM/dodaj-student', 'studentiV/dodaj-student','studentiM/student-info', 'studentiV/student-info','studentiM/semestar', 'studentiV/semestar','studentiM/skolarina', 'studentiV/skolarina'], 
    function(Backbone, StudentiModel, StudentiView, DodajStudentModel, DodajStudentView, StudentInfoModel, StudentInfoView, StudentSemestarModel, StudentSemestarView, SkolarinaModel, SkolarinaView) {
    var StudentiRuter = Backbone.Router.extend({
        routes: {
            'studenti/dodaj-student/': 'dodaj',
            'studenti/:student/': 'prikazi',
            'studenti/:student/obrisi/': 'obrisi',
            'studenti/:student/semestri/': 'semestar',
            'studenti/:student/semestri/aktiviraj/': 'aktiviraj',
            'studenti/:student/skolarina/': 'skolarina'
        },

        initialize: function() {
            this.lokacija = '/administracija/studenti/';
        this.changeView(new StudentiView({model: new StudentiModel()}));
        },
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
                this.currentView.remove();
                this.currentView = null;
            }
            this.currentView = view;
            this.currentView.delegateEvents();
            $('.sadrzajPodaci').empty().append(this.currentView.render().el);
        },

        dodaj: function() {
            this.changeView(new DodajStudentView({ model: new DodajStudentModel()})); 
        },
        prikazi: function(student){
           this.changeView( new StudentInfoView({model: new StudentInfoModel({urlRoot: this.lokacija + student + '/'})}));
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