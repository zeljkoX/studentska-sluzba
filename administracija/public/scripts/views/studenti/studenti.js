define(['backbone', 'templates'], function(Backbone, Templates) {
	var StudentiView = Backbone.View.extend({
		template: Templates['studenti'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'lista', this.azuriraj);
			Backbone.on('dugme:klik', function() {
				console.log('dugme klik');
			});
			this.model.on('sync', function() {
				Backbone.trigger('naslov', ['Studenti']);
				Backbone.trigger('dugme', [{
					tekst: 'Dodaj Studenta',
					lokacija: 'studenti/dodaj-student/',
					klasa: 'btn btn-success',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Lista Studenata',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				Backbone.trigger('statistika', [{
						tekst: 'Broj Studenata',
						podatak: this.model.get('studenti').length
					}]);
			}, this);
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
			this.tabela.fnFilter('mikro', null, false, true, false, true);
			$(this.el).find('.dataTables_filter').empty().prepend('<div class="filter-mini">Fakultet: <select class="input-mini" id="fakultet"><option></option></select>  SP: <select class="input-mini" id="studijskiProgram" disabled><option></option></select> Godina:<input type="text" id="filterGodina" class="input-small"></div> <div class="trazi" >Trazi:<input class="filterInput input" type="text"></input>');
			return this;
		},
		events: {
			'click table': 'otvori',
			'change #fakultet': 'sp',
			//'change #fakultet': 'filter',
			//'change #studijskiProgram': 'filter',
			'keyup .filterInput': 'filter',
			'keyup #filterGodina': 'filter'
		},
		otvori: function(e) {
			e.preventDefault();
			var element = $(e.target).data('lokacija');
			if (element)
				Backbone.trigger('ruta:lokacija', ['studenti/' + element]);

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
			this.filter();
		},
		kreirajElement: function(podaci, opcija) {
			var html = document.createDocumentFragment();
			podaci.forEach(function(podatak) {
				var temp = document.createElement('option');
				temp.value = podatak._id;
				temp.innerHTML = podatak._id;
				html.appendChild(temp);
			});
			return html;

		},
		kreirajElement2: function(podaci) {
			var html = document.createDocumentFragment();
			podaci.forEach(function(podatak) {
				var temp = document.createElement('option');
				temp.value = podatak.naziv;
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
				this.filter();
				return;
			}

			this.podaci.forEach(function(fakultet) {
				if (fakultet._id == fak) {
					temp = fakultet.studijskiProgrami;
				}
			});

			html = this.kreirajElement2(temp);
			sp.empty().html('<option></option>').removeAttr('disabled')[0].appendChild(html);
			this.filter();
		},

		filter: function() {
			var fakultet = $(this.el).find('#fakultet').val(),
				sp = $(this.el).find('#studijskiProgram').val(),
				inputGodina = $(this.el).find('#filterGodina').val(),
				input = this.$el.find('.filterInput').val(),
				inputF = fakultet != null ? fakultet : '',
				inputSP = sp != null ? sp : '',
				inputG = inputGodina != null ? inputGodina : '';

			var search = inputF + ' ' + inputSP + ' ' + inputG + input;
			this.tabela.fnFilter(search, null, false, true, false, true);
			console.log(search);


		}

	});
	return StudentiView;

});