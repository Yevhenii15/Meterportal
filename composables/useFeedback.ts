import { ref } from "vue";

export interface Feedback {
  _id?: string;
  name: string;
  email: string;
  role: "Consumer" | "Utility";
  rating: number;
  message: string;
  adminResponse?: {
    message: string;
    respondedAt: string;
  };
  createdAt?: string;
}

const feedbacks = ref<Feedback[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useFeedback() {
  const getFeedbacks = async () => {
    loading.value = true;
    error.value = null;
    try {
      feedbacks.value = await $fetch<Feedback[]>("/api/feedback");
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to fetch feedbacks";
    } finally {
      loading.value = false;
    }
  };

  const createFeedback = async (data: Feedback) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch<Feedback>("/api/feedback", {
        method: "POST",
        body: data,
      });
      feedbacks.value.push(res);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to submit feedback";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const respondFeedback = async (id: string, response: string) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const updated = await $fetch<Feedback>(`/api/feedback/${id}`, {
        method: "PATCH",
        body: { message: response },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const index = feedbacks.value.findIndex((f) => f._id === id);
      if (index !== -1) feedbacks.value[index] = updated;
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to respond feedback";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteFeedback = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      await $fetch(`/api/feedback/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      feedbacks.value = feedbacks.value.filter((f) => f._id !== id);
      return true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err?.data?.message || err.message || "Failed to delete feedback";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    feedbacks,
    loading,
    error,
    getFeedbacks,
    createFeedback,
    respondFeedback,
    deleteFeedback,
  };
}
