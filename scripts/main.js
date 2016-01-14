// initiliaze skrollr
var s = skrollr.init();

jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}


	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});

	$('.numbers__counter .numbers__num').counterUp({
	    delay: 10, // the delay time in ms
	    time: 1000 // the speed time in ms
	});

	$('.js-logo-lines path').css('stroke-dasharray', 870);
	$('.js-logo-lines path').css('stroke-dashoffset', 870);
	$(".js-logo-fill").css({"-webkit-transform":"translate(2px,5px)", "transition":"all 0.5s ease-in"});
	$(".js-logo-lines").fadeIn();
	$('.js-logo-lines path').animate({ 
		strokeDashoffset: 0 
	}, 2000, function(){
		$(".js-logo-fill").fadeIn().css({"-webkit-transform":"translate(0px,0px)"}, 1000);
		$(".js-stamp").fadeIn("slow");
	});

	var sections = 	$('section'), 
					nav = $('nav'),
					nav_height = nav.outerHeight();

	$(window).on('scroll', function () {
	  var cur_pos = $(this).scrollTop();
	  
	  console.log(cur_pos);
	  if (cur_pos > $("header").height()) {
		nav.addClass("menu--dark");
	  } else {
	  	nav.removeClass("menu--dark");
	  	nav.find('li').removeClass('menu__item--current');
	  };

	  sections.each(function() {
	    var top = $(this).offset().top - nav_height,
	        bottom = top + $(this).outerHeight();
	    
	    if (cur_pos >= top && cur_pos <= bottom) {
	      nav.find('li').removeClass('menu__item--current');
	      sections.removeClass('menu__item--current');
	      
	      $(this).addClass('menu__item--current');
	      nav.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('menu__item--current');
	    }
	  });
	});

	nav.find('a').on('click', function () {
	  var $el = $(this)
	    , id = $el.attr('href');
	  
	  $('html, body').animate({
	    scrollTop: $(id).offset().top - nav_height
	  }, 500);
	  
	  return false;
	});


});


(function() {
	[].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
		var menuItems = menu.querySelectorAll('.menu__link'),
			setCurrent = function(ev) {
				ev.preventDefault();

				var item = ev.target.parentNode; // li

				// return if already current
				if (classie.has(item, 'menu__item--current')) {
					return false;
				}
				// remove current
				classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
				// set current
				classie.add(item, 'menu__item--current');
			};

		[].slice.call(menuItems).forEach(function(el) {
			el.addEventListener('click', setCurrent);
		});
	});
})(window);

