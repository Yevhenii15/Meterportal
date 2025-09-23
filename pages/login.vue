<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Admin Login</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input
            v-model="username"
            type="text"
            required
            placeholder="Enter username"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
          />
        </div>

        <button type="submit" :disabled="loading">
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const { login, error, loading, token } = useAuth();

const username = ref("");
const password = ref("");

const handleLogin = async () => {
  const success = await login(username.value, password.value);
  if (success) {
    navigateTo("/admin");
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1D1D1D;
  font-family: Arial, sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background-color: #262626;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  color: white;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form .form-group {
  margin-bottom: 1.5rem;
}

.login-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.login-form input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #1D1D1D;
  color: white;
  outline: none;
  transition: all 0.2s;
}

.login-form input::placeholder {
  color: #888;
}

.login-form input:focus {
  border-color: #F47E26;
  box-shadow: 0 0 0 2px rgba(244, 126, 38, 0.3);
}

.login-form button {
  width: 100%;
  padding: 0.75rem;
  background-color: #EE1063;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-form button:hover {
  background-color: #F0532D;
}

.login-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  color: #EE1063;
  font-size: 0.9rem;
  text-align: center;
}
</style>
