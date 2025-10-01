<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFeedback } from "@/composables/useFeedback";

const { feedbacks, getFeedbacks, createFeedback, loading, error } =
  useFeedback();

const scrollContainer = ref<HTMLElement | null>(null);
const progress = ref(0);

const updateProgress = () => {
  const el = scrollContainer.value;
  if (!el) return;
  const scrollLeft = el.scrollLeft;
  const scrollWidth = el.scrollWidth - el.clientWidth;
  progress.value = (scrollLeft / scrollWidth) * 100;
};

onMounted(() => {
  getFeedbacks();
});

// form state
const newFeedback = ref<Feedback>({
  name: "",
  email: "",
  role: "Consumer",
  rating: 5,
  message: "",
});

const submitting = ref(false);
const submitFeedback = async () => {
  if (!newFeedback.value.name || !newFeedback.value.message) {
    alert("Name and message are required.");
    return;
  }
  submitting.value = true;
  const success = await createFeedback(newFeedback.value);
  submitting.value = false;
  if (success) {
    alert("Thank you for your feedback!");
    // reset form
    newFeedback.value = {
      name: "",
      email: "",
      role: "Consumer",
      rating: 5,
      message: "",
    };
  } else {
    alert("Failed to submit feedback. Try again.");
  }
};
</script>

<template>
  <section class="reviews">
    <div class="container">
      <h2 class="section-title">Trusted by Consumers and Utilities</h2>

      <!-- Feedback Form -->
      <div class="feedback-form">
        <h3>Leave Your Feedback</h3>
        <input v-model="newFeedback.name" type="text" placeholder="Your Name" />
        <input
          v-model="newFeedback.email"
          type="email"
          placeholder="Your Email"
        />
        <select v-model="newFeedback.role">
          <option value="Consumer">Consumer</option>
          <option value="Utility">Utility</option>
        </select>
        <div class="rating">
          <label v-for="i in 5" :key="i">
            <input type="radio" :value="i" v-model="newFeedback.rating" />
            {{ i }}★
          </label>
        </div>
        <textarea
          v-model="newFeedback.message"
          placeholder="Your feedback"
        ></textarea>
        <button :disabled="submitting" @click="submitFeedback">
          {{ submitting ? "Submitting..." : "Submit Feedback" }}
        </button>
      </div>

      <div v-if="loading">Loading feedback...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Horizontal scrollable reviews -->
      <div
        v-else
        ref="scrollContainer"
        class="reviews-scroll"
        @scroll="updateProgress"
      >
        <div class="review-card" v-for="review in feedbacks" :key="review._id">
          <div class="review-header">
            <h3>{{ review.name }}</h3>
            <span class="role">{{ review.role }}</span>
          </div>

          <span class="quote-icon">
            <img src="../public/img/quotes.png" alt="quote icon" />
          </span>

          <div class="stars">
            <span v-for="i in 5" :key="i" class="star">
              <span v-if="i <= review.rating">★</span>
              <span v-else>☆</span>
            </span>
          </div>

          <div class="quote-wrapper">
            <p class="quote">“{{ review.message }}”</p>
          </div>

          <div v-if="review.adminResponse?.message" class="admin-response">
            <strong>Owner:</strong> {{ review.adminResponse.message }}
          </div>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </section>
</template>

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

/* --- Feedback Form --- */
.feedback-form {
  margin: 0 auto 60px auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #2a2a2a;
  padding: 35px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.feedback-form h3 {
  color: #f0532d;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}

.feedback-form input,
.feedback-form select,
.feedback-form textarea {
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #444;
  background: #1d1d1d;
  color: #fff;
  font-size: 1rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.feedback-form input::placeholder,
.feedback-form textarea::placeholder {
  color: #aaa;
}

.feedback-form input:focus,
.feedback-form select:focus,
.feedback-form textarea:focus {
  border-color: #f0532d;
  box-shadow: 0 0 8px rgba(240, 83, 45, 0.6);
  outline: none;
}

.feedback-form textarea {
  resize: vertical;
  min-height: 120px;
}

.feedback-form button {
  padding: 14px;
  background: linear-gradient(135deg, #f0532d, #ff7e29);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.feedback-form button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #e91e63, #ff7e29);
  opacity: 0.95;
}

.feedback-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.rating {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 1.1rem;
}

.rating label {
  cursor: pointer;
  font-weight: 500;
  color: #ccc;
}

.rating input {
  margin-right: 6px;
}

/* --- Horizontal Reviews & Progress Bar --- */
.reviews-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px;
}

.review-card {
  flex: 0 0 30%;
  background: #3a3a3a;
  border-radius: 25px;
  padding: 20px;
  position: relative;
  scroll-snap-align: start;
  min-width: 280px;
}

.review-header {
  background: #f0532d;
  border-radius: 12px 60px 60px 12px;
  padding: 15px 20px;
  margin-bottom: 20px;
  width: 80%;
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
  filter: brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(4119%)
    hue-rotate(2deg) brightness(97%) contrast(105%);
}

.stars {
  color: #f0532d;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.quote-wrapper {
  border-left: 3px solid #f0532d;
  padding-left: 12px;
}

.quote {
  font-size: 1rem;
  line-height: 1.5;
  color: #e0e0e0;
  margin: 0;
}

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

.admin-response {
  margin-top: 12px;
  font-size: 0.9rem;
  color: #ffd180;
  border-left: 3px solid #ffd180;
  padding-left: 10px;
}

/* --- Responsive Tweaks Only --- */
@media (max-width: 1000px) {
  .reviews {
    padding-left: 30px;
    padding-right: 30px;
  }
  .section-title {
    font-size: 1.8rem;
    text-align: center;
  }
  .review-card {
    flex: 0 0 45%;
  }

  .feedback-form {
    padding: 25px 20px;
    gap: 14px;
  }

  .feedback-form h3 {
    font-size: 1.4rem;
  }

  .feedback-form input,
  .feedback-form select,
  .feedback-form textarea {
    font-size: 0.95rem;
  }

  .feedback-form button {
    font-size: 0.95rem;
    padding: 12px;
  }
}

@media (max-width: 600px) {
  .reviews {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 50px;
    padding-top: 50px;
  }
  .section-title {
    font-size: 1.8rem;
    text-align: center;
  }

  .review-card {
    flex: 0 0 90%;
  }

  .feedback-form {
    padding: 20px 15px;
    gap: 12px;
  }

  .feedback-form h3 {
    font-size: 1.2rem;
  }

  .feedback-form input,
  .feedback-form select,
  .feedback-form textarea {
    font-size: 0.9rem;
  }

  .feedback-form button {
    font-size: 0.9rem;
    padding: 10px;
  }
}
</style>
