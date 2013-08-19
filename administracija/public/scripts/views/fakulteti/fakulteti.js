define(['backbone', 'text!sabloni/fakulteti.html','hogan'], function(Backbone, Templates, Hogan) {
	var FakultetiView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			console.log(this);
			Backbone.trigger('naslov', ['Fakulteti']);
			Backbone.trigger('dugme', [{tekst: 'Dodaj Fakultet', lokacija: 'fakulteti/dodaj-fakultet/', klasa: 'btn btn-success', ikona: 'icon-plus-sign icon-white'}]);
			Backbone.trigger('meni',[{tekst: 'Lista Fakulteta', lokacija: this.lokacija(), aktivan:'true'}]);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		},
		events: {
			'click table': 'otvori'
		},
		otvori: function(e){
             e.preventDefault();
             var element = $(e.target).data('lokacija');
             if(element)
             Backbone.trigger('ruta:lokacija',['fakulteti/' +element]);

		}
		
	});
	return FakultetiView;

});