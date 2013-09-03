define(['backbone', 'templates', 'studentiV/student-info-uredi'],
	function(Backbone, Templates, TemplateIzmjena) {
		var StudentInfoView = Backbone.View.extend({
			template: Templates['student-info'],
			initialize: function() {
				this.listenTo(this.model, 'change', this.render);
				Backbone.trigger('dugme', [{
					tekst: 'Obrisi Studenta',
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
					}, {
						tekst: 'Semestri',
						lokacija: this.lokacija() + 'semestri/'
					}]);
					Backbone.trigger('statistika', [{}]);
					this.render();
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
		return StudentInfoView;

	});