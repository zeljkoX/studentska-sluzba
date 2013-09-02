define(['backbone','templates','tipsy'],
	function(Backbone, Templates) {
		var StudentSemestarView = Backbone.View.extend({
			template: Templates['student-semestar'],
			initialize: function() {
				this.podaci = '';
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
				this.model.on('sync', function() {
				Backbone.trigger('statistika', [{
						tekst: 'Broj Semestra',
						podatak: this.model.get('semestri').length
					}]);
			}, this);
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