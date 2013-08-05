define(['backbone', 'stranicaM/sadrzaj', 'hogan', 'text!sabloni/sadrzaj.html'], function(Backbone, SadrzajModel, Hogan, Template) {
	var SadrzajView = Backbone.View.extend({
		model: SadrzajModel,

		template: Template,
		initialize: function() {
			this.template = Hogan.compile(this.template);
			this.model.on('change', this.render);
			//this.ruter = this.options.ruter;
		},
		events: {
         'click li': 'mjenjajTab'
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			return this;
		},
		mjenjajTab: function(e){
			e.preventDefault();
			var aktivanTab = this.$el.find('li.active'),
			    klikTab = this.$el.find(e.currentTarget);
			    if(aktivanTab != klikTab){
			    	aktivanTab.removeClass('active');
			    	klikTab.addClass('active');
			    	Backbone.trigger('ruta:sadrzaj',[klikTab.children().data('lokacija')]);
			    	//this.ruter.ruta(klikTab.children().data('lokacija'));
			    }
		}


	});
	return SadrzajView;
})