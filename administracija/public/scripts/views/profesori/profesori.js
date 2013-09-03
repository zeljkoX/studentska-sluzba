define(['backbone', 'templates'], function(Backbone, Templates) {
	var ProfesoriView = Backbone.View.extend({
		template: Templates['profesori'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'lista', this.azuriraj);
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
			$('.sadrzajPodaci').empty().append(this.el);
			this.tabela = $(this.el).find('.table').dataTable({
				/*"aoColumnDefs": [
                        { "bSearchable": true, "bVisible": false, "aTargets": [ 2 ] },
                        { "bSearchable": true,"bVisible": false, "aTargets": [ 3 ] }
                    ],*/
				"iDisplayLength": 25,
				"bPaginate": false
			});
			$('body').removeClass('ucitavanje');
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