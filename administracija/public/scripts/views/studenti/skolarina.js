define(['backbone', 'text!sabloni/skolarina.html', 'hogan'],
	function(Backbone, Templates, Hogan) {
		var SkolarinaView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				console.log('semestar');
				this.podaci = '';
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('naslov', ['Skolarina']);
				Backbone.trigger('dugme', [{
					tekst: 'Uplata rate',
					lokacija: Backbone.lokacija() + 'aktiviraj/',
					klasa: 'btn btn-success',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Skolarina',
					lokacija: this.lokacija(),
					aktivan: true
				}]);
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				return this;
			},
			events: {},
		});
		return SkolarinaView;

	});