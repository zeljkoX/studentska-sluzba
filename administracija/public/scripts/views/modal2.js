define(['backbone', 'text!sabloni/modal.html','hogan', 'modal' ], function(Backbone, Templates, Hogan) {
	var ModalView = Backbone.View.extend({
		template: Templates,
		initialize: function(options) {
			var that = this;
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			this.render();
			this.model.on('sync', function(){
				$('#tabela').dataTable( {
					"bProcessing": true,
                    "aaData": this.model.get('podaci'),
                    "aoColumns": [
            { "mData": "naziv" },
            { "mData": "sifra" }],
            "bPaginate": false
                });
                $('#tabela thead tr th').each(function(index){
                	$(this).html(that.model.attributes.kolone[index]);
                });
				Backbone.trigger('modal');

			},this);
			
			/*Backbone.trigger('naslov', ['Predmeti']);
			Backbone.trigger('dugme', [{tekst: 'Dodaj Predmet', lokacija: 'predmeti/dodaj-predmet/', klasa: 'btn btn-success', ikona: 'icon-plus-sign icon-white'}]);
			Backbone.trigger('meni',[{tekst: 'Lista Predmeta', lokacija: this.lokacija(), aktivan:'true'}]);*/
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
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
                //uklanjanje fakultet stavke
            var temp = this.model.get('kolone');
              temp.pop();
              this.model.set({kolone: temp});

        	this.model.get('kolone').forEach(function(kolona, index){
                objekat[kolona] =  element.eq(index).text();      
        	});
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