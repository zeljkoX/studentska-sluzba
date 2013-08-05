define(['backbone', 'hogan'], function(Backbone, Hogan) {
	var NaslovView = Backbone.View.extend({
		template: '<h3> {{naslov}}</h3>',
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);

		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		}

	});
	return NaslovView;
});