define(['backbone', 'templates', 'predmetiV/predmet-info-uredi'],
 function(Backbone, Templates, TemplateIzmjena) {
	var PredmetInfoView = Backbone.View.extend({
		template: Templates['predmet-info'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			Backbone.trigger('dugme', [{
				tekst: 'Obrisi Predmet',
				lokacija: this.lokacija() + 'obrisi/',
				klasa: 'btn btn-danger',
				ikona: 'icon-remove-circle icon-white'
			}]);
			Backbone.trigger('statistika', [{}]);
			this.model.on('sync', function() {
				Backbone.trigger('naslov', [this.model.get('naziv')]);
				Backbone.trigger('meni', [{
					tekst: 'Osnovne Informacije',
					lokacija: this.lokacija(),
					aktivan: true
				}]);
			}, this);
			this.render();

		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			$('body').removeClass('ucitavanje');
			return this;
		},
		events: {
			'click button': 'uredi'
		},
		uredi: function(e) {
			var that = this;
			e.preventDefault();
			this.changeView(new TemplateIzmjena({
				model: that.model
			}));
		},
		changeView: function(view) {
			if (null != this.currentView) {
				this.currentView.undelegateEvents();
				this.currentView = null;
			}
			this.currentView = view;
			this.currentView.delegateEvents();
			this.$el.empty().append(this.currentView.render().el);
		},
	});
	return PredmetInfoView;

});