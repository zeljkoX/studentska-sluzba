define(['backbone', 'text!sabloni/upis-ocjene.html', 'hogan'],
	function(Backbone, Templates, Hogan) {
		var OcjenaView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				console.log('dodavanje ocjene');
				this.podaci = '';
				this.template = Hogan.compile(this.template);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Upis Ocjene',
					lokacija: Backbone.lokacija(),
					aktivan: 'true'
				}]);
				this.model.on('sync', function() {
					Backbone.trigger('naslov', ['Upis ocjene: ' + this.model.get('naziv')]);
					Backbone.trigger('statistika', [{}]);
					this.render();
				}, this);
			},
			render: function() {
				this.$el.html(this.template.render());
				$('.sadrzajPodaci').append(this.el);
				return this;
			},
			events: {
				'submit': 'sacuvaj'
			},
			sacuvaj: function(e) {
				e.preventDefault();
				console.log('submit');
				var skr = this.$el,
					that = this,
					model = {
						predavanja: $.trim(skr.find('#predavanja').val()),
						vjezbe: $.trim(skr.find('#vjezbe').val()),
						dodatni: $.trim(skr.find('#dodatni').val()),
						ocjena: $.trim(skr.find('#ocjena').val()),
					};
				console.log(model);
				this.model.set(model);
				this.model.save({}, {
					success: function(model1, response) {
						console.log(model1);
						Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)])
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}
				});
			},


		});
		return OcjenaView;

	});