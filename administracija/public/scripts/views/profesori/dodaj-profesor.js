define(['backbone', 'text!sabloni/dodaj-profesor.html','hogan'],
	function(Backbone, Templates, Hogan) {
		var DodajProfesorView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				console.log('dodaj prof');
				this.podaci = '';
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'lista', this.azuriraj);
				Backbone.trigger('naslov', ['Dodavanje Profesora']);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Dodavanje Profesora',
					lokacija: Backbone.lokacija(),
					aktivan: 'true'
				}]);
				this.render();
			},
			render: function() {
				this.$el.html(this.template.render());
				$('.sadrzajPodaci').append(this.el);
				return this;
			},
			events: {
				'submit': 'sacuvaj'
			},
			sacuvaj: function(e) {
				e.preventDefault();
				console.log('submit');
				var skr = this.$el,
				    that = this,
				    model = {
					ime: $.trim(skr.find('#ime').val()),
					prezime: $.trim(skr.find('#prezime').val()),
					titula: $.trim(skr.find('#titula').val()),
					jmbg: $.trim(skr.find('#jmbg').val()),
					mjesto: $.trim(skr.find('#mjesto').val()),
					ulica: $.trim(skr.find('#ulica').val()),
					telefon: $.trim(skr.find('#telefon').val()),
					email: $.trim(skr.find('#email').val()),
					fakultet: $.trim(skr.find('#fakultet').val())
				};
				console.log(model);
				this.model.set(model);
				this.model.save({},{
					success: function(model1, response) {
						console.log(model1);
						Backbone.trigger('ruta:lokacija',[Backbone.lokacija(1) + that.model.attributes.jmbg + '/'])
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

		});
		return DodajProfesorView;

	});