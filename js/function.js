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
	const $header = $home.nextAll('header');
	const $nav = $header.find('nav'); //직계자손선택 find()
	const $mnus = $nav.find('a');

	const $headerH = $header.height();
	const arrTopVal = []; // header 이후에 존재하는 section의 top값

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

		//각 section의 top값을 배열에 저장
		$('header~section').each(function (idx) {
			arrTopVal[idx] = $(this).offset().top;
		});
	}); //end of load resize 이벤트

	$(window).on('scroll', function () {
		let scrollTop = $(this).scrollTop();
		const $aboutme = $home.nextAll('#aboutme');

		//visual에 재미있는 효과
		if (scrollTop > $(this).height() - 400) {
			$home.css({ transform: 'scale(0.9)' });
		} else {
			$home.css({ transform: 'scale(1)' });
		}

		//header 고정
		if (scrollTop > $(this).height()) {
			$header.addClass('fixed');
			$aboutme.css({ marginTop: $headerH });
		} else {
			$header.removeClass('fixed');
			$aboutme.css({ marginTop: 0 });
		}

		//메뉴활성화표시
		for (let i = 0; i < $mnus.length; i++) {
			if (scrollTop >= arrTopVal[i] - $headerH - 150) {
				$mnus.eq(i).parent().addClass('on').siblings().removeClass('on');
			} else if (scrollTop < arrTopVal[0] - $headerH - 150) {
				$mnus.parent().removeClass('on');
			}
		} //end of for
	}); //end of scroll

	$mnus.on('click', function (evt) {
		evt.preventDefault();

		//nowIdx
		let nowIdx = $mnus.index(this);

		//animate
		$('html,body')
			.stop()
			.animate({ scrollTop: arrTopVal[nowIdx] - $headerH });
	});

	$('.logo').on('click', function (evt) {
		evt.preventDefault();
		$('html,body').stop().animate({ scrollTop: 0 });
	});
});
