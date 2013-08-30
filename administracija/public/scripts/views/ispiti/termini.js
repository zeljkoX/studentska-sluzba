define(['backbone', 'text!sabloni/termini.html', 'hogan', 'bootstrap-timepicker.min', 'bootstrap-datepicker'],
	function(Backbone, Templates, Hogan) {
		var TerminiView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				this.template = Hogan.compile(this.template);
				this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('naslov', ['Termini']);
				Backbone.trigger('dugme', [{
					tekst: 'Odustani',
					lokacija: Backbone.lokacija(1),
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Termini',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
			},
			render: function() {
				console.log('render');
				this.$el.html(this.template.render(this.model.toJSON()));
				var naziv = this.model.get('aktivnoNaziv');
				this.$el.find('.fakFilter li').each(function(item){
                if($(this).text() == naziv)
                	$(this).addClass('active');
				});
				this.$el.find('.datum').datepicker();
				this.$el.find('.time').timepicker({
					defaultTime: false,
					showMeridian: false
				});
				$('.lokacija button').hide();
				return this;
			},
			events: {
			    'click .fakFilter>li': 'prikazi',
				'click .sacuvaj': 'sacuvaj',
				'click .odustani': 'odustani'
			},
			prikazi: function(e) {
				e.preventDefault();
				console.log(e.currentTarget);
				var skr = this.$el,
				podaci = this.model.get('termini');
                this.model.set({aktivnoNaziv: skr.find(e.target).text()});
				this.model.set({aktivno: podaci[this.$el.find('.active').text()]});

			},
			odustani: function(e) {
				e.preventDefault();
				Backbone.trigger('ruta:lokacija', [Backbone.lokacija(1)]);
			},
			sacuvaj: function(){
                 var niz = this.model.get('aktivno'),
                 naziv = this.model.get('aktivnoNaziv'),
                 termini = this.model.get('termini'),
                 datum = this.$el.find('.datum'),
                 vrijeme = this.$el.find('.time'),
                 lokacija = this.$el.find('.ucionica');


                niz.forEach(function(item, index){
                    console.log(item);
                    item.datum = datum.eq(index).val();
                    item.vrijeme = vrijeme.eq(index).val();
                    item.lokacija = lokacija.eq(index).val();
                    console.log(item);
                });
                termini[naziv] = niz;
                this.model.set({termini: termini});

                this.model.save({},{
					success: function(model, response) {
						console.log('da');
						
					},
					error: function() {
						alert('Operacija nije uspjesno zavrsena. Molimo probajte opet.');
					}}
				);

			}

		});
		return TerminiView;

	});