<script setup>
import { ref, onMounted } from "vue";
import { useCharacteristics } from "@/composables/useCharacteristics";
import ContactModal from "./ContactModal.vue";

const { characteristics, getCharacteristics, loading, error } = useCharacteristics();
const activeFeature = ref(null);
const showContact = ref(false);

onMounted(() => {
  getCharacteristics();
});

const openFeature = (feature) => {
  activeFeature.value = feature;
};

const closeFeature = () => {
  activeFeature.value = null;
};
</script>

<template>
  <section id="features" class="features-view">
    <div class="container">
      <h2 class="section-title">Features you get by choosing us</h2>

      <!-- Horizontal scrollable screenshots -->
      <div class="screens-scroll">
        <div
          v-for="(feature, index) in characteristics"
          :key="feature._id || index"
          class="screen-card"
          @click="openFeature(feature)"
        >
          <img
            :src="feature.GraphicUrl"
            :alt="feature.Title"
            class="screenshot"
          />
          <div class="overlay">
            <h3>{{ feature.Title }}</h3>
            <p>{{ feature.ShortDescription }}</p>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="activeFeature" class="modal-overlay" @click.self="closeFeature">
        <div class="modal-content">
          <button class="close-btn" @click="closeFeature">✕</button>

          <div class="modal-body">
            <div class="modal-text">
              <div class="modal-heading">
                <h2>{{ activeFeature.Title }}</h2>
              </div>
              <div class="modal-subtitle">
                <h3>{{ activeFeature.SecondTitle }}</h3>
              </div>
              <p v-html="activeFeature.Description"></p>
            </div>

            <div class="modal-images">
              <img
                v-if="activeFeature.GraphicUrl"
                :src="activeFeature.GraphicUrl"
                :alt="activeFeature.Title"
              />
              <img
                v-if="activeFeature.ImgUrl1"
                :src="activeFeature.ImgUrl1"
                :alt="activeFeature.Title"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom text + button inline -->
      <div class="bottom-cta">
        <p>Get expired, don’t wait contact us right now</p>
        <button class="cta-btn" @click="showContact = true">
               CONTACT US
            </button>
      </div>
    </div>
  </section>
  <ContactModal v-model:isOpen="showContact" />
</template>



<style scoped>
.features-view {
  background: #1d1d1d;
  color: #fff;
  padding: 0 0 100px 0;
  
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 40px;
}

.screens-scroll {
  display: flex;
  gap: 25px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 40px;
}

.screen-card {
  flex: 0 0 22%; /* ~4.5 cards visible at once */
  position: relative;
  border-radius: 25px;
  overflow: hidden; /* important so overlay follows rounded corners */
  scroll-snap-align: start;
  cursor: pointer;
  transition: transform 0.3s ease;
  min-width: 250px;
}

.screen-card:hover {
  transform: translateY(-4px);
}

.screenshot {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 25px;
}

/* Overlay for description */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.759);
  color: #fff;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  transition: opacity 0.3s ease;
  border-radius: 45px; 
  pointer-events: none; 
}

.overlay h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.overlay p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #ccc;
}

.screen-card:hover .overlay {
  opacity: 1;
}

.bottom-cta {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
}

.bottom-cta p {
  font-size: 1.1rem;
  color: #ccc;
}

.cta-btn {
  padding: 10px 38px;
  border: 2px solid #ee1063;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  transition: 0.3s;
}

.cta-btn:hover {
  background: #ee1063;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-body {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  text-align: left;
  background: rgba(0, 0, 0, 0.515);
  padding: 30px;
  border-radius: 15px;
}

.modal-text {
  max-width: 50%;
}

.modal-heading{
  border-left: 4px solid #ee1063;
  padding-left: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: x-large;
}

.modal-subtitle{
  padding-left: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: large;
}

.modal-content {
  background: #1d1d1d;
  padding: 25px;
  border-radius: 20px;
  width: 90%;
  position: relative;
  text-align: center;
  overflow-y: auto;
  max-height: 80vh;
}

.close-btn {
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}

.modal-images {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  place-items: center;
}

.modal-images img {
  width: 270px;
  border-radius: 15px;
  padding: 5px;
}
/* Responsive */
@media (max-width: 1000px) {
  .screen-card {
    flex: 0 0 40%; /* show 2 on tablets */
  }

  .bottom-cta {
    flex-direction: column;
    gap: 18px;
  }
}

@media (max-width: 600px) {
  .screen-card {
    flex: 0 0 80%; /* show 1 on mobile */
  }
}
</style>