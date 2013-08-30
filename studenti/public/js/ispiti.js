(function($) {
	$('.sadrzaj button').each(function(item) {
		var rok = $(this).data('rok');
		$.ajax({
			type: "GET",
			url: location.href + rok + '/prijavljeni/',
			data: {},
			success: function(response) {
				var podaci = JSON.parse(response);
				console.log(podaci);
				var rok = $('#' + podaci.rok);
				console.log(rok);
				podaci.prijave.forEach(function(item){
					if(item.value== 'true'){
						rok.find('[data-sifra='+ item.sifra + ']').attr('checked', true);
					}
				});
				
			},
			error: function(request, status, error) {
				alert('Neuspjelo slanje. Molimo pokusajte opet.');
			}
		});
	});

	$('button').click(function(e) {
		e.preventDefault();
		var rok = $(this).data('rok');
		var tabela = $('#' + rok + ' table');
		var predmeti = [];
		console.log(tabela);

		tabela.each(function(index, item) {
			console.log(index);
			console.log(item);
			$(item).find('tbody tr td input').each(function(i, v) {
				var temp = $(v);
				console.log(temp);
				if (temp.attr('disabled'))
					return;
				if (temp.is(':checked')) {
					predmeti.push({
						sifra: temp.data('sifra'),
						value: true
					});
				} else
					predmeti.push({
						sifra: temp.data('sifra'),
						value: false
					});
			});
		});
		console.log(predmeti);
		$.ajax({
			type: "POST",
			url: location.href + rok + '/',
			data: {
				predmeti: predmeti
			},
			success: function(response) {
				console.log('message');
			},
			error: function(request, status, error) {
				alert('Neuspjelo slanje. Molimo pokusajte opet.');
			}
		});

	});

}($))