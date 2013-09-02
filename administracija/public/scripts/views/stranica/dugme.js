define(['backbone', 'templates'], function(Backbone, Templates) {
	var DugmeView = Backbone.View.extend({
		template: Templates['dugme'],
		className: 'inlineDiv',
		events: {
			'click' : 'klik'
		},
		initialize: function() {
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