<template>
  <section class="features">
    <div class="container">
      <h2 class="section-title">You also get</h2>

      <!-- Horizontal scrollable features -->
      <div class="features-scroll">
        <div
          class="feature-card"
          v-for="(feature, index) in features"
          :key="index"
          @click="openFeature(feature)"
        >
          <div class="feature-inner">
            <div class="icon">
              <img :src="feature.icon" :alt="feature.title" />
            </div>
            <h3>{{ feature.title }}</h3>
          </div>
          <p class="desc">{{ feature.text }}</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
<div v-if="activeFeature" class="modal-overlay" @click.self="closeFeature">
  <div class="modal-content">
    <button class="close-btn" @click="closeFeature">✕</button>

    <!-- Flex container for text + images -->
    <div class="modal-body">
      <div class="modal-text">
        <div class="modal-heading">
          <h2>{{ activeFeature.title }}</h2>
        </div> 
        <div class="modal-subtitle"> 
          <h3>{{ activeFeature.subtitle }}</h3>
        </div>
        <p v-html="activeFeature.description"></p>
      </div>

      <div class="modal-images">
        <img
          v-for="(img, i) in activeFeature.images"
          :key="i"
          :src="img"
          :alt="activeFeature.title"
        />
      </div>
    </div>
  </div>
</div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { additionFeaturesData } from "@/data/additionFeatures.js"; // create this file for full details

const features = ref([
  {
    icon: "/img/analytics.png",
    title: "Technician app",
    text: "Easy support and contact with consumers via app, general information about meters, usage of energy etc.",
    slug: "technician-app",
  },
  {
    icon: "/img/mobile-app.png",
    title: "Consumer App",
    text: "Clients will have the possibility to install MeterPortal app for convenient track of their consumption.",
    slug: "consumer-app",
  },
  {
    icon: "/img/bell.png",
    title: "Smart Notifications",
    text: "Get alerts for unusual energy usage, billing changes, or consumption goals.",
    slug: "smart-notifications",
  },
  {
    icon: "/img/location.png",
    title: "Meters locations",
    text: "Get exact coordinates of meters installed inside the household areas, for easy future service.",
    slug: "meters-locations",
  },
  {
    icon: "/img/message.png",
    title: "Messaging Templates",
    text: "Useful templates for multiple times use for informing residents about latest news, repairs, changing meters etc.",
    slug: "messaging-templates",
  },
]);

const activeFeature = ref(null);

const openFeature = (feature) => {
  // Get detailed info from additionFeaturesData by slug
  const fullFeature = additionFeaturesData.find((f) => f.slug === feature.slug);
  if (fullFeature) activeFeature.value = fullFeature;
};

const closeFeature = () => {
  activeFeature.value = null;
};
</script>

<style scoped>
.features {
  background: #1d1d1d; 
  color: #fff;
  padding: 0 0 100px 0;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 40px;
}

.features-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px;
}

.feature-card {
  flex: 0 0 30%;
  background: #111; 
  border-radius: 25px;
  padding: 20px;
  scroll-snap-align: start;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px); 
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.4);
}

.feature-inner {
  background: #2a2a2a; 
  border-radius: 20px;
  padding: 40px 20px;
  width: 100%;
  height: 220px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  transition: background 0.3s ease;
}

.feature-card:hover .feature-inner {
  background: #333; 
}

.icon img {
  height: 120px;
  width: auto;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  filter: brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(4119%) hue-rotate(2deg) brightness(97%) contrast(105%);
}

.feature-card:hover .icon img {
  transform: scale(1.1); 
}

.feature-inner h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-inner h3 {
  color: #F0532D; 
}

.desc {
  margin-top: 14px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #bbb;
  text-align: center;
  padding: 0 10px;
  transition: color 0.3s ease;
}

.feature-card:hover .desc {
  color: #fff; 
}

/* Responsive */
@media (max-width: 1000px) {
  .feature-card {
    flex: 0 0 45%;
  }
}

@media (max-width: 600px) {
  .feature-card {
    flex: 0 0 90%;
  }
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


.modal-images {
  display: flex;
  gap: 10px;
}

.modal-images img {
  width: 800px;
  border-radius: 15px;
  padding: 5px;
}
</style>


