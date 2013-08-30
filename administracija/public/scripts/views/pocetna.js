define(['backbone', 'text!sabloni/pocetna.html','jquery','typeahead'], function(Backbone, Templates) {
	var IndexView = Backbone.View.extend({
		el: $('.stranica'),
		template: Templates,
		render: function() {
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
				Backbone.trigger('ruta:lokacija',[datum.lokacija]);
			});
			$('.typeahead').on('typeahead:autocompleted', function(e, datum) {
				Backbone.trigger('ruta:lokacija',[datum.lokacija]);
			});
			return this;
		},
		initialize: function() {},
		events: {
			"click .btn-block": "otvori"
		},
		otvori: function(e) {
			Backbone.history.navigate((e.currentTarget.getAttribute("data-link") + '/'), {
				trigger: true
			});

		},
	});
	return IndexView;

});