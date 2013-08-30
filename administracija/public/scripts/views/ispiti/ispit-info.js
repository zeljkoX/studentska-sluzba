define(['backbone', 'text!sabloni/ispiti-info.html', 'ispitiV/ispit-info-uredi', 'hogan'],
	function(Backbone, Templates, TemplateIzmjena, Hogan) {
		var IspitInfoView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				console.log('ispiti info');
				this.listenTo(this.model, 'change', this.render);
				this.template = Hogan.compile(this.template);
				Backbone.trigger('dugme', [{
					tekst: 'Obrisi Ispit',
					lokacija: this.lokacija() + 'obrisi/',
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				this.model.on('sync', function() {
					Backbone.trigger('naslov', [this.model.get('naziv')]);
					Backbone.trigger('meni', [{
						tekst: 'Osnovne Informacije',
						lokacija: this.lokacija(),
						aktivan: true
					}, {
						tekst: 'Termini',
						lokacija: this.lokacija() + 'termini/'
					}, {
						tekst: 'Prijave',
						lokacija: this.lokacija() + 'prijave/'
					}]);
				}, this);

			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
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
		return IspitInfoView;

	});