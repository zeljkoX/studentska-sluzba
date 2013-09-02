define(['backbone', 'templates'], function(Backbone, Templates) {
	var LokacijaView = Backbone.View.extend({
		template: Templates['lokacija'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.dugme = this.options.dugme;
		},
		events: {
			'click li': 'mjenjajLokaciju'
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			this.dugme.delegateEvents();
			this.$el.find('.breadcrumb-nav').append(this.dugme.el);
			return this;
		},
		mjenjajLokaciju: function(e) {
			e.preventDefault();
			var element = $(e.currentTarget),
				stavke = this.model.attributes.stavke,
				klikBroj = element.index(),
				brojStavki = stavke.length;
			Backbone.trigger('ruta:lokacija', [stavke[klikBroj].lokacija]);
		}
	});
	return LokacijaView;
});