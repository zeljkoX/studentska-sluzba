define(['backbone', 'text!templates/pocetna.html'], function(Backbone, Templates) {
	var IndexView = Backbone.View.extend({
		el: $('.stranica'),
		template: Templates,
		render: function() {
			this.$el.html(this.template);
			console.log('pocetna');
			return this;
		},
		initialize: function() {
		},
		events: {
			"click .btn-block": "otvori"
		},
		otvori: function(e){
			Backbone.history.navigate((e.currentTarget.getAttribute("data-link")+'/'),{trigger: true});

        },
	});
	return IndexView;

});