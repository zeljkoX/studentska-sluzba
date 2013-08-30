define(['backbone', 'text!sabloni/prijave.html', 'hogan'],
	function(Backbone, Templates, Hogan) {
		var PrijaveView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('naslov', ['Prijave']);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Prijave',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
			},
			render: function() {
				console.log('render');
				this.$el.html(this.template.render(this.model.toJSON()));
				var naziv = this.model.get('aktivnoNaziv');
				this.$el.find('.fakFilter li').each(function(item) {
					if ($(this).text() == naziv)
						$(this).addClass('active');
				});
				this.tabela = $(this.el).find('.table').dataTable({
					/*"aoColumnDefs": [
                        { "bSearchable": true, "bVisible": false, "aTargets": [ 2 ] },
                        { "bSearchable": true,"bVisible": false, "aTargets": [ 3 ] }
                    ],*/
					"iDisplayLength": 25,
					"bPaginate": false

				});
				$('.lokacija button').hide();
				return this;
			},
			events: {
				'click .fakFilter>li': 'prikazi',
				'click .sacuvaj': 'sacuvaj',
				'click .odustani': 'odustani',
				'click table': 'otvori'
			},
			otvori: function(e) {
				var naziv = this.model.get('aktivnoNaziv');
				e.preventDefault();
				var element = $(e.target).data('lokacija');
				if (element)
					Backbone.trigger('ruta:dodaj', [naziv + '-' +element]);

			},
			prikazi: function(e) {
				var aktivno = {};
				e.preventDefault();
				console.log(e.currentTarget);
				var skr = this.$el,
					podaci = this.model.get('prikaz');
				var fakultet = skr.find(e.target).text();
				this.model.set({
					aktivnoNaziv: fakultet
				});
				podaci.forEach(function(item) {
					if (item.naziv == fakultet) {
						aktivno = item;
					}
				});
				this.model.set({
					aktivno: aktivno
				});

			},
			odustani: function(e) {
				e.preventDefault();
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)]);
			}


		});
		return PrijaveView;

	});