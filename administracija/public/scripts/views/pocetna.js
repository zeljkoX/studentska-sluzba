define(['backbone','views/stranica/stranica' ,'text!sabloni/pocetna.html','jquery','typeahead'],
 function(Backbone, StranicaView, Templates) {
	var IndexView = Backbone.View.extend({
		//el: $('.stranica'),
		template: Templates,
		render: function() {
			console.log('render pocetna');
			var that = this;
			this.$el.html(this.template);
			$('.stranica').empty().append(this.el);
			localStorage.clear();
			$('.typeahead').typeahead('destroy');
			$('.typeahead').typeahead({
				name: 'search-typeahead' + Math.floor(Math.random()*1000),
				remote: '/administracija/json/sve.json',
				cache: false,
				template: [
					'<p class="search-naziv">{{name}}</p>',
					'<p class="search-lokacija">Lokacija: {{kategorija}}</p>'
				].join(''),
				engine: Hogan
			});
			$('.typeahead').on('typeahead:selected', function(e, datum) {
				that.prelazak();
				console.log(datum.kategorija);
				Backbone.trigger('naslov',[datum.kategorija]);
				Backbone.trigger('ruta:lokacija',[datum.lokacija]);
			});
			$('.typeahead').on('typeahead:autocompleted', function(e, datum) {
				that.prelazak();
				Backbone.trigger('naslov',[datum.kategorija]);
				Backbone.trigger('ruta:lokacija',[datum.lokacija]);
			});
			$('.typeahead').focus();
			return this;
		},
		initialize: function() {
			this.render();
		},
		events: {
			"click .btn-block": "otvori"
		},
		otvori: function(e) {
			this.prelazak();
			Backbone.history.navigate((e.currentTarget.getAttribute("data-link") + '/'), {
				trigger: true
			});

		},
		prelazak: function(){
			//this.undelegateEvents();
			new StranicaView();
		}
	});
	return IndexView;

});