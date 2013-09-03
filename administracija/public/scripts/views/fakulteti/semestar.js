define(['backbone', 'templates','fakultetiM/modal', 'fakultetiV/modal'],
	function(Backbone, Templates, ModalModel, ModalView) {
		var DodajSemestarView = Backbone.View.extend({
			template: Templates['semestar'],
			initialize: function() {
				this.model.attributes.predmeti.length = 0;  ///pri novom ucitavanju modal prozora da ne prikazuje stare vrijednosti
				Backbone.on('rezultat', function(options) {
					var p = this.model.get('predmeti');
					console.log(p);
					console.log(this.model);
					p.push(options[0]);
					this.model.set({
						predmeti: p
					});
				}, this);
				Backbone.on('render', function(options) {
					this.render();
				}, this);
				//this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('naslov', ['Dodavanje Semestra']);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Dodavanje Semestra',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				Backbone.trigger('statistika', [{
						tekst: 'Broj Predmeta',
						podatak: this.model.get('predmeti').length
					}]);
				this.render();
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').empty().append(this.el);
				this.delegateEvents();
				setTimeout(function(){document.body.setAttribute('class', '');}, 200);
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
				var element = $(e.currentTarget);
					new ModalView({
						element: element,
						model: new ModalModel({
							url: '/administracija/predmeti/',
							naziv: 'Odabir Predmeta'
						})
					});
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
		return DodajSemestarView;

	});