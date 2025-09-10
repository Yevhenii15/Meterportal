<template>
  <section class="reviews">
    <div class="container">
      <h2 class="section-title">Trust by Consumers and Utilities</h2>

      <!-- Horizontal scrollable reviews -->
      <div
        ref="scrollContainer"
        class="reviews-scroll"
        @scroll="updateProgress"
      >
        <div class="review-card" v-for="(review, index) in reviews" :key="index">
          <!-- Header with name + role -->
          <div class="review-header">
            <h3>{{ review.name }}</h3>
            <span class="role">{{ review.role }}</span>
          </div>

          <!-- Quote icon floating on card -->
          <span class="quote-icon">
            <img src="../public/img/quotes.png" alt="quote icon" />
          </span>

          <!-- Stars -->
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star">
              <span v-if="i <= review.rating">★</span>
              <span v-else>☆</span>
            </span>
          </div>

          <!-- Text with vertical line -->
          <div class="quote-wrapper">
            <p class="quote">“{{ review.text }}”</p>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const reviews = ref([
  {
    name: "Anna K.",
    role: "Consumer",
    rating: 4,
    text: "I finally understand my energy bill! The app makes tracking so easy and even fun.",
  },
  {
    name: "EnergieNet",
    role: "Utility",
    rating: 5,
    text: "The Consumer App has improved customer satisfaction by making energy data transparent and accessible.",
  },
  {
    name: "NordicPower",
    role: "Utility",
    rating: 3,
    text: "Our support calls dropped significantly — the app answers most customers’ questions before they even ask.",
  },
  {
    name: "GreenEnergy",
    role: "Utility",
    rating: 5,
    text: "Outstanding tool for monitoring usage in real time. Great experience!",
  },
  {
    name: "GreenEnergy",
    role: "Utility",
    rating: 3,
    text: "Outstanding tool for monitoring usage in real time. Great experience!",
  },
  {
    name: "GreenEnergy",
    role: "Utility",
    rating: 2,
    text: "Outstanding tool for monitoring usage in real time. Great experience!",
  },
  {
    name: "GreenEnergy",
    role: "Utility",
    rating: 4,
    text: "Outstanding tool for monitoring usage in real time. Great experience!",
  },
  {
    name: "GreenEnergy",
    role: "Utility",
    rating: 1,
    text: "Outstanding tool for monitoring usage in real time. Great experience!",
  },
]);

const scrollContainer = ref(null);
const progress = ref(0);

const updateProgress = () => {
  const el = scrollContainer.value;
  if (!el) return;
  const scrollLeft = el.scrollLeft;
  const scrollWidth = el.scrollWidth - el.clientWidth;
  progress.value = (scrollLeft / scrollWidth) * 100;
};
</script>

<style scoped>
.reviews {
  background: #1d1d1d;
  color: #fff;
  padding: 0 0 100px 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 40px;
}

.reviews-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px;
}

.review-card {
  flex: 0 0 30%; /* show 3 cards on desktop */
  background: #3a3a3a;
  border-radius: 25px;
  padding: 20px;
  position: relative;
  scroll-snap-align: start;
  min-width: 280px;
}

.review-header {
  background: #F0532D;
  border-radius: 12px 60px 60px 12px;
  padding: 15px 20px;
  margin-bottom: 20px;
  width: 80%; /* only cover 60% of card width */
}

.review-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.review-header .role {
  font-size: 0.95rem;
  color: #f0f0f0;
  display: block;
}

.quote-icon {
  position: absolute;
  top: 35px;
  right: 25px;
}

.quote-icon img {
  height: 45px;
  width: auto;
  filter: brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(4119%) hue-rotate(2deg) brightness(97%) contrast(105%);
}

.stars {
  color: #F0532D;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

/* Quote with vertical line */
.quote-wrapper {
  border-left: 3px solid #F0532D;
  padding-left: 12px;
}

.quote {
  font-size: 1rem;
  line-height: 1.5;
  color: #e0e0e0;
  margin: 0;
}

/* Progress bar */
.progress-bar {
  height: 4px;
  background: #444;
  border-radius: 4px;
  margin-top: 25px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #e91e63, #ff9800);
  transition: width 0.2s ease;
}

/* Responsive */
@media (max-width: 1000px) {
  .review-card {
    flex: 0 0 45%; /* 2 cards on tablets */
  }
}

@media (max-width: 600px) {
  .review-card {
    flex: 0 0 90%; /* 1 card on mobile */
  }
}
</style>
