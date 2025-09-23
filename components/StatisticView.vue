<template>
  <section class="statistics">
    <div class="container">
      <!-- Section Header -->
      <h2 class="section-title">Our clients trust us</h2>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <!-- Render each statistic dynamically -->
        <div class="stat-card" v-for="stat in statistics" :key="stat._id">
          <div class="icon">
            <img :src="stat.ImgUrl" :alt="stat.Description" />
          </div>
          <h3>{{ stat.Ammount }}</h3>
          <p>{{ stat.Description }}</p>
        </div>
      </div>

      <!-- Optional loading/error messages -->
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import { useStatistics } from "@/composables/useStatistics";

const { statistics, getStatistics, loading, error } = useStatistics();

onMounted(() => {
  getStatistics();
});
</script>


<style scoped>
.statistics {
  padding: 0 0 100px 0;
  background: #1d1d1d;
  color: #fff;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #F0532D, #91063A);
  border-radius: 20px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  min-height: 260px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-6px);
  background: linear-gradient(135deg, #c1411e, #70032b); /* darker hover */
}

.icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.icon img {
  width: 110px;
  height: 110px;
  object-fit: contain;
}

.stat-card h3 {
  font-size: 2.2rem;   
  font-weight: 900;   
  margin-bottom: 10px;
  color: #fff;         
}

.stat-card p {
  font-size: 1rem;
  font-weight: 400;
  color: #fff;         
}
</style>
