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

<div class="slide-viewer" id="slideViewer">
  <div class="slide-container">
    <button class="slide-nav prev" id="prevSlide" type="button">❮</button>
    
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
    </div>
    
    <button class="slide-nav next" id="nextSlide" type="button">❯</button>
  </div>
  
  <div class="slide-counter">
    <span class="current-slide" id="currentSlide">1</span> / <span class="total-slides" id="totalSlides">12</span>
  </div>
  
  <div class="slide-dots" id="slideDots"></div>
</div>

<p class="keyboard-hint">💡 Use ← → arrow keys or swipe to navigate</p>

<script src="/assets/js/slide-viewer.js"></script>

<style>
/* Keep all your CSS here - same as before */
.slide-viewer {
  max-width: 1200px;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide {
  width: 100%;
  height: auto;
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
  font-size: 2.5em;
  padding: 0.6em 0.85em;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  user-select: none;
  flex-shrink: 0;
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
  font-size: 1.2em;
  font-weight: 600;
  color: #2d3748;
}

.current-slide {
  color: #667eea;
  font-size: 1.4em;
}

.slide-dots {
  display: flex;
  justify-content: center;
  gap: 0.5em;
  margin-top: 1em;
  flex-wrap: wrap;
}

.dot {
  width: 14px;
  height: 14px;
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
    font-size: 1.8em;
    padding: 0.5em 0.7em;
  }
  
  .slide-container {
    gap: 0.5em;
  }
  
  .slide-wrapper {
    min-height: 400px;
  }
}

.keyboard-hint {
  text-align: center;
  margin-top: 1em;
  color: #718096;
  font-size: 0.95em;
}
</style>

