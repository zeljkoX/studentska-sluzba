define(['backbone', 'text!sabloni/profesori.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var ProfesoriView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'lista', this.azuriraj);
			this.template = Hogan.compile(this.template);
			Backbone.on('dugme:klik', function() {
				console.log('dugme klik');
			});
			this.model.on('sync', function() {
				Backbone.trigger('naslov', ['Profesori']);
				Backbone.trigger('dugme', [{
					tekst: 'Dodaj Profesora',
					lokacija: 'profesori/dodaj-profesor/',
					klasa: 'btn btn-success',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Lista Profesora',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				Backbone.trigger('statistika', [{
						tekst: 'Broj Profesora',
						podatak: this.model.get('profesori').length
					}]);
			}, this);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			this.tabela = $(this.el).find('.table').dataTable({
				/*"aoColumnDefs": [
                        { "bSearchable": true, "bVisible": false, "aTargets": [ 2 ] },
                        { "bSearchable": true,"bVisible": false, "aTargets": [ 3 ] }
                    ],*/
				"iDisplayLength": 25,
				"bPaginate": false

			});
			return this;
		},
		events: {
			'click table': 'otvori'
		},
		otvori: function(e) {
			e.preventDefault();
			var element = $(e.target).data('lokacija');
			if (element)
				Backbone.trigger('ruta:lokacija', ['profesori/' + element]);

		}

	});
	return ProfesoriView;

});