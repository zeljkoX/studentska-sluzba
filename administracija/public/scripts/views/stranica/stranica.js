define(['backbone', 'templates', 'stranicaV/naslov', 'stranicaV/statistika', 'stranicaV/lokacija', 'stranicaV/dugme', 'stranicaV/sadrzaj', 'stranicaM/naslov', 'stranicaM/statistika', 'stranicaM/lokacija', 'stranicaM/dugme', 'stranicaM/sadrzaj'], function(Backbone, Template, NaslovView, StatistikaView, LokacijaView, DugmeView, SadrzajView, NaslovModel, StatistikaModel, LokacijaModel, DugmeModel, SadrzajModel) {
	var StranicaView = Backbone.View.extend({
		el: $('.stranica'),
		template: Template['stranica'],
		views: {},
		initialize: function() {
			this.render();
		},
		render: function() {
			console.log('stranica');
			this.$el.html(this.template.render());

			var naslovModel = new NaslovModel({naslov: '-'}),
				statistikaModel = new StatistikaModel(),
				dugmeModel = new DugmeModel();
			    lokacijaModel = new LokacijaModel(),
			    sadrzajModel = new SadrzajModel();

			this.views.naslov = new NaslovView({
				model: naslovModel
			});
			this.views.statistika = new StatistikaView({
				model: statistikaModel
			});
			this.views.dugme = new DugmeView({
				model: dugmeModel
			});
			this.views.lokacija = new LokacijaView({
				model: lokacijaModel,
				dugme: this.views.dugme
			});
			this.views.sadrzaj = new SadrzajView({
				model: sadrzajModel
			});
			this.$el.find('.naslov').html(this.views.naslov.render().el);
			this.$el.find('.statistika').html(this.views.statistika.render().el);
			this.$el.find('.lokacija').html(this.views.lokacija.render().el);
			this.$el.find('.tabovi').prepend(this.views.sadrzaj.render().el);
			//this.iteKomponente();
			//this.$el.append(this.komponente.naslov.el);
			return this;
		},
		iteKomponente: function() {
			_.each(this.views, function(komponenta, i) {
				komponenta.render();
				this.$el.find('.naslov').html(komponenta.el);
			}, this)
		}
	});
	return StranicaView;
});