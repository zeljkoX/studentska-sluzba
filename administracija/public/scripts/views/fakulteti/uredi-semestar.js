define(['backbone', 'templates', 'fakultetiM/modal', 'fakultetiV/modal'],
	function(Backbone, Templates, Hogan, ModalModel, ModalView) {
		var UrediSemestarView = Backbone.View.extend({
			template: Templates['semestar'],
			initialize: function() {
				Backbone.on('rezultat', function(options) {
					var p = this.model.get('predmeti');
					p.push(options[0]);
					this.model.set({
						predmeti: p
					});
				}, this);
				Backbone.on('render', function(options) {
					this.render();
				}, this);
				this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Uredjivanje Semestra',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				this.model.on('sync', function() {
					Backbone.trigger('naslov', ['Uredjivanje Semestra: ' + this.model.get('_id')]);
					Backbone.trigger('statistika', [{
						tekst: 'Broj Predmeta',
						podatak: this.model.get('predmeti').length
					}]);
				}, this);
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				return this;
			},
			events: {
				'click .dodaj': 'odabir',
				'click i': 'brisi',
				'submit': 'sacuvaj',
				'change #redniBroj': 'redniBroj',
				'click .odustani': 'odustani'
			},
			odabir: function(e) {
				e.preventDefault();
				var that = this;
				console.log('adabir');
				var element = $(e.currentTarget),
					a = new ModalView({
						element: element,
						model: new ModalModel({
							url: '/administracija/predmeti/',
							naziv: 'Odabir Predmeta'
						})
					});
				$(this.el).append(a.el);
				Backbone.on('modal', function() {
					$('#myModal').modal();
				})
			},
			brisi: function(e) {
				console.log('brisanje');
				var index = this.$el.find('i').index(e.target),
					p = this.model.get('predmeti');
				p.splice(index, 1);
				this.model.set({
					predmeti: p
				});
				this.render();

			},
			sacuvaj: function(e) {
				e.preventDefault();
				this.model.save({}, {
					success: function(model, response) {
						Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)])
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}
				});
			},
			//poziva se kada se unese redni broj semestra zarad renderovanja da se ne izgubi unesena vrijednost
			redniBroj: function() {
				this.model.set({
					_id: this.$el.find('#redniBroj').val()
				});
				console.log(this.model.attributes);
			},

			odustani: function(e) {
				e.preventDefault();
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)]);

			},

		});
		return UrediSemestarView;

	});