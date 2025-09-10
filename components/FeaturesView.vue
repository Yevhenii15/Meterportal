<template>
  <section id="features" class="features-view">
    <div class="container">
      <h2 class="section-title">Features you get by choosing us</h2>

      <!-- Horizontal scrollable screenshots -->
      <div class="screens-scroll">
        <div
          class="screen-card"
          v-for="(feature, index) in features"
          :key="index"
        >
          <img :src="feature.image" :alt="feature.title" class="screenshot" />

          <!-- Overlay with description -->
          <div class="overlay">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </div>
        </div>
      </div>

      <!-- Bottom text + button inline -->
      <div class="bottom-cta">
        <p>Get expired, don’t wait contact us right now</p>
        <button class="cta-btn">CONTACT US</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const features = ref([
  {
    image: "/img/Alarm.png",
    title: "Alarms & Alerts",
    text: "Here user can choose, which alarms they want to get and where they want to get them.",
  },
  {
    image: "/img/fixed_network.png",
    title: "Fixed Network",
    text: "When meter data is collected daily via a fixed network or IoT, consumers can monitor their consumption down to hourly intervals.",
  },
  {
    image: "/img/drive_by.png",
    title: "Drive-by Readings",
    text: "When meter data is collected via drive-by, the intervals between readings are significantly longer. Therefore, we show a daily average based on consumption between the latest and previous reading.",
  },
  {
    image: "/img/multiple_adresses.png",
    title: "Multi-address Support",
    text: "Easily manage multiple households and meter addresses within one account.",
  },
  {
    image: "/img/notificat.png",
    title: "Notifications",
    text: "Stay updated with critical alerts like leaks, abnormal consumption, and billing changes.",
  },
  {
    image: "/img/invoices.png",
    title: "Invoices",
    text: "View, download, and keep track of invoices directly inside the app.",
  },
]);
</script>

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
