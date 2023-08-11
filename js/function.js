//loading
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut(2000);
	$loading.delay(1000).fadeOut(2000);
});

//
$(function () {
	const $home = $('#home');
	const $h1 = $('h1');
	const $intro = $home.children('.intro');

	/*
        브라우저 화면의 크기
        
        1) 스크롤바와 툴바를 포함하지 않은 브라우저 화면의 크기
            window.innerWidth
            window.innerHeight
        2) 스크롤바와 툴바를 포함한 브라우저 화면의 크기
            window.outerWidth
            window.outerHeight
    */

	$(window).on('load resize', function () {
		$home.height(window.innerHeight);

		$h1.css({
			//선택한 요소의 body로부터 떨어진 거리(top, left)
			top: $intro.offset().top - 72,
		});
	});
});
