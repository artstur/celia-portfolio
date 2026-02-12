$(document).ready(function() {
  "use strict";
  // Scroll to top
  $("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Smooth scroll
  $('a.scroll-to').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 700);
    event.preventDefault();
  });

  $('.site-testimonial-item').on('mouseenter', function(){
    $('.site-testimonial-item').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
  });
  $('.site-testimonial-item').on('mouseleave', function(){
    $('.site-testimonial-item').removeClass('inactive');
    $('.site-testimonial-item').removeClass('active');
  });

  // Mobile dropdown toggle: click to expand/collapse sub-menu
  $('.has-dropdown .dropdown-toggle-link').on('click', function(e) {
    if ($(window).width() <= 575) {
      e.preventDefault();
      var $parent = $(this).closest('.has-dropdown');
      var isOpen = $parent.hasClass('open');
      // Close all other dropdowns
      $('.has-dropdown').not($parent).removeClass('open')
        .find('.dropdown-toggle-link').attr('aria-expanded', 'false');
      // Toggle current
      $parent.toggleClass('open');
      $(this).attr('aria-expanded', !isOpen);
    }
  });

  // Keyboard navigation: Enter/Space to toggle dropdown
  $('.has-dropdown .dropdown-toggle-link').on('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      if ($(window).width() <= 575) {
        e.preventDefault();
        $(this).trigger('click');
      }
    }
  });

  // Close dropdowns when navbar collapses
  $('#sitenavbar').on('hide.bs.collapse', function() {
    $('.has-dropdown').removeClass('open');
    $('.dropdown-toggle-link').attr('aria-expanded', 'false');
  });
});

$(window).on('scroll', function () {
  var windscroll = $(window).scrollTop();
  if (windscroll >= 100) {
    $('.site-navigation').addClass('nav-bg');
  } else {
    $('.site-navigation').removeClass('nav-bg');
  }
});
