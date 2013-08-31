define(['backbone','views/stranica/stranica' ,'text!sabloni/pocetna.html','jquery','typeahead'],
 function(Backbone, StranicaView, Templates) {
	var IndexView = Backbone.View.extend({
		el: $('.stranica'),
		template: Templates,
		render: function() {
			var that = this;
			this.$el.html(this.template);
			$('.typeahead').typeahead({
				name: 'search-typeahead',
				prefetch: '/administracija/json/sve.json',
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
		initialize: function() {},
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