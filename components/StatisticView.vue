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
  padding: 100px 0;
  background: #1d1d1d;
  color: #fff;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 3rem;
  line-height: 1.3;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #f0532d, #91063a);
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

/* --- Responsive Tweaks --- */
@media (max-width: 1024px) {
  .section-title {
    font-size: 2.2rem;
  }

  .stat-card {
    padding: 40px 20px;
    min-height: 230px;
  }

  .icon img {
    width: 90px;
    height: 90px;
  }

  .stat-card h3 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .statistics {
    padding-top: 70px;
    padding-bottom: 70px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .section-title {
    font-size: 1.9rem;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .stat-card {
    padding: 30px 20px;
    border-radius: 15px;
  }

  .icon img {
    width: 75px;
    height: 75px;
  }

  .stat-card h3 {
    font-size: 1.7rem;
  }
}

@media (max-width: 480px) {
  .statistics {
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .stat-card {
    padding: 25px 15px;
    min-height: 200px;
  }

  .icon img {
    width: 65px;
    height: 65px;
  }

  .stat-card h3 {
    font-size: 1.5rem;
  }

  .stat-card p {
    font-size: 0.95rem;
  }
}
</style>
