define(['backbone', 'text!sabloni/student-semestar.html', 'hogan', 'tipsy'],
	function(Backbone, Templates, Hogan) {
		var StudentSemestarView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				console.log('semestar');
				this.podaci = '';
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('naslov', ['Semestri']);
				Backbone.trigger('dugme', [{
					tekst: 'Aktiviraj Semestar',
					lokacija: Backbone.lokacija() + 'aktiviraj/',
					klasa: 'btn btn-success',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Semestri',
					lokacija: this.lokacija(),
					aktivan: true
				}]);
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				$('table td a').tipsy({gravity: 'w',html: true } );
				return this;
			},
			events: {
				'click .ocjena': 'upisOcjene'
			},
			upisOcjene: function(e) {
				e.preventDefault();
				var element = $(e.target).data('lokacija');
				if (element)
					Backbone.trigger('ruta:lokacija', [this.lokacija() + element + '/']);
			}

		});
		return StudentSemestarView;

	});