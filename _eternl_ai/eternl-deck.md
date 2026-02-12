---
title: ""
permalink: /eternl_ai/eternl-deck/
layout: single
author_profile: false
sidebar:
  nav: "eternl_ai"
order: 0
---

# Eternl Deck

<div class="slide-viewer">
  <div class="slide-container">
    <button class="slide-nav prev" onclick="changeSlide(-1)">❮</button>
    
    <div class="slide-wrapper">
      <img src="/images/eternl/Full_0430/ba55bb5d-01.png" alt="Slide 1" class="slide active">
      <img src="/images/eternl/Full_0430/ba55bb5d-02.png" alt="Slide 2" class="slide">
      <img src="/images/eternl/Full_0430/ba55bb5d-03.png" alt="Slide 3" class="slide">
      <img src="/images/eternl/Full_0430/ba55bb5d-04.png" alt="Slide 4" class="slide">
      <img src="/images/eternl/Full_0430/ba55bb5d-05.png" alt="Slide 5" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-06.png" alt="Slide 6" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-07.png" alt="Slide 7" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-08.png" alt="Slide 8" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-09.png" alt="Slide 9" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-10.png" alt="Slide 10" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-11.png" alt="Slide 11" class="slide">
    <img src="/images/eternl/Full_0430/ba55bb5d-12.png" alt="Slide 12" class="slide">
      <!-- Add all your slide images here -->
    </div>
    
    <button class="slide-nav next" onclick="changeSlide(1)">❯</button>
  </div>
  
  <div class="slide-counter">
    <span class="current-slide">1</span> / <span class="total-slides">5</span>
  </div>
  
  <div class="slide-dots"></div>
</div>

<style>
.slide-viewer {
  max-width: 1000px;
  margin: 2em auto;
  background: #f8f9fa;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.slide-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1em;
}

.slide-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.slide {
  width: 100%;
  display: none;
  animation: fadeIn 0.3s ease-in-out;
}

.slide.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.slide-nav {
  background: #667eea;
  color: white;
  border: none;
  font-size: 2em;
  padding: 0.5em 0.75em;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  user-select: none;
}

.slide-nav:hover {
  background: #5568d3;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.slide-nav:active {
  transform: scale(0.95);
}

.slide-nav:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.slide-counter {
  text-align: center;
  margin-top: 1em;
  font-size: 1.1em;
  font-weight: 600;
  color: #2d3748;
}

.current-slide {
  color: #667eea;
  font-size: 1.3em;
}

.slide-dots {
  display: flex;
  justify-content: center;
  gap: 0.5em;
  margin-top: 1em;
  flex-wrap: wrap;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cbd5e0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot.active {
  background: #667eea;
  transform: scale(1.3);
}

.dot:hover {
  background: #5568d3;
  transform: scale(1.2);
}

/* Responsive */
@media (max-width: 768px) {
  .slide-viewer {
    padding: 1em;
  }
  
  .slide-nav {
    font-size: 1.5em;
    padding: 0.4em 0.6em;
  }
  
  .slide-container {
    gap: 0.5em;
  }
}

.keyboard-hint {
  text-align: center;
  margin-top: 1em;
  color: #718096;
  font-size: 0.9em;
}
</style>

<script>
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize dots
const dotsContainer = document.querySelector('.slide-dots');
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');
document.querySelector('.total-slides').textContent = totalSlides;

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[n].classList.add('active');
  dots[n].classList.add('active');
  
  document.querySelector('.current-slide').textContent = n + 1;
  
  // Update button states
  document.querySelector('.prev').disabled = (n === 0);
  document.querySelector('.next').disabled = (n === totalSlides - 1);
}

function changeSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
  showSlide(currentSlide);
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(currentSlide);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'Home') goToSlide(0);
  if (e.key === 'End') goToSlide(totalSlides - 1);
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slide-wrapper').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slide-wrapper').addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) changeSlide(1);
  if (touchEndX > touchStartX + 50) changeSlide(-1);
}

// Initialize
showSlide(0);
</script>

<p class="keyboard-hint">💡 Use ← → arrow keys or swipe to navigate</p>