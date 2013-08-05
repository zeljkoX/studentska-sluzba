define(['backbone', 'text!sabloni/fakulteti.html'], function(Backbone, Templates) {
	var FakultetView = Backbone.View.extend({
		el: $('.sadrzaj'),
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			this.render();
		},
		render: function() {
			this.$el.html(this.template);
			return this;
		},
		events: {
			
		},
		
	});
	return FakultetView;

});