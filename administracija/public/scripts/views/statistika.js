define(['backbone', 'text!templates/statistika.html', 'hogan'], function(Backbone, Template, Hogan) {
	var StatistikaView = Backbone.View.extend({
		template: Template,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render)
			this.template = Hogan.compile(this.template);
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