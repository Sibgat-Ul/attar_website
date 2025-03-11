<template>
    <div class="carousel">
      <!-- Slides Container -->
      <div 
        class="slides" 
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="slide"
        >
          <img :src="slide.src" :alt="slide.title" class="slide-image">
          <div v-if="slide.title" class="slide-content">
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
  
      <!-- Navigation Buttons -->
      <button class="nav-button prev" @click="prevSlide">&#10094;</button>
      <button class="nav-button next" @click="nextSlide">&#10095;</button>
  
      <!-- Pagination Dots -->
      <div class="dots">
        <span 
          v-for="(dot, index) in slides" 
          :key="index" 
          class="dot" 
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 3000 // 3 seconds
  }
});

const currentIndex = ref(0);
const totalSlides = computed(() => props.slides.length);

// Next Slide
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
}

// Previous Slide
function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
}

// Go to Specific Slide
function goToSlide(index) {
  currentIndex.value = index;
}

// Autoplay Logic
let autoplayInterval = null;
if (props.autoplay) {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, props.interval);
}

// Cleanup Interval on Component Unmount
onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval);
});
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  max-height: 80vh;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev { left: 10px; }
.next { right: 10px; }

.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background: rgba(255, 255, 255, 1);
}


</style>