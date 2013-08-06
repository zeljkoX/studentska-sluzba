define(['backbone', 'text!sabloni/dugme.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var DugmeView = Backbone.View.extend({
		tagName: 'button', 
		template: Templates,
		events: {
			'click' : 'klik'
		},
		initialize: function() {
			this.template = Hogan.compile(this.template);
			this.render();
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON())).removeClass().addClass(this.model.get('vrijednosti').klasa);
			return this;
		},
		klik: function(){
			Backbone.trigger('ruta:lokacija', [this.model.get('vrijednosti').lokacija]);
		}

	});
	return DugmeView;
});