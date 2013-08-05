define(['backbone', 'text!sabloni/lokacija.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var LokacijaView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			this.dugme = this.options.dugme;

		},
		events: {
			'click li': 'mjenjajLokaciju'
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			console.log('renderovanje');
			this.$el.find('.breadcrumb-nav').append(this.dugme.el);
			return this;
		},
		mjenjajLokaciju: function(e) {
			e.preventDefault();
			var element = $(e.currentTarget),
				stavke = this.model.attributes.stavke,
				klikBroj = element.index(),
				brojStavki = stavke.length;
			//var broj = klikBroj > 0 ? klikBroj: 1;
			//if(klikBroj == brojStavki) return;
			//this.model.attributes.stavke.length = broj;
			//console.log(stavke);
			/*Backbone.trigger('ruta',[element.children('a').data('lokacija')]);*/
			Backbone.trigger('ruta:lokacija', [stavke[klikBroj].lokacija]);
		}


	});
	return LokacijaView;
});