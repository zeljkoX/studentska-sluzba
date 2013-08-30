$(function() {
	$('.alert').hide();
	$("form").submit(function() {
		var model = {
			username: $('#username').val(),
			password: $('#password').val(),
		};
		$.ajax({
			type: "POST",
			url: "/login/",
			data: model
		}).done(function(data){
           console.log(data);
           location.href = data;
		}).fail(function(msg){
			$('.alert').show();
		});
		return false;
	});
});