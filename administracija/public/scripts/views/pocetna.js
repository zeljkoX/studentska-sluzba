define(['backbone','views/stranica/stranica' ,'templates','jquery','type'],
 function(Backbone, StranicaView, Templates) {
	var IndexView = Backbone.View.extend({
		template: Templates['pocetna'],
		render: function() {
			var that = this;
			this.$el.html(this.template.render());
			$('.stranica').empty().append(this.el);
			$('.typeahead').typeahead('destroy');
			$('.typeahead').typeahead({
				name: 'search-typeahead' + Math.floor(Math.random()*1000),
				prefetch: '/administracija/json/sve.json',
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
			$('body').removeClass('ucitavanje');
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