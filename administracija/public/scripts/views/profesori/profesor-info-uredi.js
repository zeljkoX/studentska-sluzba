define(['backbone', 'templates'],
	function(Backbone, Templates) {
		var ProfesorInfoView = Backbone.View.extend({
			template: Templates['dodaj-profesor'],
			initialize: function() {
				var that = this;
				this.on('lista', this.azuriraj);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('naslov', [this.model.get('imeIprezime') + ': uredjivanje']);
				Backbone.trigger('meni', [{
					tekst: this.model.get('imeIprezime') + ': uredjivanje',
					lokacija: this.lokacija(),
					aktivan: true
				}]);
				Backbone.trigger('statistika', [{}]);
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
				$('.inlineDiv button').click(function(e) {
					console.log('ddddddddd');
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
				model = {
					ime: $.trim(skr.find('#ime').val()),
					prezime: $.trim(skr.find('#prezime').val()),
					titula: $.trim(skr.find('#titula').val()),
					mjesto: $.trim(skr.find('#mjesto').val()),
					ulica: $.trim(skr.find('#ulica').val()),
					telefon: $.trim(skr.find('#telefon').val()),
					email: $.trim(skr.find('#email').val()),
					fakultet: $.trim(skr.find('#fakultet').val())
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
				console.log(html);
				$(this.el).find('#fakultet')[0].appendChild(html);
				$("#fakultet").children().filter(function() {
					return $(this).val() == that.model.attributes.fakultet;
				}).attr('selected', true);
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
		});
		return ProfesorInfoView;

	});