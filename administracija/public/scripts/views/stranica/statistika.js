define(['backbone', 'templates'], function(Backbone, Templates) {
	var StatistikaView = Backbone.View.extend({
		template: Templates['statistika'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render)
			Backbone.on('statistika', function(options) {
				this.model.set({
					vrijednosti: options[0]
				});
			}, this);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		}
	});
	return StatistikaView;
});