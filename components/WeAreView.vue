<template>
  <section class="weare">
    <div class="container">
      <!-- Section Header -->
      <h2 class="section-title">Måleportal – More Than Just an App</h2>

      <!-- Dark Content Box -->
      <div class="content-box">
        <p v-if="introInfo?.Description">{{ introInfo.Description }}</p>

        <!-- Optional fallback -->
        <p v-else>
          Måleportal is not only a smart app for consumers – it’s a complete platform that supports both households and utilities.
        </p>
      </div>

      <!-- Optional loading/error -->
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import { useIntroInfo } from "@/composables/useIntroInfo";

const { introInfo, getIntroInfo, loading, error } = useIntroInfo();

onMounted(() => {
  getIntroInfo();
});
</script>


<style scoped>
.weare {
  padding-top: 100px;
    padding-bottom: 100px;
  background: #1d1d1d; /* same as hero bg */
  color: #fff;
  
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 2.5rem;
}

.content-box {
  background: #0b0b0bd7; /* darker background for contrast */
  padding: 40px;
  border-radius: 20px;
  
  margin: 0 auto;
  line-height: 1.7;
  font-size: 1.1rem;
  color: #ddd;
}

.content-box p {
  margin-bottom: 1.5rem;
}

.content-box p:last-child {
  margin-bottom: 0;
}
</style>
