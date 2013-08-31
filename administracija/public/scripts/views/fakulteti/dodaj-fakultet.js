define(['backbone', 'text!sabloni/dodaj-fakultet.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var DodajFakultetView = Backbone.View.extend({
		template: Templates,
		initialize: function() {

			this.template = Hogan.compile(this.template);
			this.listenTo(this.model, 'change', this.render);
			Backbone.trigger('naslov', ['Dodavanje Fakulteta']);
			Backbone.trigger('dugme', [{tekst: 'Odustani', lokacija: Backbone.lokacija(1), klasa: 'btn btn-danger', ikona: 'icon-remove-circle icon-white'}]);
			Backbone.trigger('meni',[{tekst: 'Dodavanje Fakulteta', lokacija: this.lokacija(), aktivan:'true'}]);
		    this.render();
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			return this;
		},
		events: {
			'submit' : 'sacuvaj',
			'click .odustani': 'odustani'
		},
		sacuvaj: function(e){
			e.preventDefault();
			var skr = this.$el,
			    that = this;
			    model = {
				naziv: skr.find('#inputNazivFakulteta').val(),
				skracenica:skr.find('#inputSkraceniNazivFakulteta').val().toLowerCase(),
				dekan: skr.find('#dekan').val(),
				opis: skr.find('#inputOpis').val()
			};
			this.model.set(model);
            this.model.save({},{
					success: function(model, response) {
						Backbone.trigger('ruta:lokacija',[Backbone.lokacija(1) + that.model.attributes.skracenica + '/'])
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}});
		},
		odustani: function(){
			e.preventDefault();
			Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)]);
		}
		
	});
	return DodajFakultetView;

});