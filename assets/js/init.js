// ========== AOS (Animate on Scroll) ==========
AOS.init();

// ========== Smooth Scroll ==========
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000
});

// ========== Swiper: 图片轮播 ==========
const imageSwiper = new Swiper('.image-swiper', {
  loop: false,
  autoPlay: {
    delay: 1000,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    }
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.image-swiper .swiper-button-next',
    prevEl: '.image-swiper .swiper-button-prev'
  },
  touchEventsTarget: 'container',
  simulateTouch: true,
});

// ========== Swiper: 内联轮播（左右布局，每次1张，自动播放）==========
document.querySelectorAll('.inline-carousel-swiper').forEach(function(el) {
  new Swiper(el, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 1200,
      disableOnInteraction: false,
    },
    speed: 300,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: el.querySelector('.swiper-button-next'),
      prevEl: el.querySelector('.swiper-button-prev'),
    },
    touchEventsTarget: 'container',
    simulateTouch: true,
  });
});

// ========== Swiper: 图片轮播（画廊：4.5张，不循环）==========
var imageSwiperGalleryEl = document.querySelector('.image-swiper-gallery');
if (imageSwiperGalleryEl) {
  new Swiper('.image-swiper-gallery', {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 4.5,
        spaceBetween: 10,
      }
    },
    navigation: {
      nextEl: '.image-swiper-gallery-next',
      prevEl: '.image-swiper-gallery-prev'
    },
    touchEventsTarget: 'container',
    simulateTouch: true,
  });
}

// ========== Swiper: 视频轮播（封面视图）==========
var videoSwiperEl = document.querySelector('.video-swiper');
var videoSwiper = videoSwiperEl ? new Swiper('.video-swiper', {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: '.video-swiper .swiper-button-next',
    prevEl: '.video-swiper .swiper-button-prev'
  },
  pagination: {
    el: '.video-swiper .swiper-pagination',
    clickable: true,
  },
  touchEventsTarget: 'container',
  simulateTouch: true,
}) : null;

