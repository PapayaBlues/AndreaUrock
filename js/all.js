(function(cash) { "use strict";	
     
	/***********************************/
	/*Google Font*/
	/**********************************/
				 
	var WebFontConfig = {
    google: { families: [ 'Lato:100,300,400,700,900,400italic:latin' ] }
    };
    (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    })();
				 
	/***********************************/
	/*Swiper Slider*/
	/**********************************/
		
    var swipers = [];
    var winW = $(window).width();
    var winH  =  $(window).height();
	var xsPoint = 700, smPoint = 991, mdPoint = 1199; 
	var initIterator = 0;
				 			 
    function swiperInit(){
		
		  $('.swiper-container').each(function(){								  
			var $th = $(this);								  
			var index = $th.attr('id'); 
				$(this).addClass('swiper-'+index + ' initialized').attr('init-attr', 'swiper-'+index);
				$(this).find('.pagination').addClass('pagination-'+index);
			
				var autoPlayVar = parseInt($th.attr('data-autoplay'));
				var slidesPerViewVar = $th.attr('data-slides-per-view');
			    var loopVar = parseInt($th.attr('data-loop'));
			    var sliderSpeed = parseInt($th.attr('data-speed'));
			    var xsValue, smValue, mdValue, lgValue;
			
			    if(slidesPerViewVar == 'responsive'){
					 xsValue = parseInt($th.attr('data-xs-slides'));
					 smValue = parseInt($th.attr('data-sm-slides'));
					 mdValue = parseInt($th.attr('data-md-slides'));
					 lgValue = parseInt($th.attr('data-lg-slides'));
					 slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
                } else slidesPerViewVar = parseInt(slidesPerViewVar);
				
				swipers ['swiper-'+index] = new Swiper('.swiper-'+index,{
					speed: sliderSpeed,
					loop: loopVar,
					resistance: false,
					grabCursor: true,
					pagination: '.pagination-'+index,
					paginationClickable: true,
					autoplay: autoPlayVar,
					autoplayDisableOnInteraction: true,
					slidesPerView: slidesPerViewVar,
					keyboardControl: true,
					calculateHeight: true,
					onInit: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($th.closest('#clients').length) {
                       $th.find('.swiper-pagination-switch').hide();
						  var widthSlide = $th.closest('#clients').find('.swiper-slide').width();
						  var numb = $th.slidesPerViewVar = parseInt($(window).width()/widthSlide);
					      var slide = $th.find('.swiper-slide').length;
						  var points = parseInt(slide - numb) + 1;
						  $th.find('.swiper-pagination-switch').slice(0, points).show();	
						}
                    },
					onSlideChangeStart: function(swiper){
						var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
						if($th.closest('.component-slider').length) {
							 $th.find('.plus-numb').text(activeIndex+1);
					     }
					}
				});
			swipers['swiper-'+index].reInit();
		    initIterator++;
       
		});
	}
				 
	 $('.arrow .slide-prev').on('click', function(){
      var arIndex = $(this).closest('.arrow').find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipePrev();
     });

     $('.arrow .slide-next').on('click', function(){
     var arIndex = $(this).closest('.arrow').find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipeNext();
     });
				 			 
				 
	function updateSlidesPerView(xsValue, smValue, mdValue, lgValue){
         if(winW > mdPoint) return lgValue;
         else if(winW>smPoint) return mdValue;
         else if(winW>xsPoint) return smValue;
         else return xsValue;
    }			 	
				 			   
    swiperInit();
				 
	/***********************************/
	/*WINDOW RESIZE*/
	/**********************************/
				 
	function resizeCall() {
		winW = $(window).width();
   		winH = $(window).height();
         $('.swiper-container[data-slides-per-view="responsive"]').each(function(){
			 var $th = $(this);
			 var xsValue = parseInt($th.attr('data-xs-slides'));
			 var smValue = parseInt($th.attr('data-sm-slides'));
			 var mdValue = parseInt($th.attr('data-md-slides'));
			 var lgValue = parseInt($th.attr('data-lg-slides'));
			 var currentSwiper = swipers[$(this).attr('init-attr')];
			 var newSlideNumber = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
			 currentSwiper.params.slidesPerView = newSlideNumber;
             currentSwiper.reInit();
         });
    }

    $(window).resize(function(){
         resizeCall();
    });	
				 
	window.addEventListener("orientationchange", function() {
         resizeCall();
    }, false);				 
	
	 /***********************************/
	 /*Video thumbs*/
	 /**********************************/
		
        $('.video-click').on( "click", function() {
			$(this).find('iframe').attr('src',$(this).find('.video-change').attr('href') + '&autoplay=1');
              $(this).find('.video').show();
              $(this).find('.img-href').hide();
			  $(this).find('.play').hide();
	    });
				   
		$('.video .clos').click(function(){
			$('.video').fadeOut(500, function(){
				$('.video iframe').attr('src','');
				$('.img-href').show();
				$('.play').show();
			});
	    });
				 
	/***********************************/
	/*Tabs click*/
	/**********************************/			 
				 
	$('.tabs-menu ul li a').click(function(){
    var a = $(this);
    var active_tab_class = 'active-tab-menu';
    var the_tab = '.' + a.attr('data-tab');
		$('.tabs-menu ul li a').removeClass('active-tab-menu');
		   a.addClass('active-tab-menu');
				$('.tabs-content .tabs').css({
				  'display' : 'none'
				});
		   $(the_tab).show();
    return false;
    });
				 
	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/			 
				 
	$(window).scroll(function() {
  
	    if ($('.time-line').length) {

		$('.time-line').not('.animated').each(function(){
		  if($(window).scrollTop() >= $(this).offset().top - $(this).height()){
		   $(this).addClass('animated').find('.timer').countTo();
		  } 
		 });	
	    
		}
		if ($(window).width()>992){
			if ($(this).scrollTop() > 200)  {
				$('header').removeClass('bg-white');
				$('header').addClass('bg-dark');
				$('header .logo-smal').addClass('show-l');
				$('header .logo-big').addClass('hide-l');
			} else {
				$('header').addClass('bg-white');
				$('header').removeClass('bg-dark');
				$('header .logo-smal').removeClass('show-l');
				$('header .logo-big').removeClass('hide-l');
			}
		}
	});
	
	/***********************************/
	/*MOBILE MENU*/
	/**********************************/
				 
	$('.mobile-menu').on('click', function(){
	   if ($('.nav').hasClass('slide')){
	      $('.nav').removeClass('slide');
		   $('body').removeClass('fix');
		  
	   }else{
	      $('.nav').addClass('slide');
		  $('body').addClass('fix');
	   }
		return false;
	});
				 
	$('.close-menu img').on('click', function(){
	      $('.nav').removeClass('slide');
		$('body').removeClass('fix');
	});	
				 
	$('.submenu > a').on( "click", function() {
        var LinkThis = $(this).parent();
        if (LinkThis.find('span').hasClass('slide-menu')) {
            LinkThis.find('span').removeClass('slide-menu');
        }else {
            $('.submenu span').removeClass('slide-menu');
            LinkThis.find('span').addClass('slide-menu');
        }
        return false;
    });
				 			 
				 
	/***********************************/
	/*LOAD MORE BUTTON*/
	/**********************************/			 
				 
	var load_more_content = $('.load-container').html();
	$(document).on('click', '.lode-more', function(){
		$('.load-container').append('<div class="ajax-slide" style="display: none;">'+load_more_content+'</div>');
		$('.ajax-slide').fadeIn(800, function(){$(this).replaceWith($(this).html())});
        var $container = $('.izotope-container');
              $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
              });
		$(this).hide();
		$('.load-container').append('<span class="no-more">no more projects</span>')
		return false;
	});
	
	/***********************************/
	/*WOW PLUGIN*/
	/**********************************/			 
	
