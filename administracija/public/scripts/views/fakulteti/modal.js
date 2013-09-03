define(['backbone', 'templates','modal' ], function(Backbone, Templates) {
	var ModalView = Backbone.View.extend({
		template: Templates['modal'],
		initialize: function(options) {
			var that = this;
			//this.listenTo(this.model, 'change', this.render);
			
			this.model.on('sync', function(){
                this.render();
			},this);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
            //this.$el.find('.table').dataTable({"aaSorting": [[ 1, "asc" ]]});
            console.log(this.el);
			$('#myModal').on('hidden.bs.modal', function () {
            $(this).remove();
             });
			return this;
		},
		events: {
			'click .odaberi': 'odabir',
			'click #tabela tbody tr' : 'selekcija'
		},
        odabir: function(){
        	var element = $('#tabela tr.success td'),
        	objekat = {};

        	this.model.get('kolone').forEach(function(kolona, index){
                objekat[kolona] =  element.eq(index).text();      
        	});
            console.log(objekat);
        	Backbone.trigger('rezultat',[objekat]);
        	$('#myModal').modal('hide');
            Backbone.trigger('render');
        	//$('#myModal').remove();

        },
        selekcija: function(e){
        	var element = $(e.currentTarget);
        	if(element.hasClass('success')){
        		element.removeClass('success');
        	}
        	$('#tabela tr.success').removeClass('success');
        	element.addClass('success');
        }

	});
	return ModalView;

});