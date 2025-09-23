import { ref } from "vue";

export interface Statistic {
  _id?: string;
  ImgUrl: string;
  Ammount: string;
  Description: string;
}

const statistics = ref<Statistic[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useStatistics() {
  const getStatistics = async () => {
    loading.value = true;
    error.value = null;
    try {
      statistics.value = await $fetch<Statistic[]>("/api/statistics");
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to fetch statistics";
    } finally {
      loading.value = false;
    }
  };

  const createStatistic = async (data: Statistic) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const res = await $fetch<Statistic>("/api/statistics", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      statistics.value.push(res);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to create statistic";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateStatistic = async (id: string, data: Statistic) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const updated = await $fetch<Statistic>(`/api/statistics/${id}`, {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const index = statistics.value.findIndex((s) => s._id === id);
      if (index !== -1) statistics.value[index] = updated;
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to update statistic";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteStatistic = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      await $fetch(`/api/statistics/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      statistics.value = statistics.value.filter((s) => s._id !== id);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to delete statistic";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    statistics,
    loading,
    error,
    getStatistics,
    createStatistic,
    updateStatistic,
    deleteStatistic,
  };
}
