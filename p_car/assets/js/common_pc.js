$(function(){
	/* ------------------------------------------------------------------------------------------------------
	 * 자동차 슬라이드 관련
	   ------------------------------------------------------------------------------------------------------ */
	var cartab = $(".tab__item"), // 탭
		carLength = $(cartab).length, // 탭 갯수
		repeatTabView;	// 탭 인터벌 변수
	
	// init
	$(cartab).eq(0).addClass("active"); // 첫번째 탭 선택
	$(".tabbox").css("opacity", 0); // 전체 슬라이드 영역 숨김
	$(".tabbox").eq(0).css("opacity", 1); // 첫번째 탭 슬라이드 노출

	// 자동차 슬라이드
	var carOpt = {
		lazyLoad: "ondemand", 
		lazyLoadBuffer: 0, 
		arrows: true, 
		dots: false, 
		infinite: false, 
		slidesToShow: 4,
		slidesToScroll: 1,
		speed:150,
		infinite: true,
		draggable: false
	};
	$(".carproduct__list").slick(carOpt);
	
	repeatTabView = setInterval(function(){tabView(inter)}, 3000);
	
	var inter = 0;
	$(cartab).mouseenter(function(e){
		var $this = $(this),
			idx = $this.index();
		
		tabView(idx);
		
		clearInterval(repeatTabView);
		e.preventDefault();
	}).mouseleave(function(e){
		repeatTabView = setInterval(function(){tabView(inter)}, 3000);
	});
	
	$(".tab__content").mouseenter(function(){
		clearInterval(repeatTabView);
	}).mouseleave(function(e){
		repeatTabView = setInterval(function(){tabView(inter)}, 3000);
	});
	
	
	function tabView(num){
		inter = num;
		
		$(cartab).removeClass("active");
		$(cartab).eq(inter).addClass("active");
		
		// 영역 전환 후 슬릭 재구동
		$(".tabbox").stop().animate({"opacity": 0}, 200); // 슬라이드 영역 숨김
		$(".tabbox").eq(inter).stop().animate({"opacity": 1}, 200);
		
		if(inter < (carLength - 1)){
			inter++;
		}else if(inter >= (carLength - 1)){
			inter = 0;
		}
		
		return false;
	}
	
	

	/* ------------------------------------------------------------------------------------------------------
	 * 상단 메뉴 스크롤 관련
	   ------------------------------------------------------------------------------------------------------ */
	var $nav = $('.header'), 					// 스크롤될 상단 영역
		$menu = $('.menu__item'),				// 탭 메뉴
		$contents = $('.scroll'),				// 스크롤 될 위치
		$navheight = $nav.outerHeight() - 2, 	// 상단 메뉴 높이
		$navtop = Math.ceil($nav.offset().top);	// floattab 현재 위치 
	
	// 해당 섹션으로 스크롤 이동 
	$menu.on('click', function (e) {
		var currmenu = $(this).attr("data-idx"),
			offsetTop = Math.ceil($contents.eq(currmenu).offset().top);	// 선택 탭이 가야할 콘텐츠의 위치 좌표
			
		$('html, body').stop(true).animate({ scrollTop: offsetTop - $navheight}, 400); // 콘텐츠로 페이지 이동
		return false;
	});
		
	$(window).scroll(function () {
		var $scltop = Math.ceil($(window).scrollTop()); // 현재 scroll			
		
		if ($scltop > $navtop) {
			$nav.addClass("is-fixed");
			$(".visual, .subcontainer").css("margin-top", $navheight);
		} else {
			$nav.removeClass("is-fixed");
			$(".visual, .subcontainer").css("margin-top", 0);
		}
		
		$.each($contents, function (idx, item) {
			var $target = $contents.eq(idx),	// 스크롤 타겟
				//i = $target.index(),	// 스크롤 인덱스
				targetTop = Math.ceil($target.offset().top - $navheight);	// 타겟 위치

			
			if (targetTop <= $scltop) {
				$menu.removeClass('active');
				$menu.eq(idx).addClass('active');
			}
			if (!($navheight <= $scltop) || $scltop < Math.ceil($contents.eq(0).offset().top - $navheight)) {
				$menu.removeClass('active');
			}
		})
	});
	
	
	
	/* ------------------------------------------------------------------------------------------------------
	 * 페이지 로드시, getPameter
	   ------------------------------------------------------------------------------------------------------ */
	function Request(){
		var requestParam ="";
	 
		//getParameter 펑션
		this.getParameter = function(param){
			var url = unescape(location.href); 
			var paramArr = (url.substring(url.indexOf("?")+1,url.length)).split("&"); 
	 
			for(var i = 0 ; i < paramArr.length ; i++){
				var temp = paramArr[i].split("="); 
		
				if(temp[0].toUpperCase() == param.toUpperCase()){
					requestParam = paramArr[i].split("=")[1];
					
					break;
				}
			}
			return requestParam;
		}
	}
	//Request 객체 생성
	var request = new Request();
	var param = request.getParameter("movetab");

	if(param){
		setTimeout(
			function(){
				$('html, body').stop().animate({scrollTop: Math.ceil($contents.eq(param).offset().top) - $navheight}, 400)
			}
		, 300);
	}
	
	
	
	/* ------------------------------------------------------------------------------------------------------
	 * 회원가입 폼 관련
	   ------------------------------------------------------------------------------------------------------ */
	var ipt = $(".ipt--txt");
	$(ipt).on("focus", function(){
		$(this).parent().addClass("focused");
	}).on("focusout", function(){
		$(this).parent().removeClass("focused");
		
		if(this.value != 0){
			$(this).siblings(".label").hide();
		}
	});	
	
	// 전체 동의
	var $allChk = $("#allCheck");
	$allChk.on("click", function(){
		var $this = $(this);
		
		if($this.hasClass("unchk")){
			$(".chkbox span").attr("class", "chk");
		}else{
			$(".chkbox span").attr("class", "unchk");
		}
	});
});


/*checkbox*/
function agreechk(obj){
	if (obj.className== 'unchk') {
		obj.className = 'chk';
	} else {
		obj.className = 'unchk';
	}
}