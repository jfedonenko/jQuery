(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

  /* HAMBURGER */

    $('.mobile_menu, .main-menu-close').click(function(event) {
      $('.main-menu').toggleClass('active');
    });

    /* MODAL */
    $('.header-btn').on("click", function () {
      $('.modal-form').fadeIn();
    });

    $('.form-modal').on("click", function () {
      $('.modal-form').fadeOut();
    });

    $('.modal-form__overlay').on("click", function () {
      $('.modal-form').fadeOut();
    });

    $('.form-modal').children().on("click", function (e) {
      e.stopPropagation();
    });

  /* SLIDER */

    const swiper = new Swiper ('.swiper', {
      direction : 'horizontal',
      loop : true,
      stopOnLastSlide : false,
      speed : 900,
      autoplay : {
        delay: 3000
      }
  });

  /* PARALLAX */

    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);

  /* TABS */

    $('.nav-item').on('click', function(e){
      e.preventDefault();
      let currTab = $(this).index();
      
      $('.nav-item').removeClass('active');
      $(this).addClass('active');

      $('.tab-pane').removeClass('show active');
      $('.tab-pane').eq(currTab).addClass('show active');
    });

    $('.nav-item').on('click', function() {
      let tabBtn = $(this).attr('data-id', 'value');
      
      $('html, body').animate({
        scrollTop: $(tabBtn).offset().top
      }, {
      duration: 400,
      easing: "linear"
      });
      return false;
    });

    /* VALIDATE */

      $('.button-form').on('click', function(e) {
          e.preventDefault();
          $(this).parent('form').submit();
      })

      $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
              let regExp = new RegExp(regexp);
              return this.optional(element) || regExp.test(value);
          },
          "Please check your input."
      )

    function valEll(el) {
      el.validate({
        rules : {
          firstName : {
            required: true,
            regex : "[A-Za-z]{1,32}"
          },
          email : {
            required: true,
            regex : "[0-9A-Za-z]"
          },
          phone: {
            digits : true,
            required: true,
            minlength: 10,
            maxlength: 13,
            regex: "[0-9]+"
          }
        },
        messages: {
          firstName : {
            required: "Field is required",
            regex : "Enter your name correctly"
          },
          email : {
            required: "Field is required",
            regex : "Enter your email correctly"
          },
          phone: {
            required: "Field is required",
            regex : "Enter your phone correctly"
          }
        },
        submitHandler: function(form) {
          $('#preloader-active').fadeIn();
          let $form = $(form);
          let $formId = $(form).attr('id');
          switch($formId) {
            case 'modal-form':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize()
              })
              .done(function() {
                console.log('Success')
              })
              .fail(function() {
                console.log('Fail')
              })
              .always(function() {
                setTimeout(function() {
                  $form.trigger('reset');
                  $('.modal-form').fadeOut();
                }, 1000);
                setTimeout(function() {
                  $form.trigger('reset');
                  $('#preloader-active').fadeOut();
                }, 1400)
              });
              break;
              case 'book-form':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize()
              })
              .done(function() {
                console.log('Success')
              })
              .fail(function() {
                console.log('Fail')
              })
              .always(function() {
                setTimeout(function() {
                  $form.trigger('reset');
                }, 1000);
                setTimeout(function() {
                  $form.trigger('reset');
                  $('#preloader-active').fadeOut();
                }, 1400)
              });
              break;
          }
          return false;
        }
      })
    }
  
    $('.form-val').each(function() {
      valEll($(this));
    });
})(jQuery);
