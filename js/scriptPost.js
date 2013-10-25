$(function(){
	$('#menuHead li>ul').hide();
	$('#menuHead>ul>li').on('mouseover', function(){
		$(this).find('ul').slideDown();
		$(this).on('mouseleave', function(){
			$(this).find('ul').slideUp();
		});
	});
});