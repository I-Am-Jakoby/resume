/*
 Theme Name: Bittanto
 Theme URI: https://themeforest.net/user/themewar/portfolio
 Author: themewar
 Author URI: 
 Description: Bittanto - Creative Resume HTML5 Responsive Template
 Version: 1.0
 License:
 License URI:
*/
 /*=======================================================================
 [Table of contents]
 =========================================================================
 1. Init Vars
 2. All Slider
 3. Mixer
 4. Folio Ajax
 5. Gmaps
 6. Sidebar Toggle
 7. Skills
 8. Funfact
 9. Form Submission
 10. Mobile Menu
 11. Back To Top
 12. preloader
*/

(function ($) {
    'use strict';
    
    /*--------------------------------------------------------
    / 1. Init Vars
    /---------------------------------------------------------*/
    var testimonialSlider = $('.testimonialSlider'),
        clientSlider = $('.clientSlider'),
        Grid = $('#Grid'),
        folioGallery = $('#folioGallery'),
        pssBox = $('.pssBox'),
        hasCounter = $('.hasCounter');
    
    /*--------------------------------------------------------
    / 2. All Slider
    /----------------------------------------------------------*/
    if(testimonialSlider.length > 0){
        var testimonialSlider_obj = testimonialSlider.owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            dots: true,
            items: 1,
            navText: ['<i class="icofont-long-arrow-left"></i>', '<i class="icofont-long-arrow-right"></i>']
        });
    }
    
    if(clientSlider.length > 0){
        var clientSlider_obj = clientSlider.owlCarousel({
            margin: 2,
            loop: true,
            nav: false,
            dots: false,
            items: 4,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    autoWidth: false
                },
                768:{
                    items:2
                },
                1024:{
                    items:3
                },
                1200:{
                    items:4
                }
            }
        });
    }
    
    if(folioGallery.length > 0){
        folioGallery.lightSlider({
            gallery:true,
            item:1,
            loop:true,
            thumbItem:3,
            slideMargin:0,
            enableDrag: false,
            currentPagerPosition:'left',
            thumbMargin: 5,
            onSliderLoad: function() {
                folioGallery.removeClass('cS-hidden');
            }     
        }); 
    }
    
    /*--------------------------------------------------------
    / 3. Mixer
    /---------------------------------------------------------*/
    if (Grid.length > 0){
        Grid.themeWar();
    }
    
    $(document).ready(function(){ 
        if(!$('body').hasClass('innerPage')){
            $('#tabContainer').easytabs({
                tabs : 'ul#mainTab > li', 
                updateHash : false,
                animate : true,
                transitionIn :'fadeIn',
                transitionOut :'fadeOut',
                animationSpeed : 250,
                tabActiveClass :'active',
                transitionInEasing : 'linear',
                transitionOutEasing : 'linear'
            }); 
        }
    });
    $('.contact_me').click( function(e) {
        e.preventDefault();
        $('#tabContainer').easytabs('select', '#contact');
    });
    
    /*--------------------------------------------------------
    / 4. Folio Ajax
    /---------------------------------------------------------*/
    if($('.loadMoreItem').length > 0){
        $('.loadMoreItem').on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            $this.addClass('working');
            var count = parseInt($this.attr('data-count'), 10);
            if(count < 3){
                $.ajax({
                    type: 'post',
                    url: 'ajax/folio.php',
                    data: {count : count},
                    success: function(data){
                        setTimeout(function(){
                            $(Grid).append(data);
                            Grid.themeWar();
                            $this.removeClass('working');
                            $this.attr('data-count', (count + 1));
                            [].slice.call(document.querySelectorAll('.folio_effect > .folio_item')).forEach(function (stackEl) {
                                new HamalFx(stackEl);
                            });
                        }, 1500);
                    }
                });
            }else{
                $(Grid).append('<div class="col-lg-12 alertCols"><div class="alert alert-warning folioAlert" role="alert">Sorry! No more posts available.</div></div>');
                $this.removeClass('working');
                $('.loadMoreRow .loadMoreCol').fadeOut();
                setTimeout(function(){
                    $('.alertCols').remove();
                }, 2500);
            }
        });
    }
    
    /*--------------------------------------------------------
    / 5. Gmaps
    /---------------------------------------------------------*/
    if ($('#map').length > 0) {
        var map;
        map = new GMaps({
            el: '#map',
            lat: 53.967015,
            lng: -1.079608,
            scrollwheel: false,
            zoom: 16,
            zoomControl: false,
            panControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            overviewMapControl: false,
            clickable: false
        });
        var image = '';
        map.addMarker({
            lat: 53.967015,
            lng: -1.079608,
            icon: 'assets/images/marker.png',
            animation: google.maps.Animation.DROP,
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            backgroundColor: '#d3cfcf'
        });
        
        if($('body').hasClass('light')){
            var styles = [
                {
                    "featureType": "road",
                    "stylers": [
                        {"color": "#eaeaeb"}
                    ]
                }, {
                    "featureType": "water",
                    "stylers": [
                        {"color": "#C8D7D4"}
                    ]
                }, {
                    "featureType": "landscape",
                    "stylers": [
                        {"color": "#fafafa"}
                    ]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {"color": "#e5e5e5"}
                    ]
                }, {
                    "featureType": "poi",
                    "stylers": [
                        {"color": "#eceef7"}
                    ]
                }, {
                    "elementType": "labels.text",
                    "stylers": [
                        {"saturation": 1},
                        {"weight": 0.1},
                        {"color": "#53575b"}
                    ]
                }

            ];
        }else{
            var styles = [
                {
                    "featureType": "road",
                    "stylers": [
                        {"color": "#292533"}
                    ]
                }, {
                    "featureType": "water",
                    "stylers": [
                        {"color": "#262330"}
                    ]
                }, {
                    "featureType": "landscape",
                    "stylers": [
                        {"color": "#312e3b"}
                    ]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {"color": "#262330"}
                    ]
                }, {
                    "featureType": "poi",
                    "stylers": [
                        {"color": "#201e29"}
                    ]
                }, {
                    "elementType": "labels.text",
                    "stylers": [
                        {"saturation": 1},
                        {"weight": 0.1},
                        {"color": "#aaa9ac"}
                    ]
                }
            ];
        }
        map.addStyle({
            styledMapName: "Styled Map",
            styles: styles,
            mapTypeId: "map_style"
        });
        map.setStyle("map_style");
    }
    
    /*--------------------------------------------------------
    / 6. Sidebar Toggle
    /---------------------------------------------------------*/
    $('.sidebarToggler').on('click', function(e){
        e.preventDefault();
        if($('body').hasClass('SideBarOpend')){
            $(".sidebar").mCustomScrollbar("destroy");
        }else{
            $(".sidebar").mCustomScrollbar();
        }
        $('body').toggleClass('SideBarOpend');
    });
    
    $('.sidebarOverlay, .widget_closer').on('click', function(){
        $('body').removeClass('SideBarOpend');
        $(".sidebar").mCustomScrollbar("destroy");
    });
    
    /*--------------------------------------------------------
    / 7. Skills
    /---------------------------------------------------------*/
    $(window).on('load', function(e){
        if(pssBox.length > 0){
            loadSkills();
        }
    });
    var coun = true;
    function loadSkills()
    {
        $(".pssBox").each(function() {
            var datacount = $(this).attr("data-count");
            $(".pssbBar", this).animate({'width': datacount + '%'}, 2000);
            if (coun)
            {
                $(this).find('.pssbCount').each(function() {
                    var $this = $(this);
                    $({Counter: 0}).animate({Counter: datacount}, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.ceil(this.Counter) + '.');
                        }
                    });
                });

            }
        });
        coun = false;
    }
    
    /*--------------------------------------------------------
    / 8. Funfact
    /---------------------------------------------------------*/
    var skl = true;
    hasCounter.appear();
    hasCounter.on('appear', function() {
        if (skl)
        {
            hasCounter.each(function() {
                var $this = $(this);
                jQuery({Counter: 0}).animate({Counter: $this.attr('data-count')}, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        var num = Math.ceil(this.Counter).toString();
                        $('.counter', $this).html(num);
                    }
                });
            });
            skl = false;
        }
    });
    /*--------------------------------------------------------
    / 9. Form Submission
    /---------------------------------------------------------*/
    if ($('#contactForm').length > 0) {
        $('#contactForm').on('submit', function (e) {
            e.preventDefault();
            var $this = $(this);
            var form_data = $this.serialize();
            $('button[type="submit"]', $this).html('<span><i class="icon icon-Restart"></i>Processing...</span>');
            
            var required = 0;
            $('.required', $this).each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('reqError');
                    required += 1;
                }
            });
            if (required === 0) {
                $.ajax({
                    type: 'POST',
                    url: 'ajax/mail.php',
                    data: { form_data: form_data },
                    success: function (data) {
                        $('input, textarea', $this).val('');
                        $('button[type="submit"]', $this).html('<span><i class="icon icon-Like"></i>Done!</span>');
                        setTimeout(function(){
                            $('button[type="submit"]', $this).html('<span><i class="icon icon-Mail"></i>Send Message</span>');
                        }, 1500);
                    }
                });
            } else {
                $('button[type="submit"]', $this).html('<span><i class="icon icon-Dislike"></i>Failed!</span>');
                setTimeout(function(){
                    $('button[type="submit"]', $this).html('<span><i class="icon icon-Mail"></i>Send Message</span>');
                }, 1500);
            }

        });
        $('.required').on('keyup', function () {
            $(this).removeClass('reqError');
        });
    }
    
    /*--------------------------------------------------------
    / 10. Mobile Menu
    /---------------------------------------------------------*/
    $('.mainMenu ul li.menu-item-has-children > a').on('click', function(e){
        e.preventDefault();
        $(this).siblings('ul').slideToggle();
    });
    $('.menu_btn').on('click', function(e){
        e.preventDefault();
        $('.mainMenu').slideToggle();
        $(this).toggleClass('active');
    });
    
    /*--------------------------------------------------------
    / 11. Back To Top
    /---------------------------------------------------------*/
    var back = $("#backtotop"),
        body = $("body, html");
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(window).height()){
            back.css({bottom: '30px', opacity: '1', visibility: 'visible'});
        } else {
            back.css({bottom: '-30px', opacity: '0', visibility: 'hidden'});
        }
    });
    body.on("click", "#backtotop", function (e) {
        e.preventDefault();
        body.animate({scrollTop: 0}, 800);
        return false;
    });
    
    /*--------------------------------------------------------
    / 12. Preloader
    /---------------------------------------------------------*/
    $(window).load(function () {
        var preload = $('.preloader');
        if (preload.length > 0) {
            preload.delay(800).fadeOut(500);
        }
    });

})(jQuery);