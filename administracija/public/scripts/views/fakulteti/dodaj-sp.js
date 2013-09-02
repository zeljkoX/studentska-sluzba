define(['backbone', 'templates'], function(Backbone, Templates) {
	var DodajSPView = Backbone.View.extend({
		template: Templates['dodaj-sp'],
		initialize: function() {
			this.render();
			Backbone.trigger('naslov', ['Dodavanje Studijskog Programa']);
			Backbone.trigger('dugme', [{tekst: 'Odustani', lokacija: Backbone.lokacija(1), klasa: 'btn btn-danger', ikona: 'icon-remove-circle icon-white'}]);
			Backbone.trigger('meni',[{tekst: 'Dodavanje Studijskog Programa', lokacija: this.lokacija(), aktivan:'true'}]);
		},
		render: function() {
			this.$el.html(this.template.render());
			$('.sadrzajPodaci').append(this.el);
			return this;
		},
		events: {
			'submit' : 'sacuvaj'
		},
		sacuvaj: function(e){
			e.preventDefault();
			var skr = this.$el,
			that = this;
			var model = {
				naziv: skr.find('#inputNazivSP').val(),
				sifra:skr.find('#inputSifraSP').val().toLowerCase(),
			};
			console.log(model);
			this.model.set(model);
            this.model.save({},{
					success: function(model, response) {
						Backbone.trigger('ruta:lokacija',[Backbone.lokacija(1) + that.model.attributes.sifra + '/'])
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}});
		}
		
	});
	return DodajSPView;

});