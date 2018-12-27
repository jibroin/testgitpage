$(function(){
	/* ------------------------------------------------------------------------------------------------------
	 * 자동차 슬라이드 관련
	   ------------------------------------------------------------------------------------------------------ */
	var cartab = $(".tab__item"); // 탭
	
	// init
	$(cartab).eq(0).addClass("active"); // 첫번째 탭 선택
	$(".tabbox").css({"opacity": 0, "z-index": 1}); // 전체 슬라이드 영역 숨김
	$(".tabbox").eq(0).css({"opacity": 1, "z-index": 10}); // 첫번째 탭 슬라이드 노출

	// 자동차 슬라이드
	var carOpt = {
		lazyLoad: "ondemand", 
		lazyLoadBuffer: 0, 
		arrows: false, 
		dots: true, 
		infinite: false, 
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		speed: 150,
		infinite: true,
		variableWidth: true
	};
	$(".carproduct__list").slick(carOpt);
	
	$(cartab).on("click", function(e){
		var $this = $(this),
			idx = $this.index(), // 선택된 index
			tabScroll = ($this.width() * idx / 3);
		
		$('html, body').stop(true).animate({ scrollTop: $(".tab").offset().top - winPadding}, 300, function(){
			//$(".scrolllist").animate({scrollLeft: tabScroll*idx}, 300, function(){
				// 탭 전환
				$(cartab).removeClass("active");
				$this.addClass("active");
			//}); // 탭 스트롤 이동
		});
		
		
		// 영역 전환 후 슬릭 재구동
		$(".tabbox").animate({"opacity": 0, "z-index": 1}, 200); // 슬라이드 영역 숨김
		$(".tabbox").eq(idx).animate({"opacity": 1, "z-index": 10}, 200);
		
		e.preventDefault();
		return false;
	});


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
	
	/* ------------------------------------------------------------------------------------------------------
	 * 회원가입 배너 관련
	   ------------------------------------------------------------------------------------------------------ */
	var winPadding;
	$(window).load(function(){
		winPadding = $(".floating").outerHeight();
		$(".wrapper").css({"padding-top": winPadding + "px"});
		
		$(window).resize(function(e){		
			console.log($(window).width());
			winPadding = $(".floating").outerHeight();
			$(".wrapper").css({"padding-top": winPadding + "px"});
		})
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