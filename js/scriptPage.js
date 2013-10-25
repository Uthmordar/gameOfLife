$(function(){
	$('#menuHead li>ul').hide();
	$('#menuHead>ul>li').on('mouseover', function(){
		$(this).find('ul').slideDown();
		$(this).on('mouseleave', function(){
			$(this).find('ul').slideUp();
		});
	});

	$('.widget ul, .widget form, .widget .fleche').hide();
	$('.widget h4').on('click', function(){
		$(this).next('ul, form').slideDown();
		$(this).prev('.fleche').show();
		$('.fleche').on('click', function(){
			$(this).parent('.widget').find('ul, form').slideUp();
			$(this).hide();
		});
	});
});