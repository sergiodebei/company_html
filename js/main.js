$( document ).ready(function() {

    // scroll to the anchor  
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - $('header').outerHeight() - 20
                    }, 1000);
                    return false;
                }
            }
        });
    });
  
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 50,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 400,
    //grab the "back to top" link
    $back_to_top = $('.cd__top');

    function checkOffset() {
        if($('.flying').offset().top + $('.flying').height() >= $('footer').offset().top)
            $('.flying').css({position:'absolute', right: '20px', bottom: $('footer').height() + 'px'});
        if($(document).scrollTop() + window.innerHeight < $('footer').offset().top)
            $('.flying').css({position:'fixed', right: '20px', bottom: '20px'}); 
            // restore when you scroll up
    }

    //hide or show the "back to top" link
    $(window).scroll(function(){
        checkOffset();
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd__is-visible') : $back_to_top.removeClass('cd__is-visible cd__fade-out');
        if( $(this).scrollTop() > offset_opacity ) { 
            $back_to_top.addClass('cd__fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

    // to open a popup
    $(function() {
        //----- OPEN
        $('[data-popup-open]').on('click', function(e)  {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
     
            e.preventDefault();
        });
     
        //----- CLOSE
        $('[data-popup-close]').on('click', function(e)  {
            var targeted_popup_class = jQuery(this).attr('data-popup-close');
            $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
     
            e.preventDefault();
        });
    });

    //search submit button function
    var submitIcon = $('.sb-icon-search');
    var submitInput = $('.sb-search-input');
    var searchBox = $('.sb-search');
    var isOpen = false;
    
    $(document).mouseup(function(){
        if(isOpen == true){
        submitInput.val('');
        $('.sb-search-submit').css('z-index','-999');
        submitIcon.click();
        }
    });
    
    submitIcon.mouseup(function(){
        return false;
    });
    
    searchBox.mouseup(function(){
        return false;
    });
            
    submitIcon.click(function(e){
        event.preventDefault();
        if(isOpen == false){
            searchBox.addClass('sb-search-open');
            submitIcon.addClass('search_active');
            isOpen = true;
        } else {
            searchBox.removeClass('sb-search-open');
            submitIcon.removeClass('search_active');
            isOpen = false;
        }
    });

    $('#menu_mobile').click(function(event) {
        event.preventDefault();
        if(!$(this).hasClass('active_search')){
            $(this).toggleClass('active');
            $('.navoverlay').toggleClass('open');
        }
        else{
            $(this).removeClass('active');
            $(this).removeClass('active_search');
            $('.sb-search').removeClass('sb-search-open');
            $('.sb-icon-search').removeClass('search_active');
            $('#searchoverlay').removeClass('open');
            $("#search_mobile").removeClass('active');
            $(".icon-container").removeClass('toshow');

        }
    });

    $(window).on('resize', function(){
        $("body").css("position", "relative");
        // $('#menu_mobile').removeClass('active');
        // $('.navoverlay').removeClass('open');

        // $('.sb-search').removeClass('sb-search-open');
        // $('.sb-icon-search').removeClass('search_active');
        // $('#searchoverlay').removeClass('open');
        // $("#search_mobile").removeClass('active');
        // $(".icon-container").removeClass('toshow');
    });

    $("#search_mobile").click(function(event){
        event.preventDefault();
        $('#menu_mobile').toggleClass('active_search');
        $('#menu_mobile').toggleClass('active');
        $(".icon-container").toggleClass('toshow');
        $(this).toggleClass('active');
        $('#searchoverlay').toggleClass('open');

        setTimeout(function(){
            $('.sb-icon-search').toggleClass('search_active');
            $('.sb-search').toggleClass('sb-search-open');
            $('.sb-search-input').focus();
        }, 400);

    });

    $(window).on('load resize', function () {
        $("#home_wall").css("margin-top", $("header").outerHeight());
    });

    //to make the header fixed
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        // var headerheight = $("header").outerHeight();
        // console.log(headerheight);
        $("#home_wall").css("margin-top", $("header").outerHeight());
        if (scroll >= 50) {
            $("header").addClass("");
            // $("#home_wall").css("margin-top", $("header").outerHeight());
            $("progress").css("opacity", 1);
            if ($(window).width() > 1040) {
               $("header").addClass("onscroll");
            }
        } else {
            $("header").removeClass("onscroll");
            $("progress").css("opacity", 0);
        }
    });

    // to keep control of the testimonial section in the homepage
    // $(window).on('load resize', function () {
    //     $setthepadding = $(".whatstheheight").outerHeight();
    //     // console.log($(".tobeplaced").outerHeight());
    //     $(".bluearea_big").css({'height': $(".tobeplaced").outerHeight()});
    // });

    // to keep control of the testimonial section in the homepage
    $(window).on('load resize', function () {
        $setthepadding = $(".whatstheheight").outerHeight() - 20;
        $("#cs_testimonial_grey").css({'margin-bottom': $setthepadding });
    });

    // to animate the progress bar
    var getMax = function(){
        var toreturn = $(document).height() - $(window).height();
        return toreturn;
    }
    var getValue = function(){
        return $(window).scrollTop();
    }
    if ('max' in document.createElement('progress')) {
        
        // Browser supports progress element
        var progressBar = $('progress');

        $(document).on('scroll', function(){
            // Set the Max attr for the first time
            progressBar.attr({ max: getMax() });
            // On scroll only Value attr needs to be calculated
            progressBar.attr({ value: getValue() });
        });
        $(window).resize(function(){
          // On resize, both Max/Value attr needs to be calculated
            progressBar.attr({ max: getMax(), value: getValue() });
        });

    } else {
        var progressBar = $('.progress-bar'),
            max = getMax(),
            value, width;
        var getWidth = function() {
        // Calculate width in percentage
            value = getValue();
            width = (value/max) * 100;
            width = width + '%';
            return width;
        }
        var setWidth = function(){
            progressBar.css({ width: getWidth() });
        }

        $(window).on('load resize', function(){
        // Need to reset the Max attr
            $("progress").css({'top': $("header").outerHeight() + 8});
            max = getMax();
            setWidth();
        });
    }

    //working at tabs
    $(".people_rounded").click(function() {
        $('.people_rounded').not(this).removeClass('thumb-active');
        $(this).toggleClass('thumb-active');
        var id = $(this).attr("data-id");
        $('.tab').removeClass('tab-active');
        $('.tab[data-tab-id="'+ id + '"]').toggleClass('tab-active');
    });

    //working at accordion
    function close_accordion_section() {
        $('.accordion-section-title').removeClass('active');
        $('.accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
        e.preventDefault();
    });

    //working at tabs
    $(".preview").click(function() {
        $('.preview').not(this).removeClass('preview_active');
        $(this).addClass('preview_active');
        // $(this).attr("src", src);
        var src = $(this).children('img').attr('src');
        // console.log(id);
        $('.cs_imageholder').fadeOut(200, function() {                    
            $(this).html("<img src='" + src + "' />").fadeIn(200);
        });
    });

    //pins to map 
    // $(".citylist_ol li").click(function() {
    //     $('.citylist_ol li').not(this).removeClass('active');
    //     $(this).toggleClass('active');
    //     $('.pin').removeClass('pin_active');
    //     var id = $(this).attr("data-pin-id");
    //     $('.pin[data-id="'+ id + '"]').addClass('pin_active');
    // });

    //map to pins 
    // $(".distribution-map .pin").click(function() {
    //     $('.pin').not(this).removeClass('pin_active');
    //     $('.citylist_ol li').removeClass('active');
    //     $(this).addClass('pin_active');
    //     var pinid = $(this).attr("data-id");
    //     $('.citylist_ol li[data-pin-id="'+ pinid + '"]').addClass('active');
    // });

    //to set up the about tabs and the arrow on top of the section
    if($( ".department" ).length ){
     
        
        $(".department").click(function() {
            $('.department').not(this).removeClass('thumb-active');
            $(this).toggleClass('thumb-active');
            var offset = $(this).offset();
            // console.log(offset.left);
            var id = $(this).attr("data-id");
            $('.tab').removeClass('tab-active');
            $('.tab[data-tab-id="'+ id + '"]').toggleClass('tab-active');

            var halfimage = $(this).outerWidth() / 2;
            var offset = offset.left - $('.tabsdepartment').offset().left + halfimage - 10;
            var color = $('.tab[data-tab-id="'+ id + '"]').css( "border-top-color" );
            // console.log(offset);

            var style = document.createElement("style");
            document.head.appendChild(style);
            style.sheet.insertRule(".tabsdepartment:before{ left:" + offset + "px; border-bottom: 10px solid " + color + "}", 0);
            // document.styleSheets[0].addRule('.tabsdepartment:before','left: ' + offset + 'px');
            // document.styleSheets[0].addRule('.tabsdepartment:before','border-bottom: 10px solid ' + color);
            // document.styleSheets[0].addRule('.tab[data-tab-id="'+ id + '"]:before','left: ' + offset.left + 'px');
            // $('.tab[data-tab-id="'+ id + '"]:before').css("left", "15px");

        });

        $(window).on('load resize', function () {
            var newoffset = ($('.thumb-active').offset().left - $('.tabsdepartment').offset().left + $('.thumb-active').outerWidth() / 2 - 10);
            var newcolor = $('.tab-active').css( "border-top-color" );

            var style = document.createElement("style");
            document.head.appendChild(style);
            style.sheet.insertRule(".tabsdepartment:before{ left:" + newoffset + "px; border-bottom: 10px solid " + newcolor + "}", 0);
            // document.styleSheets[0].addRule('.tabsdepartment:before','left: ' + newoffset + 'px');
            // document.styleSheets[0].addRule('.tabsdepartment:before','border-bottom: 10px solid ' + newcolor);
        });
     
    }

    // $(window).on('load resize', function () {
    //     $('.department').each(function () {
    //         var halfimage = $(this).outerWidth() / 2;
    //         var offset = $(this).offset().left - $(this).parent().offset().left + halfimage;
    //         var id = $(this).attr("data-id");
    //         document.styleSheets[0].addRule('.tab[data-tab-id="'+ id + '"]:before','left: ' + offset + 'px');
    //     });
    // });

    $(window).on("scroll", function(){

        if($( "#ab_bluesection" ).length ){
            // console.log($('#ab_bluesection').offset().top);
            var abpff = $('#ab_bluesection').position().top;
            if(abpff > $(window).scrollTop() && abpff < $(window).scrollTop() + $(window).height()){
                console.log('in');
                // about counters
                $('.count').each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).attr("data-max")
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            }
        }
    });

    //to show the popup functionality
    $('#wa_popup').magnificPopup({

        delegate: 'a',
        type:'image',
        iframe: {
                     markup: '<button title="Close (Esc)" type="button" class="mfp-close">×</button>'
        },
        removalDelay: 300,
        mainClass: 'mfp-with-fade',
        closeOnContentClick: true,
        callbacks: {
            elementParse: function(item) {
            // Function will fire for each target element
            // "item.el" is a target DOM element (if present)
            // "item.src" is a source that you may modify

            // Do whatever you want with "item" object
            // console.log(item); 
            }
        }

    });

    // Configure/customize these variables.
    var showChar = 500;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "read more";
    var lesstext = "show less";
    

    $('.more').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });

    $(".tabs > label").click(function(){
        console.log('click');
        // $(".morelink").removeClass("less");
        // $(".morelink").html(moretext);
    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

    // $('select').each(function(){
    //     var $this = $(this), numberOfOptions = $(this).children('option').length;
      
    //     $this.addClass('select-hidden'); 
    //     $this.wrap('<div class="select"></div>');
    //     $this.after('<div class="select-styled"></div>');

    //     var $styledSelect = $this.next('div.select-styled');
    //     $styledSelect.text($this.children('option').eq(0).text());
      
    //     var $list = $('<ul />', {
    //         'class': 'select-options'
    //     }).insertAfter($styledSelect);
      
    //     for (var i = 0; i < numberOfOptions; i++) {
    //         $('<li />', {
    //             text: $this.children('option').eq(i).text(),
    //             rel: $this.children('option').eq(i).val()
    //         }).appendTo($list);
    //     }
      
    //     var $listItems = $list.children('li');
      
    //     $styledSelect.click(function(e) {
    //         e.stopPropagation();
    //         $('div.select-styled.active').not(this).each(function(){
    //             $(this).removeClass('active').next('ul.select-options').hide();
    //         });
    //         $(this).toggleClass('active').next('ul.select-options').toggle();
    //     });
      
    //     $listItems.click(function(e) {
    //         e.stopPropagation();
    //         $styledSelect.text($(this).text()).removeClass('active');
    //         $this.val($(this).attr('rel'));
    //         $list.hide();
    //         //console.log($this.val());
    //     });
      
    //     $(document).click(function() {
    //         $styledSelect.removeClass('active');
    //         $list.hide();
    //     });

    // });

    $(".checkboxes > .select-styled").click(function(){
        // $(this).toggleClass('active').next('ul.select-options').toggle();
        $(this).toggleClass('active').next('ul.select-options').slideToggle();
    });

});

// to check if the input field is filled
function buttonUp(){
    var valux = $('.sb-search-input').val(); 
    console.log(valux);
    valux = $.trim(valux).length;
    if(valux !== 0){
        $('.sb-search-submit').css('display','block');
        $('.sb-search-submit').css('z-index','99');
    } else{
        $('.sb-search-input').val(''); 
        $('.sb-search-submit').css('display','none');
        $('.sb-search-submit').css('z-index','-999');
    }
}

 $(document).ready(function() {
    $("#imageGallery, #imageGallery2, #imageGallery3").lightSlider({
        item:1,
        loop:true,
        controls: true,
        auto: true,
        speed: 4000,
        pause: 4000,
        slideMargin: 0,
        pauseOnHover: true,
        pager: false,
        // mode: 'fade',
        enableDrag: true,
        enableTouch: true  
    });  

    // $(".gallerycontainer").css({'position': 'absolute'});
  });