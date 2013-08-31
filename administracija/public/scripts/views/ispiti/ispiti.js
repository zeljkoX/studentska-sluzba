define(['backbone', 'text!sabloni/ispiti.html', 'hogan'], function(Backbone, Templates, Hogan) {
		var IspitiView = Backbone.View.extend({
				template: Templates,
				initialize: function() {
					this.listenTo(this.model, 'change', this.render);
					this.listenTo(this.model, 'lista', this.azuriraj);
					this.template = Hogan.compile(this.template);
					Backbone.on('dugme:klik', function() {
						console.log('dugme klik');
					});
					this.model.on('sync', function() {
						Backbone.trigger('naslov', ['Ispiti']);
						Backbone.trigger('dugme', [{
							tekst: 'Dodaj Ispitni Rok',
							lokacija: 'ispiti/dodaj-ispit/',
							klasa: 'btn btn-success',
							ikona: 'icon-plus-sign icon-white'
						}]);
						Backbone.trigger('meni', [{
							tekst: 'Lista Ispita',
							lokacija: this.lokacija(),
							aktivan: 'true'
						}]);
					}, this);
					//this.render();
				},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
				this.tabela = $(this.el).find('.table').dataTable({
					/*"aoColumnDefs": [
                        { "bSearchable": true, "bVisible": false, "aTargets": [ 2 ] },
                        { "bSearchable": true,"bVisible": false, "aTargets": [ 3 ] }
                    ],*/
					"iDisplayLength": 25,
					"bPaginate": false

				});
				//this.tabela.fnFilter( 'mikro',null, false, true, false, true );
				//$(this.el).find('.dataTables_filter').empty().prepend('<div class="filter">Fakultet: <select class="input-mini" id="fakultet"><option></option></select>  SP: <select class="input-mini" id="studijskiProgram" disabled><option></option></select> </div> <div class="trazi" >Trazi:<input class="filterInput input" type="text"></input>');
				return this;
			},
			events: {
				'click table': 'otvori',
				'click': 'konzola'
			},
			otvori: function(e) {
				console.log('ispiti');
				e.preventDefault();
				var element = $(e.target).data('lokacija');
				if (element)
					Backbone.trigger('ruta:lokacija', ['ispiti/' + element]);
			},
			konzola: function(){
				console.log('klik');
			}

		});
	return IspitiView;

});