//	if ($('.wow').length && $(window).width()>992) {			 
//	var wow = new WOW(
//	  {
//		boxClass:     'wow',      
//		animateClass: 'animated',
//		offset:       200,          
//		mobile:       true,      
//		live:         true
//	  }
//	);
//	wow.init();
//	}var $contactForm = $('#contact-form');
// $contactForm.submit(function(e) {
// 	e.preventDefault();
// 	$.ajax({
// 		url: '//formspree.io/freektopia@gmail.com',
// 		method: 'POST',
// 		data: $(this).serialize(),
// 		dataType: 'json',
// 		beforeSend: function() {
// 			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
// 		},
// 		success: function(data) {
// 			$contactForm.find('.alert--loading').hide();
// 			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
// 		},
// 		error: function(err) {
// 			$contactForm.find('.alert--loading').hide();
// 			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
// 		}
// 	});
// });
				 
	/***********************************/
	/*GOOGLE MAP*/
	/**********************************/
	
	function initialize(obj) {
		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = 'img/marker.jpg';
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"));

		var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
	
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	
	}			 
				 
	/***********************************/
	/*DETAIL MORE INFO SLIDER*/
	/**********************************/			 
				 
	$('.showin').on('click', function(){
		 if ($('.info-hide').hasClass('active')){
	         $('.info-hide').removeClass('active');
			 $(this).text('Show Information +')
	     }else {
	         $('.info-hide').addClass('active');
			 $(this).text('Hide Information -')
	     }
			 return false;
	});	
		 
	$('.zoom').on('click', function(){
	     if ($('body').hasClass('fix')) {
		     $('body').removeClass('fix');
			 $('.popup').removeClass('fixed');
		 }else {
		     $('body').addClass('fix');
			 $('.popup').addClass('fixed');
			  swiperInit();
		 }
		return false;
	});
				 
    $('.close-popup').on('click', function(){
	      $('body').removeClass('fix');
		  $('.popup').removeClass('fixed');
	});
				 
	$('.filter-but').on('click', function(){
	    if ($('.fillter-wrap').hasClass('slide')){
		    $('.fillter-wrap').removeClass('slide'); 
		}else{
		    $('.fillter-wrap').addClass('slide');
		}
		return false;
	});	
				 
	/***********************************/
	/*TIMER*/
	/**********************************/			 
				 
    function setTimer(){					   	
		var today = new Date();
		var finalTime = new Date("Oct,31,2015");
		var interval = finalTime - today;
		if(interval<0) interval = 0;
		var days = parseInt(interval/(1000*60*60*24));
		var daysLeft = interval%(1000*60*60*24);
		var hours = parseInt(daysLeft/(1000*60*60));
		var hoursLeft = daysLeft%(1000*60*60);
		var minutes = parseInt(hoursLeft/(1000*60));
		var minutesLeft = hoursLeft%(1000*60);
		var seconds = parseInt(minutesLeft/(1000));
		$('.days').text(days);
		$('.hours').text(hours);
		$('.minutes').text(minutes);
		$('.seconds').text(seconds);
	}
	setTimer();
	setInterval(function(){setTimer();}, 1000);
	
	/***********************************/
	/*ANIMSITION PLUGIN*/
	/**********************************/
				 
    if($(".animsition").length){
	   $(".animsition").animsition({
		inClass               :   'fade-in-right',
		outClass              :   'fade-out-right',
		inDuration            :    600,
		outDuration           :    800,
		linkElement           :   '.animsition-link',
		   // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
		loading               :    true,
		loadingParentElement  :   'body', 
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,

		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
	  });
	} 
				 
	/***********************************/
	/*WINDOW LOAD*/
	/**********************************/
 
    $(window).load(function() {
		$('.loader').hide();
		
		if($('#map-canvas-contact').length==1){
		 initialize('map-canvas-contact');}
		
	    if ($('.izotope-container').length) { 
			 var $container = $('.izotope-container');
              $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
              });
			  $('#filters').on( 'click', 'button', function() {
				$('.izotope-container').each(function(){
				   $(this).find('.item').removeClass('animated');
				});
				$('#filters button').removeClass('activbut');
				  $(this).addClass('activbut');
					 var filterValue = $(this).attr('data-filter');
						$container.isotope({filter: filterValue});
              });
	
           }
	});
				 			 
				 
})(jQuery); 