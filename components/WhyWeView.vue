<template>
  <section class="why-we">
    <div class="container">
      <h2 class="section-title">Why work with us?</h2>

      <div class="why-we__image" v-if="about?.ImgUrl">
        <img :src="about.ImgUrl" alt="Why work with us infographic" />
      </div>

      <!-- Optional fallback if image not loaded yet -->
      <div class="why-we__image" v-else>
        <img src="../public/img/final.png" alt="Why work with us infographic" />
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import { useAbout } from "@/composables/useAbout";

const { about, getAbout, loading, error } = useAbout();

onMounted(() => {
  getAbout();
});
</script>


<style scoped>
.why-we {
  background: #1d1d1d;
  color: #fff;
  padding: 0 0 100px 0;
  text-align: start;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.why-we__image img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* --- Responsive Tweaks Only --- */
@media (max-width: 900px) {
  .section-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.6rem;
  }
}
</style>
