// composables/useAuth.ts
import { ref } from "vue";

const token = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  const login = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{ token: string }>("/api/login", {
        method: "POST",
        body: { username, password },
      });

      token.value = response.token;
      // Store token in localStorage so it persists
      localStorage.setItem("auth_token", response.token);

      return true;
    } catch (err: any) {
      error.value = err?.statusMessage || "Login failed";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem("auth_token");
  };

  const loadToken = () => {
    const saved = localStorage.getItem("auth_token");
    if (saved) token.value = saved;
  };

  return {
    token,
    loading,
    error,
    login,
    logout,
    loadToken,
  };
}
