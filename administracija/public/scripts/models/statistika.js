define(['backbone'], function(Backbone){
    var StatistikaModel = Backbone.Model.extend({
    	defaults: {
    		vrijednosti : [
    		{ 'tekst': 'Broj Studenata', 'podatak':'1500'},
    		{ 'tekst': 'Broj Studenata', 'podatak':'1500'}
    		]
    	}
    }); 
    return StatistikaModel;
});