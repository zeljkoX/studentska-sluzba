define(['backbone', 'templates'], function(Backbone, Templates) {
		var IspitiView = Backbone.View.extend({
				template: Templates['ispiti'],
				initialize: function() {
					this.listenTo(this.model, 'lista', this.azuriraj);
					Backbone.on('dugme:klik', function() {
						console.log('dugme klik');
					});
					this.model.on('sync', function() {
						Backbone.trigger('naslov', ['Ispiti']);
						Backbone.trigger('dugme', [{
							tekst: 'Dodaj Ispitni Rok',
							lokacija: 'ispiti/dodaj-ispit/',
							klasa: 'btn btn-success',
							ikona: 'icon-plus-sign icon-white'
						}]);
						Backbone.trigger('meni', [{
							tekst: 'Lista Ispita',
							lokacija: this.lokacija(),
							aktivan: 'true'
						}]);
						Backbone.trigger('statistika', [{
						tekst: 'Broj Ispitnih Rokova',
						podatak: this.model.get('ispiti').length
					}]);
						this.render();
					}, this);
				},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').empty().append(this.el);
				this.tabela = $(this.el).find('.table').dataTable({
					"iDisplayLength": 25,
					"bPaginate": false
				});
				this.tabela.fnFilter('');
				$('body').removeClass('ucitavanje');
				return this;
			},
			events: {
				'click table': 'otvori'
			},
			otvori: function(e) {
				console.log('ispiti');
				e.preventDefault();
				var element = $(e.target).data('lokacija');
				if (element)
					Backbone.trigger('ruta:lokacija', ['ispiti/' + element]);
			},
		});
	return IspitiView;

});