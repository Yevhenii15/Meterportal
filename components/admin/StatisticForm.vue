<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-bold mb-4">Statistics Management</h1>

    <!-- Toast Notification -->
    <div
      v-if="message"
      class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut"
    >
      {{ message }}
    </div>

    <!-- Existing Statistics -->
    <div
      v-for="(stat, index) in statistics"
      :key="stat._id"
      class="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 class="text-xl font-semibold mb-2">
        Edit Statistic #{{ index + 1 }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="stat.Description"
          placeholder="Description"
          class="border p-2 rounded"
        />
        <input
          v-model="stat.Ammount"
          type="text"
          placeholder="Ammount"
          class="border p-2 rounded"
        />

        <div>
          <label class="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            @change="(e) => handleImg(e, stat)"
          />
          <div v-if="uploadingImg[stat._id!]" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="stat.ImgUrl"
            :src="stat.ImgUrl"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>
      </div>

      <div class="flex gap-2">
        <button
          @click="updateStat(stat)"
          class="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
          :disabled="loading"
        >
          Update
        </button>
        <button
          @click="deleteStat(stat)"
          class="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
          :disabled="loading"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- New Statistic Form -->
    <div class="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 class="text-2xl font-bold">Add New Statistic</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newStat.Description"
          placeholder="Description"
          class="border p-2 rounded"
        />
        <input
          v-model.number="newStat.Ammount"
          type="number"
          placeholder="Ammount"
          class="border p-2 rounded"
        />

        <div>
          <label class="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            @change="handleNewImg"
            ref="newImgInput"
          />
          <div v-if="uploadingNewImg" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="newStat.ImgUrl"
            :src="newStat.ImgUrl"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>
      </div>

      <button
        @click="createStat"
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        :disabled="loading"
      >
        Add Statistic
      </button>
    </div>

    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useStatistics, type Statistic } from "~/composables/useStatistics";
import { useUpload } from "~/composables/useUpload";

const {
  statistics,
  getStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
  loading,
  error,
} = useStatistics();
const { uploadImage } = useUpload();

const newImgInput = ref<HTMLInputElement | null>(null);
const uploadingImg = reactive<Record<string, boolean>>({});
const message = ref<string | null>(null);

const showMessage = (text: string) => {
  message.value = text;
  setTimeout(() => (message.value = null), 3000);
};

onMounted(async () => {
  await getStatistics();
  statistics.value.forEach((s) => {
    if (s._id) uploadingImg[s._id] = false;
  });
});

// Handle existing image upload
const handleImg = async (e: Event, stat: Statistic) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !stat._id) return;

  uploadingImg[stat._id] = true;
  const url = await uploadImage(file, stat.ImgUrl);
  uploadingImg[stat._id] = false;

  if (url) stat.ImgUrl = url;
};

// Update statistic
const updateStat = async (stat: Statistic) => {
  if (!stat._id || !stat.Description || !stat.ImgUrl) {
    alert("Description and Image are required");
    return;
  }
  const ok = await updateStatistic(stat._id, stat);
  if (ok) {
    await getStatistics();
    showMessage("Statistic updated successfully!");
  }
};

// Delete statistic
const deleteStat = async (stat: Statistic) => {
  if (!stat._id) return;
  if (!confirm("Are you sure you want to delete this statistic?")) return;

  try {
    if (stat.ImgUrl) {
      const formData = new FormData();
      formData.append("oldUrl", stat.ImgUrl);
      await fetch("/api/upload", { method: "POST", body: formData });
    }

    const ok = await deleteStatistic(stat._id);
    if (ok) {
      await getStatistics();
      showMessage("Statistic deleted successfully!");
    }
  } catch (err) {
    console.error("Failed to delete statistic image", err);
  }
};

// New statistic
const newStat = reactive<Statistic>({
  ImgUrl: "",
  Description: "",
  Ammount: "",
});
const uploadingNewImg = ref(false);

const handleNewImg = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadingNewImg.value = true;
  const url = await uploadImage(file);
  uploadingNewImg.value = false;

  if (url) newStat.ImgUrl = url;
};

const createStat = async () => {
  if (!newStat.Description || !newStat.ImgUrl) {
    alert("Description and Image are required");
    return;
  }

  const payload: Statistic = { ...newStat };
  const ok = await createStatistic(payload);
  if (ok) {
    Object.assign(newStat, { ImgUrl: "", Description: "", Ammount: "" });
    if (newImgInput.value) newImgInput.value.value = "";
    await getStatistics();
    showMessage("Statistic created successfully!");
  }
};
</script>
