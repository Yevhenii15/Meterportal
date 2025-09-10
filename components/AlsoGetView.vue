<template>
  <section class="features">
    <div class="container">
      <h2 class="section-title">You also get</h2>

      <!-- Horizontal scrollable features -->
      <div class="features-scroll">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <!-- Grey block inside black card -->
          <div class="feature-inner">
            <div class="icon">
              <img :src="feature.icon" :alt="feature.title" />
            </div>
            <h3>{{ feature.title }}</h3>
          </div>

          <!-- Description stays on black background -->
          <p class="desc">{{ feature.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const features = ref([
  {
    icon: "/img/analytics.png",
    title: "Technician app",
    text: "Easy support and contact with consumers via app, general information about meters, usage of energy etc.",
  },
  {
    icon: "/img/mobile-app.png",
    title: "Consumer App",
    text: "Clients will have the possibility to install MeterPortal app for convenient track of their consumption.",
  },
  {
    icon: "/img/bell.png",
    title: "Smart Notifications",
    text: "Get alerts for unusual energy usage, billing changes, or consumption goals.",
  },
  {
    icon: "/img/location.png",
    title: "Meters locations",
    text: "Get exact coordinates of meters installed inside the household areas, for easy future service.",
  },
  {
    icon: "/img/message.png",
    title: "Messaging Templates",
    text: "Useful templates for multiple times use for informing residents about latest news, repairs, changing meters etc.",
  },
]);
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
</style>

