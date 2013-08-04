define(['backbone', 'text!templates/stranica.html', 'views/naslov', 'views/statistika', 'views/lokacija', 'views/dugme', 'views/sadrzaj', 'models/naslov', 'models/statistika', 'models/lokacija', 'models/dugme', 'models/sadrzaj'], function(Backbone, Template, NaslovView, StatistikaView, LokacijaView, DugmeView, SadrzajView, NaslovModel, StatistikaModel, LokacijaModel, DugmeModel, SadrzajModel) {
	var StranicaView = Backbone.View.extend({
		el: $('.stranica'),
		template: Template,
		views: {},
		initialize: function() {
			this.ruter = this.options.ruter;
			//this.views.naslov = NaslovView();
			//this.statistika = new StatistikaView();
			//this.lokacija = new LokacijaView();
		},
		render: function() {
			console.log('stranica');
			this.$el.html(this.template);

			var naslovModel = new NaslovModel({
				'naslov': 'RADIIIII'
			}),
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
				model: sadrzajModel,
				ruter: this.ruter
			});
			this.$el.find('.naslov').html(this.views.naslov.render().el);
			this.$el.find('.statistika').html(this.views.statistika.render().el);
			this.$el.find('.lokacija').html(this.views.lokacija.render().el);
			this.$el.find('.sadrzaj').html(this.views.sadrzaj.render().el);



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