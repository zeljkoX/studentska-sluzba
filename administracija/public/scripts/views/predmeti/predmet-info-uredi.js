define(['backbone', 'text!sabloni/dodaj-predmet.html', 'hogan', 'predmetiM/modal', 'predmetiV/modal'],
	function(Backbone, Templates, Hogan, ModalModel, ModalView) {
		var PredmetInfoView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				var that = this;
				this.on('lista', this.azuriraj);
				this.template = Hogan.compile(this.template);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('naslov', [this.model.get('naziv') + ': uredjivanje']);
				Backbone.trigger('meni', [{
					tekst: 'Osnovne Informacije',
					lokacija: this.lokacija(),
					aktivan: true
				}]);

				$.get('/administracija/fakulteti/lista/', function(data) {
					data = JSON.parse(data);
					that.azuriraj([data]);
				}).error(function() {

				});
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				this.$el.find('#sifraPredmeta').attr('disabled', true);
				$('.inlineDiv button').click(function(e) {
					Backbone.history.fragment = null;
					Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
				});
				return this;
			},
			events: {
				'click .sacuvaj': 'sacuvaj',
				'click .odustani': 'odustani',
				'change #fakultet': 'sp',
				'click #profesor': 'profesor',
				'click #asistent': 'asistent'
			},
			odustani: function(e) {
				e.preventDefault();
				Backbone.history.fragment = null;
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);

			},
			sacuvaj: function(e) {
				e.preventDefault();
				var skr = this.$el;
				var model = {
					_id: this.model.attributes._id,
					naziv: $.trim(skr.find('#nazivPredmeta').val()),
					sifra: $.trim(skr.find('#sifraPredmeta').val().toLowerCase()),
					status: $.trim(skr.find('input[name=optionsRadios]:checked').val()),
					bodovi: $.trim(skr.find('#brojBodova').val()),
					profesor: skr.find('#profesor').val(),
					asistent: skr.find('#asistent').val(),
					fakultet: {
						_id: skr.find('#fakultet').val(),
						naziv: skr.find('#fakultet option:selected').text(),
						studijskiProgram: skr.find('#studijskiProgram option:selected').text()
					},
					casovi: {
						predavanja: $.trim(skr.find('#teorija').val()),
						vjezbe: $.trim(skr.find('#vjezbe').val())
					},
					opis: $.trim(skr.find('#opis').val())
				};
				console.log(model);
				$.ajax({
					type: "PUT",
					url: '/administracija/' + this.lokacija(),
					data: model,
					success: function(response) {
						Backbone.history.fragment = null;
						Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
					}
				});

				//this.model.set(model);
				//this.model.save();
			},

			azuriraj: function(options) {
				this.podaci = options[0];
				var options = options[0],
					fakulteti = [],
					that = this,
					html = '';
				fakulteti = Object.keys(options);
				html = this.kreirajElement(options);
				$(this.el).find('#fakultet')[0].appendChild(html);
				//azuriranje vrijednosti select polja
				$("#fakultet").children().filter(function() {
					return $(this).text() == that.model.attributes.fakultet.naziv;
				}).attr('selected', true);
				if (that.model.attributes.fakultet.studijskiProgram) {
					that.sp();

				}
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
					sp = $(this.el).find('#studijskiProgram'),
					that = this;


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
				$("#studijskiProgram").children().filter(function() {
					return $(this).text() == that.model.attributes.fakultet.studijskiProgram;
				}).attr('selected', true);

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
		return PredmetInfoView;

	});