define(['backbone', 'text!sabloni/dugme.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var DugmeView = Backbone.View.extend({
		template: Templates,
		className: 'inlineDiv',
		events: {
			'click' : 'klik'
		},
		initialize: function() {
			this.template = Hogan.compile(this.template);
			this.render();
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		},
		klik: function(e){

			e.stopPropagation();
			var i = $(e.target).index();
			Backbone.trigger('ruta:lokacija', [this.model.get('vrijednosti')[i].lokacija]);
			Backbone.trigger('dugme:klik');
		}

	});
	return DugmeView;
});