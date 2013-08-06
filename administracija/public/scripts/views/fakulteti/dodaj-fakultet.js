define(['backbone', 'text!sabloni/dodaj-fakultet.html'], function(Backbone, Templates) {
	var DodajFakultetView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			Backbone.trigger('naslov', ['Dodavanje Fakulteta']);
			Backbone.trigger('dugme', [{tekst: 'Odustani', lokacija: 'fakulteti/', klasa: 'btn btn-danger', ikona: 'icon-remove-circle icon-white'}]);
			Backbone.trigger('meni',[{tekst: 'Dodavanje Fakulteta', lokacija:'dodaj-fakultet/', aktivan:'true'}]);
		},
		render: function() {
			this.$el.html(this.template);
			return this;
		},
		events: {
			'submit' : 'sacuvaj'
		},
		sacuvaj: function(e){
			e.preventDefault();
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
	return DodajFakultetView;

});