require.config({
	paths: {
		'jquery': '../../../components/jquery/jquery',
		'underscore': '../../../components/underscore-amd/underscore',
		'backbone': '../../../components/backbone-amd/backbone',
		'views': 'views',
		'templates': 'views/templates',
		'hogan': '../../../components/hogan.js/hogan-2.0.0.amd',
		'text': '../../../components/requirejs/text',
		'stranicaV': 'views/stranica/',
		'stranicaM': 'models/stranica/',
		'fakultetiV': 'views/fakulteti/',
		'fakultetiM': 'models/fakulteti/',
		'studentiV': 'views/studenti/',
		'studentiM': 'models/studenti/',
		'predmetiV': 'views/predmeti/',
		'predmetiM': 'models/predmeti/',
		'sabloni': 'views/templates/',
		'modal' : 'modal'
	},
	backbone: {
		deps: ['jquery', 'underscore']
	}
});
require(['routers/main', 'backbone'], function(AppRouter, Backbone) {
	Backbone.View.prototype['lokacija'] = function() {
		return (location.href).replace(/.*administracija\//g, '');
	};
	Backbone.lokacija = function(korak) {
		var lokacija = (location.href).replace(/.*administracija\//g, '');
		if(korak){
            var  urls = lokacija.split('/');
            urls.length -= (1 + korak);
            return urls.join('/') + '/';
		}
		return lokacija;
	};
	var a = new AppRouter();
	Backbone.history.start({
		pushState: true,
		root: "/administracija/"
	});

});