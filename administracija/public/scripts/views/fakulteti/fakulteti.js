define(['backbone', 'text!sabloni/fakulteti.html','views/stranica/stranica', 'hogan'], 
	function(Backbone, Templates, StranicaView, Hogan) {
	var FakultetiView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			console.log(this);
			this.model.on('sync', function() {
				Backbone.trigger('naslov', ['Fakulteti']);
				Backbone.trigger('dugme', [{
					tekst: 'Dodaj Fakultet',
					lokacija: 'fakulteti/dodaj-fakultet/',
					klasa: 'btn btn-success',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Lista Fakulteta',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				//this.render();
			}, this);



		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			return this;
		},
		events: {
			'click table': 'otvori'
		},
		otvori: function(e) {
			e.preventDefault();
			var element = $(e.target).data('lokacija');
			if (element)
				Backbone.trigger('ruta:lokacija', ['fakulteti/' + element]);

		}

	});
	return FakultetiView;

});