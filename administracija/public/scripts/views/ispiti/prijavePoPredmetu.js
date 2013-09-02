define(['backbone', 'templates'], function(Backbone, Templates) {
	var PrijavePoPredmetuView = Backbone.View.extend({
		template: Templates['prijavePoPredmetu'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			Backbone.trigger('meni', [{
				tekst: 'Studenti koji su prijavili ispit',
				lokacija: this.lokacija(),
				aktivan: 'true'
			}]);
			this.model.on('sync', function() {
				Backbone.trigger('naslov', [this.model.get('naziv')]);
				Backbone.trigger('statistika', [{
					tekst: 'Broj Prijava',
					podatak: this.model.get('studenti').length
				}]);
			}, this);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			this.tabela = $(this.el).find('.table').dataTable({
				"iDisplayLength": 25,
				"bPaginate": false
			});
			$('.lokacija button').hide();
			return this;
		},
		events: {

		}
	});
	return PrijavePoPredmetuView;

});