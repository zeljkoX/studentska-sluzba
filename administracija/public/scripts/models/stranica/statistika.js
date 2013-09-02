define(['backbone'], function(Backbone){
    var StatistikaModel = Backbone.Model.extend({
    	defaults: {
    		vrijednosti : [
    		{ 'tekst': 'Broj Studenata', 'podatak':'1500'},
    		{ 'tekst': 'Broj Studenata', 'podatak':'1500'}
    		]
    	},
    	initialize: function() {
            Backbone.on('statistika', function(options) {
                this.set({vrijednosti: options});
            },this);
        }
    }); 
    return StatistikaModel;
});