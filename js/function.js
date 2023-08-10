//loading
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut(2000);
	$loading.delay(1000).fadeOut(2000);
});

//
$(function () {
	const $home = $('#home');

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
	});
});
