<script setup lang="ts">
import { onMounted } from "vue";
import { useAbout } from "@/composables/useAbout";
import ContactModal from "./ContactModal.vue";

const { about, getAbout, loading, error } = useAbout();
const showContact = ref(false);

onMounted(() => {
  getAbout();
});
</script>

<template>
  <section id="about-us" class="who-are-we">
    <div class="container who-are-we__grid">
      <!-- Left Column: Text -->
      <div class="who-are-we__content">
        <h2 class="section-title">Who are we?</h2>
        <p v-if="about">{{ about.Description }}</p>
        <p v-else>Loading description...</p>
      </div>

      <!-- Right Column: Person + CTA -->
      <div class="who-are-we__profile" v-if="about">
        <h3 class="profile-name">{{ about.NameOfCDO }}</h3>
        <p class="profile-role">{{ about.PositionOfCDO }}</p>
        <button class="cta-button" @click="showContact = true">CALL US NOW</button>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </section>
  <ContactModal v-model:isOpen="showContact" />
</template>

<style scoped>
.who-are-we {
  background: #1d1d1d;
  color: #fff;
  padding: 100px 0;
}

.who-are-we__grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 40px;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.who-are-we__content p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #e0e0e0;
}

/* Profile column */
.who-are-we__profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.profile-name {
  font-size: 3.3rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.profile-role {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 35px;
  color: #d0d0d0;
}

.cta-button {
  padding: 16px 45px;
  border: 2px solid #e91e63;
  border-radius: 50px;
  background: transparent;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #e91e63;
  color: #fff;
}

/* Loading and error messages */
.error {
  margin-top: 20px;
  color: #ff6b6b;
  text-align: center;
  font-weight: 500;
}

/* --- Responsive Tweaks Only --- */
@media (max-width: 900px) {
  .who-are-we__grid {
    grid-template-columns: 1fr;
    text-align: center;
    
  }

  .who-are-we__profile {
    margin-top: 40px;
  }
}

@media (max-width: 480px) {
  .profile-name {
    font-size: 2.5rem;
  }

  .profile-role {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 14px 35px;
    font-size: 1rem;
  }
}
</style>

