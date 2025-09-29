<template>
  <div class="admin-page">
    <div class="header">
      <h1>Admin Panel</h1>
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>

    <div class="grid">
      <router-link
        v-for="section in sections"
        :key="section.key"
        :to="section.link"
        class="card"
      >
        <span class="card-content">
          <span class="card-icon">{{ section.icon }}</span>
          {{ section.label }}
        </span>
      </router-link>
    </div>


  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const { logout, loadToken, token } = useAuth();
const router = useRouter();

loadToken();
if (!token.value) router.push("/login");

const handleLogout = () => {
  logout();
  router.push("/login");
};

const sections = [
  { key: "about", label: "About", icon: "📝", link: "/backend/about" },
  { key: "features", label: "Features", icon: "🌟", link: "/backend/characteristics" },
  { key: "characteristics", label: "Characteristics", icon: "⚙️", link: "/backend/features" },
  { key: "statistics", label: "Statistics", icon: "📊", link: "/backend/statistics" },
  { key: "feedback", label: "Feedback", icon: "💬", link: "/backend/feedback" },
  { key: "intro", label: "Intro Info", icon: "💡", link: "/backend/intro" },
];
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 2rem;
  background-color: #1D1D1D;
  color: white;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.logout-btn {
  background-color: #EE1063;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #F0532D;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  background-color: #262626;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background-color: #F0532D;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  font-size: 28px;
  color: #F47E26;
}
</style>
