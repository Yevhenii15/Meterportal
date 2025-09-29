<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFeedback, type Feedback } from "@/composables/useFeedback";

const {
  feedbacks,
  getFeedbacks,
  respondFeedback,
  deleteFeedback,
  loading,
  error,
} = useFeedback();

// Admin response form state (map by feedback _id)
const adminResponses = ref<Record<string, string>>({});

const submitResponse = async (id: string) => {
  const message = adminResponses.value[id];
  if (!message) {
    alert("Response cannot be empty.");
    return;
  }
  const success = await respondFeedback(id, message);
  if (success) {
    alert("Response saved!");
    adminResponses.value[id] = ""; // clear input
  } else {
    alert("Failed to save response.");
  }
};

const removeFeedback = async (id: string) => {
  if (!confirm("Are you sure you want to delete this feedback?")) return;
  const success = await deleteFeedback(id);
  if (success) alert("Feedback deleted.");
};

onMounted(() => {
  getFeedbacks();
});
</script>

<template>
  <section class="admin-feedback">
    <div class="feedback-container">
    <div v-if="loading">Loading feedbacks...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-else class="feedback-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Rating</th>
          <th>Message</th>
          <th>Admin Response</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fb in feedbacks" :key="fb._id">
          <td>{{ fb.name }}</td>
          <td>{{ fb.email || "-" }}</td>
          <td>{{ fb.role }}</td>
          <td>{{ fb.rating }}★</td>
          <td>{{ fb.message }}</td>
          <td>
            <div v-if="fb.adminResponse?.message">
              {{ fb.adminResponse.message }}
            </div>
            <div v-else class="response-form">
              <input
                v-model="adminResponses[fb._id!]"
                type="text"
                placeholder="Write a response..."
              />
              <button @click="submitResponse(fb._id!)">Reply</button>
            </div>
          </td>
          <td>
            <button class="delete-btn" @click="removeFeedback(fb._id!)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </section>
</template>

<style scoped>
.admin-feedback {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
}


.feedback-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feedback-table th,
.feedback-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.feedback-table th {
  background: #f0532d;
  color: #fff;
}

.response-form {
  display: flex;
  gap: 8px;
}

.response-form input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.response-form button {
  padding: 6px 10px;
  background: #f0532d;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.response-form button:hover {
  background: #d84220;
}

.delete-btn {
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.delete-btn:hover {
  background: #c62828;
}
</style>

