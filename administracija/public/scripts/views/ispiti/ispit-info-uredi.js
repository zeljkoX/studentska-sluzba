define(['backbone', 'templates'],
 function(Backbone, Templates) {
	var IspitInfoView = Backbone.View.extend({
		template: Templates['dodaj-ispit'],
		initialize: function() {
			var that = this;
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
			Backbone.trigger('statistika', [{}]);
			this.render();
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			this.$el.find('.datum').datepicker();
			this.$el.find('#sifra').attr('disabled', true);
			$('.inlineDiv button').click(function(e) {
					Backbone.history.fragment = null;
					Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
				});
			setTimeout(function(){document.body.setAttribute('class', '');}, 200);
			return this;
		},
		events: {
			'click .sacuvaj': 'sacuvaj'
		//	'click .odustani': 'odustani'
		},
		/*odustani: function(e) {
			e.preventDefault();
			Backbone.history.fragment = null;
			Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
		},*/
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