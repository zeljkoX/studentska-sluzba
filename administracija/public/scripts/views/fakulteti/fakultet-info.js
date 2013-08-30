define(['backbone', 'text!sabloni/fakultet-info.html','fakultetiV/fakultet-info-uredi','hogan'],
 function(Backbone, Templates,TemplateIzmjena, Hogan) {
	var FakultetInfoView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			Backbone.on('dugme:klik', function(){
				console.log('dugme klik');
			});
			Backbone.trigger('dugme', [
				{tekst: 'Dodaj Studijski Program', lokacija: this.lokacija() + 'dodaj-sp/', klasa: 'btn btn-success', ikona: 'icon-plus-sign icon-white'},
				{tekst: 'Obrisi Fakultet', lokacija: this.lokacija() +'obrisi/', klasa: 'btn btn-danger', ikona: 'icon-remove-circle icon-white'}
				]);
            this.model.on('sync', function(){
            	Backbone.trigger('naslov', [this.model.get('naziv')]);
            	Backbone.trigger('meni',[{tekst: 'Osnovne Informacije', lokacija: this.lokacija(), aktivan:true}].concat(this.model.get('studijskiProgrami')));
            },this);
		},
		render: function() {
			
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		},
		events: {
			'submit' : 'sacuvaj',
			'click button': 'uredi'
		},
		uredi: function(e) {
			var that= this;
			e.preventDefault();
            this.changeView(new TemplateIzmjena({model: that.model}));
		},
		sacuvaj: function(e){
			e.preventDefault();
			console.log('klik');
			var skr = this.$el;
			var model = {
				naziv: skr.find('#inputNazivFakulteta').val(),
				skracenica:skr.find('#inputSkraceniNazivFakulteta').val().toLowerCase(),
				dekan: skr.find('#dekan').val(),
				opis: skr.find('#inputOpis').val()
			};
			console.log(model);
			this.model.set(model);
            this.model.save();
		},
		changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
                this.currentView = null;
            }
            this.currentView = view;
            this.currentView.delegateEvents();
            this.$el.empty().append(this.currentView.render().el);
        },
		
	});
	return FakultetInfoView;

});