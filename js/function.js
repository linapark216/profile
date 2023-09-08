//loading
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut(2000);
	$loading.delay(1000).fadeOut(2000);

	//load 이벤트는 화면에 데이터가 출력 완료된 시점에 발생
	$(window).on('load', function () {
		new WOW().init();
	});
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

//ux-design
$(function () {
	const $container = $('#ux-design>.slides>.slides-container');
	const $indicator = $('#ux-design>.slides>.slides-pagination>li>a');
	const $btnPrev = $('#ux-design>.slides>.slides-prev');
	const $btnNext = $('#ux-design>.slides>.slides-next');

	const animation = function () {
		$container.stop().animate({ left: -100 * nowIdx + '%' });
		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
	};
	let nowIdx = 0;
	let aniChk = false; //현재 애니메이트중이 아님을 의미

	$indicator.on('click', function (evt) {
		evt.preventDefault();

		nowIdx = $indicator.index(this);
		animation();
	});

	//버튼을 눌러서 애니메이션이 실행되는 동안에는 버튼을 눌러도 코드가 실행되지 않게 만들기
	//차단기 설치?
	$btnPrev.on('click', function (evt) {
		evt.preventDefault();

		if (!aniChk) {
			aniChk = !aniChk;

			if (nowIdx > 0) {
				nowIdx -= 1;
			} else {
				nowIdx = $indicator.length - 1;
			}

			const $slides = $('#ux-design>.slides>.slides-container>li');

			$slides.last().prependTo($container);
			$container.css({ left: '-100%' });
			$container.stop().animate({ left: 0 }, 1000, 'easeInOutCubic', function () {
				aniChk = !aniChk;
			});
			$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
		}
	});

	$btnNext.on('click', function (evt) {
		evt.preventDefault();

		if (!aniChk) {
			aniChk = !aniChk;
			if (nowIdx < $indicator.length - 1) {
				nowIdx += 1;
			} else {
				nowIdx = 0;
			}

			$container.stop().animate({ left: '-100%' }, 1000, 'easeInOutCubic', function () {
				const $slides = $('#ux-design>.slides>.slides-container>li');
				//첫번째 자식을 마지막 자식으로 이동
				$slides.first().appendTo($container);
				$container.css({ left: 0 });
				aniChk = !aniChk;
			});
			$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
		}
	});

	// $btnNext에 클릭이벤트 트리거 설정으로 n초마다 자동 애니메이션 되도록 설정
	setInterval(function () {
		$btnNext.trigger('click');
	}, 2000);
});

//portfolio
$(function () {
	//포트폴리오 슬라이드
	const $slides = $('#portfolio>.slides>.slides-container>figure');
	const $indicator = $('#portfolio>.slides>.slides-pagination>li>a');
	const $btnPrev = $('#portfolio .slides-prev');
	const $btnNext = $('#portfolio .slides-next');

	let nowIdx = 0;
	let oldIdx = nowIdx;

	const fadeFn = () => {
		$slides.eq(oldIdx).stop().fadeOut(200);
		$slides.eq(nowIdx).stop().css({ display: 'flex' }).fadeIn(200);
		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
	};

	$indicator.on('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;
		nowIdx = $indicator.index(this);

		fadeFn();
	});

	$btnNext.on('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;

		nowIdx < $slides.length - 1 ? nowIdx++ : (nowIdx = 0);

		fadeFn();
	});

	$btnPrev.on('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;

		nowIdx > 0 ? nowIdx-- : (nowIdx = $slides.length - 1);

		fadeFn();
	});

	//작업과정 라이트박스
	const $btnProc = $('#portfolio .proc');
	const $shadow = $('#portfolio .shadow');
	const $btnClse = $shadow.children('.clse');

	$btnProc.on('click', function (evt) {
		evt.preventDefault();

		// $shadow.css({ display: 'block' });
		// $shadow.show();
		$shadow.fadeIn(200);
	});

	$btnClse.on('click', function () {
		// $shadow.css({ display: 'none' });
		// $shadow.hide();
		$shadow.fadeOut(200);
	});

	$shadow.on('click', function () {
		$(this).fadeOut(200);
	});

	$shadow.children('.lightbox').on('click', function (evt) {
		evt.stopPropagation();
	});

	$(document).on('keyup', function (evt) {
		if (evt.which === 27) {
			$shadow.fadeOut(200);
		}
	});
});

//contacat
$(function () {
	const $tit = $('#contact dt>a');

	$tit.on('click', function (evt) {
		evt.preventDefault();

		$(this).parent().toggleClass('on').next().slideToggle(500);
	});
});
