(function($){

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').find('input,textarea').jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
				alert(1);
			},
			submitSuccess: function($form, event) {
				event.preventDefault();

				var contactform 					= $("#contact-form");
				var submit          			= $(':submit', contactform);
				var ajaxResponseTitle    	= $('.module-title', "#contact");
				var ajaxResponseMessage 	= $('.module-subtitle', "#contact");

				var name            = $("input#cname").val();
				var email           = $("input#cemail").val();
				var message         = $("textarea#cmessage").val();

				$.ajax({
					type: 'POST',
					url: 'email/',
					dataType: 'json',
					data: {
						name: name,
						email: email,
						message: message,
					},
					cache: false,
					beforeSend: function(result) {
						submit.empty();
						submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							ajaxResponseTitle.html(result.title);
							ajaxResponseMessage.html(result.message);
							$form.fadeOut(500);
						} else {
							ajaxResponseTitle.html(result.title);
							ajaxResponseMessage.html(result.message);
						}
					}
				});
			}
		});

	});

})(jQuery);
