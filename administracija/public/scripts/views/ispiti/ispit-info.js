define(['backbone', 'templates', 'ispitiV/ispit-info-uredi'],
	function(Backbone, Templates, TemplateIzmjena) {
		var IspitInfoView = Backbone.View.extend({
			template: Templates['ispiti-info'],
			initialize: function() {
				this.listenTo(this.model, 'change', this.render);
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
		return IspitInfoView;

	});