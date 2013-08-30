define(['backbone', 'text!sabloni/prijavePoPredmetu.html','hogan'], function(Backbone, Templates, Hogan) {
	var PrijavePoPredmetuView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			Backbone.on('dugme:klik', function(){
				console.log('dugme klik');
			});
			Backbone.trigger('meni',[{tekst: 'Studenti koji su prijavili ispit', lokacija: this.lokacija(), aktivan:'true'}]);
			this.model.on('sync', function(){
            	Backbone.trigger('naslov', [this.model.get('naziv')]);
            },this);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			this.tabela = $(this.el).find('.table').dataTable({
				/*"aoColumnDefs": [
                        { "bSearchable": true, "bVisible": false, "aTargets": [ 2 ] },
                        { "bSearchable": true,"bVisible": false, "aTargets": [ 3 ] }
                    ],*/
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