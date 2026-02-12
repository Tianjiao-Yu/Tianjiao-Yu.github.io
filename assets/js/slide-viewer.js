var slideViewerState = {
  currentSlide: 0,
  slides: null,
  dots: null,
  totalSlides: 0
};

function initSlideViewer() {
  slideViewerState.slides = document.querySelectorAll('#slideViewer .slide');
  slideViewerState.totalSlides = slideViewerState.slides.length;
  
  if (slideViewerState.totalSlides === 0) return;
  
  var dotsContainer = document.getElementById('slideDots');
  var totalSlidesEl = document.getElementById('totalSlides');
  
  if (totalSlidesEl) {
    totalSlidesEl.textContent = slideViewerState.totalSlides;
  }
  
  // Create dots
  if (dotsContainer) {
    for (var i = 0; i < slideViewerState.totalSlides; i++) {
      var dot = document.createElement('span');
      dot.className = 'dot';
      if (i === 0) dot.className += ' active';
      dot.setAttribute('data-slide', i);
      dot.onclick = function() {
        goToSlide(parseInt(this.getAttribute('data-slide')));
      };
      dotsContainer.appendChild(dot);
    }
  }
  
  slideViewerState.dots = document.querySelectorAll('#slideDots .dot');
  
  // Button events
  var prevBtn = document.getElementById('prevSlide');
  var nextBtn = document.getElementById('nextSlide');
  
  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.preventDefault();
      changeSlide(-1);
      return false;
    };
  }
  
  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.preventDefault();
      changeSlide(1);
      return false;
    };
  }
  
  // Keyboard
  document.onkeydown = function(e) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'Home') goToSlide(0);
    if (e.key === 'End') goToSlide(slideViewerState.totalSlides - 1);
  };
  
  // Touch
  var touchStartX = 0;
  var slideWrapper = document.querySelector('#slideViewer .slide-wrapper');
  
  if (slideWrapper) {
    slideWrapper.ontouchstart = function(e) {
      touchStartX = e.touches[0].clientX;
    };
    
    slideWrapper.ontouchend = function(e) {
      var touchEndX = e.changedTouches[0].clientX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        changeSlide(diff > 0 ? 1 : -1);
      }
    };
  }
  
  showSlide(0);
}

function showSlide(n) {
  for (var i = 0; i < slideViewerState.slides.length; i++) {
    slideViewerState.slides[i].classList.remove('active');
    if (slideViewerState.dots[i]) {
      slideViewerState.dots[i].classList.remove('active');
    }
  }
  
  slideViewerState.slides[n].classList.add('active');
  if (slideViewerState.dots[n]) {
    slideViewerState.dots[n].classList.add('active');
  }
  
  var currentSlideEl = document.getElementById('currentSlide');
  if (currentSlideEl) {
    currentSlideEl.textContent = n + 1;
  }
  
  var prevBtn = document.getElementById('prevSlide');
  var nextBtn = document.getElementById('nextSlide');
  
  if (prevBtn) prevBtn.disabled = (n === 0);
  if (nextBtn) nextBtn.disabled = (n === slideViewerState.totalSlides - 1);
}

function changeSlide(direction) {
  slideViewerState.currentSlide += direction;
  if (slideViewerState.currentSlide < 0) slideViewerState.currentSlide = 0;
  if (slideViewerState.currentSlide >= slideViewerState.totalSlides) {
    slideViewerState.currentSlide = slideViewerState.totalSlides - 1;
  }
  showSlide(slideViewerState.currentSlide);
}

function goToSlide(n) {
  slideViewerState.currentSlide = n;
  showSlide(n);
}

// Init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSlideViewer);
} else {
  initSlideViewer();
}