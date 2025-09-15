// composables/useAbout.ts
import { ref } from "vue";

export interface About {
  Description: string;
  NameOfCDO: string;
  PositionOfCDO: string;
  ImgUrl: string;
}

const about = ref<About | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAbout() {
  const getAbout = async () => {
    loading.value = true;
    error.value = null;

    try {
      about.value = await $fetch<About>("/api/about");
    } catch (err: any) {
      error.value = err?.statusMessage || "Failed to fetch about info";
    } finally {
      loading.value = false;
    }
  };

  const updateAbout = async (data: About) => {
    loading.value = true;
    error.value = null;

    try {
      about.value = await $fetch<About>("/api/about", {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return true;
    } catch (err: any) {
      error.value = err?.statusMessage || "Failed to update about info";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    about,
    loading,
    error,
    getAbout,
    updateAbout,
  };
}
