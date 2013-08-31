define(['backbone', 'text!sabloni/profesor-info.html', 'profesoriV/profesor-info-uredi', 'hogan'],
	function(Backbone, Templates, TemplateIzmjena, Hogan) {
		var ProfesorInfoView = Backbone.View.extend({
			template: Templates,
			initialize: function() {
				this.listenTo(this.model, 'change', this.render);
				this.template = Hogan.compile(this.template);
				Backbone.trigger('dugme', [{
					tekst: 'Obrisi Profesora',
					lokacija: this.lokacija() + 'obrisi/',
					klasa: 'btn btn-danger',
					ikona: 'icon-remove-circle icon-white'
				}]);
				this.model.on('sync', function() {
					Backbone.trigger('naslov', [this.model.get('imeIprezime')]);
					Backbone.trigger('meni', [{
						tekst: 'Osnovne Informacije',
						lokacija: this.lokacija(),
						aktivan: true
					}]);
					this.render();
				}, this);

			},
			render: function() {
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').append(this.el);
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
		return ProfesorInfoView;

	});