<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Admin Panel</h1>
      <button
        @click="handleLogout"
        class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>

    <AboutForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import AboutForm from "~/components/admin/AboutForm.vue";
import { useAuth } from "~/composables/useAuth";

const { token, loadToken, logout } = useAuth();
const router = useRouter();

// Load token from localStorage on mount
onMounted(() => {
  loadToken();

  // Redirect to login if no token
  if (!token.value) {
    router.push("/login");
  }
});

// Logout function
const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>
