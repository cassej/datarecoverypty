$(document).ready(function() {
  // Detect browser language
  let browserLang = navigator.language || navigator.userLanguage;
  let currentLang = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
  
  // Check for stored language preference
  const storedLang = localStorage.getItem('preferred-language');
  if (storedLang) {
    currentLang = storedLang;
  }
  
  // Apply language on page load
  applyLanguage(currentLang);
  
  // Language toggle
  $('#langToggle').on('click', function() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('preferred-language', currentLang);
    applyLanguage(currentLang);
  });
  
  // Apply language function
  function applyLanguage(lang) {
    $('html').attr('lang', lang);
    $('#currentLang').text(lang.toUpperCase());
    
    // Update all elements with data-i18n attribute
    $('[data-i18n]').each(function() {
      const key = $(this).attr('data-i18n');
      const keys = key.split('.');
      let translation = translations[lang];
      
      // Navigate through nested keys
      for (let k of keys) {
        if (translation && translation[k]) {
          translation = translation[k];
        } else {
          translation = key; // Fallback to key if not found
          break;
        }
      }
      
      // Apply translation based on element type
      if ($(this).is('meta[name="description"]')) {
        $(this).attr('content', translation);
      } else if ($(this).is('title')) {
        $(this).text(translation);
      } else {
        $(this).html(translation);
      }
    });
  }
  
  // Smooth scrolling for navigation links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 64
      }, 1000);
    }
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
      }
    });
  }, observerOptions);
  
  $('.fade-in').each(function() {
    observer.observe(this);
  });
  
  // Back to top button
  const $backToTop = $('#backToTop');
  
  // Show back to top on load if scrolled
  if ($(window).scrollTop() > 200) {
    $backToTop.addClass('visible');
  }
  
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 200) {
      $backToTop.addClass('visible');
    } else {
      $backToTop.removeClass('visible');
    }
  });
  
  $backToTop.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });
  
  // Add animation delay to cards
  $('.grid .card, .grid .fade-in').each(function(index) {
    $(this).css('transition-delay', (index * 100) + 'ms');
  });
  
  $('.list-items .list-item').each(function(index) {
    $(this).css('transition-delay', (index * 100) + 'ms');
  });
  
  $('.timeline-item').each(function(index) {
    $(this).css('transition-delay', (index * 200) + 'ms');
  });
  
  // Mobile menu toggle
  $('#mobileMenuToggle').on('click', function() {
    $(this).toggleClass('active');
    $('#navLinks').slideToggle(300);
  });
  
  // Close mobile menu when clicking on a link
  $('#navLinks a').on('click', function() {
    if ($(window).width() < 768) {
      $('#mobileMenuToggle').removeClass('active');
      $('#navLinks').slideUp(300);
    }
  });
  
  // Navbar scroll effect
  let lastScroll = 0;
  $(window).on('scroll', function() {
    const currentScroll = $(this).scrollTop();
    
    if (currentScroll > 100) {
      $('.nav').css('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.3)');
    } else {
      $('.nav').css('box-shadow', 'none');
    }
    
    lastScroll = currentScroll;
  });
});
