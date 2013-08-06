define(['backbone', 'text!sabloni/fakultet-info.html','text!sabloni/dodaj-fakultet.html','hogan'], function(Backbone, Templates,TemplateIzmjena, Hogan) {
	var FakultetInfoView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			console.log(this.model.attributes);
			Backbone.trigger('naslov', [this.model.get('naslov')]);
			Backbone.trigger('dugme', [{tekst: 'Dodaj Studijski Program', lokacija: 'fakulteti/'+ this.model.get('skracenica') +'/dodaj-fakultet/', klasa: 'btn btn-success', ikona: 'icon-plus-sign icon-white'}]);
			Backbone.trigger('meni',[{tekst: 'Osnovne Informacije', lokacija:'dodaj-fakultet/', aktivan:'true'}]);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		},
		events: {
			'submit' : 'sacuvaj',
			'click button': 'uredi'
		},
		uredi: function(e){
			e.preventDefault();
			var template2 = Hogan.compile(TemplateIzmjena);
			this.$el.html(template2.render(this.model.toJSON()));

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
			this.model.set(model);
            this.model.save();
		}
		
	});
	return FakultetInfoView;

});