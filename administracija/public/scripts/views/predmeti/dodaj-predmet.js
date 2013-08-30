define(['backbone', 'text!sabloni/dodaj-predmet.html', 'predmetiM/modal', 'predmetiV/modal', 'hogan'],
	function(Backbone, Templates, ModalModel, ModalView, Hogan) {
		var DodajFakultetView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				this.podaci = '';
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'lista', this.azuriraj);
				Backbone.trigger('naslov', ['Dodavanje Predmeta']);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Dodavanje Predmeta',
					lokacija: 'dodaj-predmet/',
					aktivan: 'true'
				}]);
			},
			render: function() {
				this.$el.html(this.template.render());
				return this;
			},
			events: {
				'click .sacuvaj': 'sacuvaj',
				'change #fakultet': 'sp',
				'click #profesor': 'profesor',
				'click #asistent': 'asistent',
				'submit .sacuvaj': 'sacuvaj'
			},
			sacuvaj: function(e) {
				e.preventDefault();
				console.log('submit');
				var skr = this.$el,
				    that = this,
				    model = {
					naziv: $.trim(skr.find('#nazivPredmeta').val()),
					sifra: $.trim(skr.find('#sifraPredmeta').val().toLowerCase()),
					status: $.trim(skr.find('input[name=optionsRadios]:checked').val()),
					bodovi: $.trim(skr.find('#brojBodova').val()),
					profesor: skr.find('#profesor').val(),
					asistent: skr.find('#asistent').val(),
					fakultet: {
						_id: skr.find('#fakultet').val(),
						naziv: skr.find('#fakultet option:selected').text()
					},
					studijskiProgram: skr.find('#studijskiProgram option:selected').text(),
					casovi: {
						predavanja: $.trim(skr.find('#teorija').val()),
						vjezbe: $.trim(skr.find('#vjezbe').val())
					},
					opis: $.trim(skr.find('#opis').val())
				};
				console.log(model);
				this.model.set(model);
				this.model.save({},{
					success: function(model1, response) {
						console.log(model1);
						Backbone.trigger('ruta:lokacija',[Backbone.lokacija(1) + that.model.attributes.sifra + '/'])
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}}
				);
			},
			azuriraj: function(options) {
				this.podaci = options[0];
				var options = options[0],
					fakulteti = [],
					that = this,
					html = '';
				fakulteti = Object.keys(options);
				html = this.kreirajElement(options);
				console.log(html);
				$(this.el).find('#fakultet')[0].appendChild(html);
			},
			kreirajElement: function(podaci) {
				var html = document.createDocumentFragment();
				podaci.forEach(function(podatak) {
					var temp = document.createElement('option');
					temp.value = podatak._id;
					temp.innerHTML = podatak.naziv;
					html.appendChild(temp);
				});
				return html;

			},
			sp: function() {
				var fak = $(this.el).find('#fakultet').val().toString(),
					temp = '',
					html = '',
					sp = $(this.el).find('#studijskiProgram');


				if (fak == '') {
					sp.empty().attr('disabled', true);
					return;
				}

				this.podaci.forEach(function(fakultet) {
					if (fakultet._id == fak) {
						temp = fakultet.studijskiProgrami;
					}
				});

				html = this.kreirajElement(temp);
				sp.empty().removeAttr('disabled')[0].appendChild(html);
			},

			profesor: function(e) {
				var element = $(e.currentTarget),
					a = new ModalView({
						element: element,
						model: new ModalModel({
							url: '/administracija/profesori/lista/',
							naziv: 'Odabir Profesora'
						})
					});
				$(this.el).append(a.el);
				Backbone.on('modal', function() {
					$('#myModal').modal();
				})
				//setTimeout(function(){$('#myModal').modal()}, 200);


			},

			asistent: function(e) {
				console.log('asistent');
				var element = $(e.currentTarget),
					a = new ModalView({
						element: element,
						model: new ModalModel({
							url: '/administracija/profesori/lista/',
							naziv: 'Odabir Asistenta'
						})
					});
				$(this.el).append(a.el);
				Backbone.on('modal', function() {
					$('#myModal').modal();
				})
			}


		});
		return DodajFakultetView;

	});