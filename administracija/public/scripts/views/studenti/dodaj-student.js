define(['backbone', 'text!sabloni/dodaj-student.html','hogan'],
	function(Backbone, Templates, Hogan) {
		var DodajStudentView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				console.log('dodaj student');
				this.podaci = '';
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'lista', this.azuriraj);
				Backbone.trigger('naslov', ['Dodavanje Studenta']);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Dodavanje Studenta',
					lokacija: 'dodaj-student/',
					aktivan: 'true'
				}]);
			},
			render: function() {
				this.$el.html(this.template.render());
				return this;
			},
			events: {
				//'click .sacuvaj': 'sacuvaj',
				'change #fakultet': 'sp',
				'click #profesor': 'profesor',
				'click #asistent': 'asistent',
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
					imeRoditelja: $.trim(skr.find('#imeRoditelja').val()),
					jmbg: $.trim(skr.find('#jmbg').val()),
					mjesto: $.trim(skr.find('#mjesto').val()),
					ulica: $.trim(skr.find('#ulica').val()),
					telefon: $.trim(skr.find('#telefon').val()),
					email: $.trim(skr.find('#email').val()),
					fakultet: $.trim(skr.find('#fakultet').val()),
                    studijskiProgram: $.trim(skr.find('#studijskiProgram').val()),
                    _id: $.trim(skr.find('#index').val()),
                    godina: (new Date()).getFullYear(),
                    sifra: $.trim(skr.find('#jmbg').val()).toString().slice(7)
				};
				console.log(model);
				this.model.set(model);
				this.model.save({},{
					success: function(model1, response) {
						console.log(model1);
						Backbone.trigger('ruta:lokacija',[Backbone.lokacija(1) + that.model.attributes._id + '/'])
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
			}

		});
		return DodajStudentView;

	});