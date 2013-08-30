define(['backbone', 'text!sabloni/dodaj-ispit.html', 'hogan'],
 function(Backbone, Templates, Hogan) {
	var IspitInfoView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			var that = this;
			this.template = Hogan.compile(this.template);
			Backbone.trigger('dugme', [{
				tekst: 'Odustani',
				lokacija: Backbone.lokacija(),
				klasa: 'btn btn-danger',
				ikona: 'icon-remove-circle icon-white'
			}]);
			Backbone.trigger('naslov', [this.model.get('naziv') + ': uredjivanje']);
			Backbone.trigger('meni', [{
				tekst: 'Osnovne Informacije',
				lokacija: this.lokacija(),
				aktivan: true
			}]);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			this.$el.find('.datum').datepicker();
			this.$el.find('#sifra').attr('disabled', true);
			return this;
		},
		events: {
			'click .sacuvaj': 'sacuvaj',
			'click .odustani': 'odustani'
		},
		odustani: function(e) {
			e.preventDefault();
			Backbone.history.fragment = null;
			Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);

		},
		sacuvaj: function(e) {
			e.preventDefault();
			var skr = this.$el;
			var model = {
					naziv: $.trim(skr.find('#naziv').val()),
					ispitniOd: skr.find('#ispitniOd').val(),
					ispitniDo: skr.find('#ispitniOd').val(),
					prijavaOd: skr.find('#prijavaOd').val(),
					prijavaDo: skr.find('#prijavaDo').val(),
				};

			console.log(model);
			$.ajax({
				type: "PUT",
				url: '/administracija/' + this.lokacija(),
				data: model,
				success: function(response) {
					Backbone.history.fragment = null;
					Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
				}
			});

			//this.model.set(model);
			//this.model.save();
		}


	});
	return IspitInfoView;

});