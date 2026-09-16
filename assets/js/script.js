(function () {
  "use strict";

  var navigation = document.querySelector('.site-navigation');
  var navbar = document.getElementById('sitenavbar');
  var navbarToggler = document.querySelector('.navbar-toggler');
  var dropdownLinks = document.querySelectorAll('.has-dropdown .dropdown-toggle-link');

  function isCollapsedMode() {
    return window.matchMedia('(max-width: 991.98px)').matches;
  }

  function closeDropdowns(except) {
    document.querySelectorAll('.has-dropdown.open, .has-dropdown.escape-closed').forEach(function (item) {
      if (item === except) return;
      item.classList.remove('open');
      item.classList.remove('escape-closed');
      var link = item.querySelector('.dropdown-toggle-link');
      if (link) link.setAttribute('aria-expanded', 'false');
    });
  }

  function setNavbarExpanded(expanded) {
    if (!navbar || !navbarToggler) return;
    navbar.classList.toggle('show', expanded);
    navbarToggler.classList.toggle('collapsed', !expanded);
    navbarToggler.setAttribute('aria-expanded', String(expanded));
    if (!expanded) closeDropdowns();
  }

  if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
      setNavbarExpanded(!navbar.classList.contains('show'));
    });
  }

  dropdownLinks.forEach(function (link) {
    var parent = link.closest('.has-dropdown');

    link.addEventListener('click', function (event) {
      if (!isCollapsedMode()) return;
      event.preventDefault();
      event.stopPropagation();

      var willOpen = !parent.classList.contains('open');
      closeDropdowns(parent);
      parent.classList.toggle('open', willOpen);
      link.setAttribute('aria-expanded', String(willOpen));
    });

    link.addEventListener('keydown', function (event) {
      if (event.key === ' ' && isCollapsedMode()) {
        event.preventDefault();
        link.click();
      }
    });

    parent.addEventListener('focusin', function () {
      if (!isCollapsedMode() && !parent.classList.contains('escape-closed')) {
        link.setAttribute('aria-expanded', 'true');
      }
    });

    parent.addEventListener('focusout', function (event) {
      if (!isCollapsedMode() && !parent.contains(event.relatedTarget)) {
        parent.classList.remove('escape-closed');
        link.setAttribute('aria-expanded', 'false');
      }
    });

    parent.addEventListener('mouseenter', function () {
      if (!isCollapsedMode()) {
        parent.classList.remove('escape-closed');
        link.setAttribute('aria-expanded', 'true');
      }
    });

    parent.addEventListener('mouseleave', function () {
      if (!isCollapsedMode() && !parent.contains(document.activeElement)) {
        link.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href*="#"]');
    if (!link) return;

    var url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search ||
        !url.hash) return;

    var target = url.hash === '#top'
      ? document.documentElement
      : document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var top = url.hash === '#top'
      ? 0
      : target.getBoundingClientRect().top + window.scrollY - 50;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });

    if (link.classList.contains('skip-link')) {
      target.focus({ preventScroll: true });
    }

    if (window.location.hash !== url.hash) {
      window.history.pushState(null, '', url.hash);
    }
  });

  if (navbar) {
    navbar.addEventListener('click', function (event) {
      if (!isCollapsedMode()) return;
      var link = event.target.closest('a');
      if (link && !link.classList.contains('dropdown-toggle-link')) {
        setNavbarExpanded(false);
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !isCollapsedMode()) {
      var activeDropdown = document.activeElement && document.activeElement.closest('.has-dropdown');
      if (!activeDropdown) return;
      var activeDropdownLink = activeDropdown.querySelector('.dropdown-toggle-link');
      if (!activeDropdownLink) return;
      activeDropdownLink.focus();
      activeDropdown.classList.add('escape-closed');
      activeDropdownLink.setAttribute('aria-expanded', 'false');
      return;
    }

    if (event.key !== 'Escape') return;
    if (!navbar || !navbar.classList.contains('show')) return;
    closeDropdowns();
    setNavbarExpanded(false);
    if (navbarToggler) navbarToggler.focus();
  });

  function updateNavigationBackground() {
    if (navigation) navigation.classList.toggle('nav-bg', window.scrollY >= 100);
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      updateNavigationBackground();
      scrollTicking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (!isCollapsedMode()) {
      setNavbarExpanded(false);
      closeDropdowns();
    }
  });

  updateNavigationBackground();
})();
