<template>
  <section class="features">
    <div class="container">
      <h2 class="section-title">You also get</h2>

      <!-- Horizontal scrollable features -->
      <div class="features-scroll">
        <div
          class="feature-card"
          v-for="feature in features"
          :key="feature._id"
          @click="openFeature(feature)"
        >
          <div class="feature-inner">
            <div class="icon">
              <img :src="feature.MainImgUrl" :alt="feature.Title" />
            </div>
            <h3>{{ feature.Title }}</h3>
          </div>
          <p class="desc">{{ feature.ShortDescription }}</p>
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
              v-if="activeFeature.ImgUrl1"
              :src="activeFeature.ImgUrl1"
              :alt="activeFeature.Title"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFeatures } from "@/composables/useFeatures";

const { features, getFeatures } = useFeatures();
const activeFeature = ref<any | null>(null);

onMounted(() => {
  getFeatures();
});

const openFeature = (feature: any) => {
  activeFeature.value = feature;
};

const closeFeature = () => {
  activeFeature.value = null;
};
</script>

<style scoped>
.features {
  background: #1d1d1d;
  color: #fff;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 40px;
  line-height: 1.3;
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
  filter: brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(4119%)
    hue-rotate(2deg) brightness(97%) contrast(105%);
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
  color: #f0532d;
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

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  padding: 20px;
}

.modal-content {
  background: #1d1d1d;
  padding: 25px;
  border-radius: 20px;
  width: 90%;
  position: relative;
  text-align: center;
  overflow-y: auto;
  max-height: 75vh;
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

.modal-heading {
  border-left: 4px solid #ee1063;
  padding-left: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: x-large;
}

.modal-subtitle {
  margin-bottom: 10px;
  font-weight: 500;
  font-size: large;
}

.modal-images {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.modal-images img {
  width: 100%;
  max-width: 700px;
  border-radius: 15px;
  padding: 5px;
}

/* --- Responsive Tweaks --- */
@media (max-width: 1000px) {
  .feature-card {
    flex: 0 0 45%;
  }

  .modal-body {
    flex-direction: column;
    align-items: center;
  }

  .modal-text {
    max-width: 100%;
  }
  .modal-text p {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .features {
    padding-top: 70px;
    padding-bottom: 70px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .section-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }

  .feature-card {
    flex: 0 0 70%;
  }

  .modal-content {
    padding: 20px;
  }

  .modal-heading {
    font-size: 1.3rem;
  }

  .modal-subtitle {
    font-size: 1rem;
  }
  .modal-text p {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .features {
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .feature-card {
    flex: 0 0 90%;
  }

  .modal-images img {
    max-width: 100%;
  }
  .modal-text p {
    font-size: 0.7rem;
  }
}
</style>
