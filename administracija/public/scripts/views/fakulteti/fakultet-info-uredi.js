define(['backbone', 'text!sabloni/dodaj-fakultet.html', 'hogan'],
	function(Backbone, Templates, Hogan) {
		var FakultetInfoView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
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

				Backbone.trigger('naslov', [this.model.get('naziv')]);
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				this.$el.find('#inputSkraceniNazivFakulteta').attr('disabled', true);
				$('.inlineDiv button').click(function(e) {
					console.log('klikkkk');
					Backbone.history.fragment = null;
					Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
				});
				return this;
			},
			events: {
				'click .sacuvaj': 'sacuvaj',
				'click .odustani': 'odustani',
			},
			sacuvaj: function(e) {
				e.preventDefault();
				console.log('klik');
				var skr = this.$el;
				var model = {
					naziv: skr.find('#inputNazivFakulteta').val(),
					skracenica: skr.find('#inputSkraceniNazivFakulteta').val().toLowerCase(),
					dekan: skr.find('#dekan').val(),
					opis: skr.find('#inputOpis').val()
				};
				console.log(model);
				this.model.set(model);
				this.model.save();
				Backbone.history.fragment = null;
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
			},
			odustani: function(e) {
				e.preventDefault();
				Backbone.history.fragment = null;
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
			},
			changeView: function(view) {
				if (null != this.currentView) {
					this.currentView.undelegateEvents();
					this.currentView = null;
				}
				this.currentView = view;
				this.currentView.delegateEvents();
				$('.sadrzajPodaci').empty().append(this.currentView.render().el);
			},

		});
		return FakultetInfoView;

	});