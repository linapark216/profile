//loading
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut(2000);
	$loading.delay(1000).fadeOut(2000);
});

//menus & scroll
$(function () {
	const $home = $('#home');
	const $h1 = $('h1');
	const $intro = $home.children('.intro');
	const $header = $home.nextAll('header');
	const $nav = $header.find('nav'); //직계자손선택 find()
	const $mnus = $nav.find('a');
	const $btnGnb = $header.find('.btn-gnb');
	const $aside = $('aside');

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

		if (window.innerWidth > 640) {
			//PC
			$h1.css({
				//선택한 요소의 body로부터 떨어진 거리(top, left)
				top: $intro.offset().top - 72,
			});
			$nav.show();
		} else {
			//Mobile
			$h1.css({
				top: $intro.offset().top - 100,
			});

			$btnGnb.removeClass('clse');
			$nav.hide();
			$home.css({ transform: 'scale(1)' });
		}

		//각 section의 top값을 배열에 저장
		$('header~section').each(function (idx) {
			arrTopVal[idx] = $(this).offset().top;
		});
	}); //end of load resize 이벤트

	$(window).on('scroll', function () {
		let scrollTop = $(this).scrollTop();
		const $aboutme = $home.nextAll('#aboutme');

		//visual에 재미있는 효과
		if (window.innerWidth > 640) {
			if (scrollTop > $(this).height() - 400) {
				$home.css({ transform: 'scale(0.9)' });
			} else {
				$home.css({ transform: 'scale(1)' });
			}
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

		//top 버튼 노출처리
		if (scrollTop > 120) {
			$aside.fadeIn();
		} else {
			$aside.fadeOut();
		}
	}); //end of scroll

	$mnus.on('click', function (evt) {
		evt.preventDefault();

		//nowIdx
		let nowIdx = $mnus.index(this);

		//animate
		$('html,body')
			.stop()
			.animate({ scrollTop: arrTopVal[nowIdx] - $headerH });

		if (!(window.innerWidth > 640)) {
			$btnGnb.trigger('click'); //클릭이벤트 강제발생으로 메뉴가 사라지게 만듦
		}
	}); //end of 메뉴클릭 이벤트

	//반응형 햄버거 버튼
	$btnGnb.on('click', function () {
		$(this).toggleClass('clse');
		$nav.toggle();
	});

	$('.logo')
		.add($aside)
		.on('click', function (evt) {
			evt.preventDefault();
			$('html,body').stop().animate({ scrollTop: 0 });
		});
});

//ability
$(function () {
	//스크롤이 어빌리티까지 내려왔을때 실행되게

	$(window).on('scroll', function () {
		const scrollTop = $(this).scrollTop();

		if (scrollTop > $('#ability').offset().top - (window.innerHeight - 400)) {
			$('#ability .bar').each(function () {
				$(this).width($(this).children('span').text());
			});
		} else if (scrollTop < $('#ability').offset().top - window.innerHeight) {
			$('#ability .bar').width(0); // ability 영역을 벗어나 위로 올라가면 리셋
		}
	});
});
