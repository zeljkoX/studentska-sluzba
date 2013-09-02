define(['backbone', 'templates'], function(Backbone, Templates) {
	var SadrzajView = Backbone.View.extend({
		template: Templates['sadrzaj'],
		tagName: 'ul',
		className: 'nav nav-tabs',
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			Backbone.on('meni', function(options) {
				this.model.set({
					meni: options
				});
			}, this);
			this.setElement(this.el);
		},
		events: {
			'click li': 'mjenjajTab'
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		},
		mjenjajTab: function(e) {
			e.preventDefault();
			var aktivanTab = this.$el.find('li.active'),
				klikTab = this.$el.find(e.currentTarget);
			if (aktivanTab != klikTab) {
				aktivanTab.removeClass('active');
				klikTab.addClass('active');
				Backbone.trigger('ruta:lokacija', [klikTab.children().data('lokacija')]);
			}
		}
	});
	return SadrzajView;
})