// ========== 视频 Modal 逻辑 ==========
(function() {
  var modal = document.getElementById('videoModal');
  if (!modal) return;

  var iframe = document.getElementById('videoModalIframe');
  var titleEl = modal.querySelector('.video-modal-title');
  var authorEl = modal.querySelector('.video-modal-author');
  var descEl = modal.querySelector('.video-modal-desc');
  var thumbsContainer = document.getElementById('videoModalThumbs');
  var closeBtn = modal.querySelector('.video-modal-close');
  var slides = document.querySelectorAll('.video-slide');
  var allVideosBtn = document.querySelector('.video-all-btn');

  // 收集所有视频数据
  var videos = [];
  slides.forEach(function(slide, i) {
    videos.push({
      src: slide.getAttribute('data-video-src') || '',
      title: slide.getAttribute('data-video-title') || '',
      author: slide.getAttribute('data-video-author') || '',
      desc: slide.getAttribute('data-video-desc') || '',
      thumb: slide.getAttribute('data-video-thumb') || '',
      duration: slide.getAttribute('data-video-duration') || ''
    });
  });

  var currentIndex = 0;

  // 生成底部缩略图
  function buildThumbs() {
    thumbsContainer.innerHTML = '';
    videos.forEach(function(v, i) {
      var div = document.createElement('div');
      div.className = 'video-modal-thumb' + (i === currentIndex ? ' active' : '');
      var html = '<img src="' + v.thumb + '" alt="' + v.title + '">';
      // "Now Playing" 标签
      if (i === currentIndex) {
        html += '<span class="video-modal-thumb-label">Now Playing</span>';
      }
      // hover 覆盖层：标题 + 播放图标 + 时长
      html += '<div class="video-modal-thumb-hover">' +
        '<span class="video-modal-thumb-hover-title">' + v.title + '</span>' +
        '<i class="fa-regular fa-circle-play video-modal-thumb-hover-play"></i>' +
        (v.duration ? '<span class="video-modal-thumb-hover-duration">' + v.duration + '</span>' : '') +
        '</div>';
      div.innerHTML = html;
      div.addEventListener('click', function() { playVideo(i); });
      thumbsContainer.appendChild(div);
    });
  }

  // 播放指定视频
  function playVideo(index) {
    if (!videos[index]) return;
    currentIndex = index;
    var v = videos[index];
    iframe.src = v.src;
    titleEl.textContent = v.title;
    authorEl.innerHTML = v.author;
    descEl.innerHTML = v.desc;
    buildThumbs();
  }

  // 打开 Modal
  function openModal(index) {
    playVideo(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // 关闭 Modal
  function closeModal() {
    modal.classList.remove('active');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  // 判断是否为移动端（与 SCSS $mobile 断点 575px 一致）
  function isMobile() {
    return window.innerWidth <= 575;
  }

  function getCarouselEl(slide) {
    return slide ? slide.closest('.site-work-video-carousel') : null;
  }

  // 停止内联播放
  function stopInline(slide) {
    var carouselEl = getCarouselEl(slide);
    var inlineIframe = slide.querySelector('iframe');
    if (inlineIframe) inlineIframe.remove();
    slide.classList.remove('playing');
    if (carouselEl) {
      var toolbar = carouselEl.querySelector('.video-inline-toolbar');
      if (toolbar) toolbar.remove();
      carouselEl.classList.remove('has-playing');
    }
  }

  // 移动端：在封面原地嵌入 iframe 播放
  function playInline(slide, index) {
    var carouselEl = getCarouselEl(slide);
    if (slide.classList.contains('playing')) return;
    var src = videos[index] ? videos[index].src : '';
    if (!src) return;

    // 嵌入 iframe
    var inlineIframe = document.createElement('iframe');
    inlineIframe.src = src;
    inlineIframe.setAttribute('allowfullscreen', '');
    inlineIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    inlineIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    inlineIframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;z-index:5;';
    slide.appendChild(inlineIframe);

    // 添加工具栏（分享 + 关闭）
    if (carouselEl && !carouselEl.querySelector('.video-inline-toolbar')) {
      var toolbar = document.createElement('div');
      toolbar.className = 'video-inline-toolbar';

      // 分享按钮
      var shareBtn = document.createElement('button');
      shareBtn.className = 'video-inline-toolbar-btn';
      shareBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i>';
      shareBtn.setAttribute('aria-label', 'Share');
      shareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var videoData = videos[index];
        if (navigator.share && videoData) {
          navigator.share({ title: videoData.title, url: window.location.href });
        }
      });
      toolbar.appendChild(shareBtn);

      // 分隔线
      var sep = document.createElement('span');
      sep.className = 'video-inline-toolbar-sep';
      toolbar.appendChild(sep);

      // 关闭按钮
      var closeBtn = document.createElement('button');
      closeBtn.className = 'video-inline-toolbar-btn';
      closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      closeBtn.setAttribute('aria-label', 'Close video');
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        stopInline(slide);
      });
      toolbar.appendChild(closeBtn);

      carouselEl.insertBefore(toolbar, carouselEl.firstChild);
    }

    slide.classList.add('playing');
    if (carouselEl) carouselEl.classList.add('has-playing');
  }

  // 封面轮播 Play Video 按钮点击
  slides.forEach(function(slide, i) {
    slide.addEventListener('click', function(e) {
      e.preventDefault();
      if (isMobile()) {
        playInline(slide, i);
      } else {
        openModal(i);
      }
    });
  });

  // "All Videos +" 按钮 → 移动端也打开 Modal（因为要看全部视频列表）
  if (allVideosBtn) {
    allVideosBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var activeIndex = videoSwiper ? videoSwiper.activeIndex : 0;
      openModal(activeIndex);
    });
  }

  // Swiper 切换 slide 时停止移动端内联播放
  if (videoSwiper) {
    videoSwiper.on('slideChange', function() {
      slides.forEach(function(slide) {
        if (slide.classList.contains('playing')) {
          stopInline(slide);
        }
      });
    });
  }

  // 关闭按钮
  closeBtn.addEventListener('click', closeModal);

  // 点击 Modal 背景关闭
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // ESC 键关闭
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();
