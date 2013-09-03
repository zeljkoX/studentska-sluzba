define(['backbone', 'templates', 'models/modal', 'views/modal'],
	function(Backbone, Templates, ModalModel, ModalView) {
		var DodajIspitView = Backbone.View.extend({
			template: Templates['dodaj-ispit'],
			initialize: function() {
				this.podaci = '';
				this.listenTo(this.model, 'lista', this.azuriraj);
					Backbone.trigger('naslov', ['Dodavanje Ispitnog Roka']);
					Backbone.trigger('dugme', [{
						tekst: 'Odustani',
						lokacija: Backbone.lokacija(1),
						klasa: 'btn btn-danger',
						ikona: 'icon-remove-circle icon-white'
					}]);
					Backbone.trigger('meni', [{
						tekst: 'Dodavanje Ispitnog Roka',
						lokacija: 'dodaj-ispit/',
						aktivan: 'true'
					}]);
					Backbone.trigger('statistika', [{}]);
				this.render();
			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').empty().append(this.el);
				this.$el.find('.datum').datepicker();
				setTimeout(function(){document.body.setAttribute('class', '');}, 200);
				return this;
			},
			events: {
				'click .sacuvaj': 'sacuvaj',
				//'submit': 'sacuvaj',
				'click .odustani': 'odustani'
			},
			sacuvaj: function(e) {
				e.preventDefault();
				console.log('submit');
				var skr = this.$el,
					that = this,
					model = {
						naziv: $.trim(skr.find('#naziv').val()),
						_id: $.trim(skr.find('#sifra').val().toLowerCase()),
						ispitniOd: skr.find('#ispitniOd').val(),
						ispitniDo: skr.find('#ispitniOd').val(),
						prijavaOd: skr.find('#prijavaOd').val(),
						prijavaDo: skr.find('#prijavaDo').val(),
						godina: new Date().getFullYear()
					};
				console.log(model);
				this.model.set(model);
				this.model.save({}, {
					success: function(model, response) {
						console.log(model);
						Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1) + that.model.attributes._id + '/'])
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}
				});
			},
			odustani: function(e) {
				e.preventDefault();
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)]);
			}

		});
		return DodajIspitView;

	});