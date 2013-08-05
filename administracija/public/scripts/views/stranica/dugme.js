define(['backbone', 'text!sabloni/dugme.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var DugmeView = Backbone.View.extend({
		tagName: 'button', 
		template: Templates,
		initialize: function() {
			this.template = Hogan.compile(this.template);
			this.render();
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON())).removeClass().addClass(this.model.get('vrijednosti').klasa);
			return this;
		}

	});
	return DugmeView;
});