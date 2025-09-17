import { ref } from "vue";

export interface Feature {
  _id?: string;
  Title: string;
  ShortDescription: string;
  MainImgUrl: string;
  SecondTitle: string;
  Description: string;
  ImgUrl1: string;
}

const features = ref<Feature[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useFeatures() {
  const getFeatures = async () => {
    loading.value = true;
    error.value = null;
    try {
      features.value = await $fetch<Feature[]>("/api/features");
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to fetch features";
    } finally {
      loading.value = false;
    }
  };

  const createFeature = async (data: Feature) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const res = await $fetch<Feature>("/api/features", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      features.value.push(res);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to create feature";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateFeature = async (id: string, data: Feature) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const updated = await $fetch<Feature>(`/api/features/${id}`, {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const index = features.value.findIndex((f) => f._id === id);
      if (index !== -1) features.value[index] = updated;
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to update feature";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteFeature = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      await $fetch(`/api/features/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      features.value = features.value.filter((f) => f._id !== id);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to delete feature";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    features,
    loading,
    error,
    getFeatures,
    createFeature,
    updateFeature,
    deleteFeature,
  };
}
