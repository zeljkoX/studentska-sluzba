define(['backbone', 'text!sabloni/modal.html','hogan', 'modal' ], function(Backbone, Templates, Hogan) {
	var ModalView = Backbone.View.extend({
		template: Templates,
		initialize: function(options) {
			var that = this;
			this.element = options.element;
			this.listenTo(this.model, 'change', this.render);
			this.template = Hogan.compile(this.template);
			this.render();
			this.model.on('sync', function(){
				$('#tabela').dataTable( {
					"bProcessing": true,
                    "aaData": this.model.get('podaci'),
                    "aoColumns": [
            { "mData": "ime" },
            { "mData": "prezime" },
            { "mData": "fakultet" },
            { "mData": "jmbg" }],
            "bPaginate": false
                });
                var a = ['Ime', 'Prezime', 'Fakultet', 'JMBG']
                $('#tabela thead tr th').each(function(index){
                	$(this).html(a[index]);
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
        	this.model.get('kolone').forEach(function(kolona, index){
                objekat[kolona] =  element.eq(index).text();      
        	});
        	this.element.val(objekat.ime + ' '+ objekat.prezime);
        	$('#myModal').modal('hide');
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