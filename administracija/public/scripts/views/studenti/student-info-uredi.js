define(['backbone', 'text!sabloni/dodaj-student.html', 'hogan'],
	function(Backbone, Templates, Hogan) {
		var StudentInfoView = Backbone.View.extend({
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
				Backbone.trigger('naslov', [this.model.get('imeIprezime') + ': uredjivanje']);
				Backbone.trigger('meni', [{
					tekst: 'Osnovne Informacije',
					lokacija: this.lokacija(),
					aktivan: true
				}]);
				Backbone.trigger('meni', [{
					tekst: this.model.get('imeIprezime') + ': uredjivanje',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				$.get('/administracija/fakulteti/lista/', function(data) {
					data = JSON.parse(data);
					that.azuriraj([data]);
				}).error(function() {

				});
				this.render();
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				this.$el.find('#jmbg').attr('disabled', true);
				this.$el.find('#index').attr('disabled', true);
				this.$el.find('#fakultet').attr('disabled', true);
				this.$el.find('#studijskiProgram').attr('disabled',true);
				this.$el.find('#sifra').attr('disabled',false);
				$('.inlineDiv button').click(function(e) {
					Backbone.history.fragment = null;
					Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
				});
				return this;
			},
			events: {
				'click .sacuvaj': 'sacuvaj',
				'click .odustani': 'odustani',
				'change #fakultet': 'sp'
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
					ime: $.trim(skr.find('#ime').val()),
					prezime: $.trim(skr.find('#prezime').val()),
					imeRoditelja: $.trim(skr.find('#imeRoditelja').val()),
					jmbg: $.trim(skr.find('#jmbg').val()),
					mjesto: $.trim(skr.find('#mjesto').val()),
					ulica: $.trim(skr.find('#ulica').val()),
					telefon: $.trim(skr.find('#telefon').val()),
					email: $.trim(skr.find('#email').val()),
					fakultet: $.trim(skr.find('#fakultet').val()),
					studijskiProgram: $.trim(skr.find('#studijskiProgram option:selected').text()),
					_id: $.trim(skr.find('#index').val()),
					godina: (new Date()).getFullYear(),
					sifra: $.trim(skr.find('#sifra').val()).toString()
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
					return $(this).val() == that.model.attributes.fakultet;
				}).attr('selected', true);
				if (that.model.attributes.studijskiProgram) {
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
				sp.empty()[0].appendChild(html);
				$("#studijskiProgram").children().filter(function() {
					return $(this).text() == that.model.attributes.fakultet.studijskiProgram;
				}).attr('selected', true);

			}

		});
		return StudentInfoView;

	});