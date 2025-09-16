import { ref } from "vue";

export interface Characteristic {
  _id?: string; // MongoDB will handle unique IDs
  GraphicUrl: string;
  Title: string;
  ShortDescription: string;
  SecondTitle: string;
  Description: string;
  ImgUrl1: string;
}

const characteristics = ref<Characteristic[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useCharacteristics() {
  const getCharacteristics = async () => {
    loading.value = true;
    error.value = null;
    try {
      characteristics.value = await $fetch<Characteristic[]>(
        "/api/characteristics"
      );
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to fetch characteristics";
    } finally {
      loading.value = false;
    }
  };

  const createCharacteristic = async (data: Characteristic) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const res = await $fetch<Characteristic>("/api/characteristics", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      characteristics.value.push(res);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to create characteristic";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateCharacteristic = async (id: string, data: Characteristic) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const updated = await $fetch<Characteristic>(
        `/api/characteristics/${id}`,
        {
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const index = characteristics.value.findIndex((c) => c._id === id);
      if (index !== -1) characteristics.value[index] = updated;
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to update characteristic";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteCharacteristic = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      await $fetch(`/api/characteristics/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      characteristics.value = characteristics.value.filter((c) => c._id !== id);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to delete characteristic";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    characteristics,
    loading,
    error,
    getCharacteristics,
    createCharacteristic,
    updateCharacteristic,
    deleteCharacteristic,
  };
}
