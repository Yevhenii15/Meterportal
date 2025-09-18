<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">About Section</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Description -->
      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="form.Description"
          rows="4"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Name of CDO -->
      <div>
        <label class="block text-sm font-medium">Name of CDO</label>
        <input
          v-model="form.NameOfCDO"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Position of CDO -->
      <div>
        <label class="block text-sm font-medium">Position of CDO</label>
        <input
          v-model="form.PositionOfCDO"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium">Why work with us? Image</label>
        <input type="file" accept="image/*" @change="handleFile" />

        <div v-if="uploading" class="text-blue-600 mt-2">Uploading...</div>

        <img
          v-if="form.ImgUrl"
          :src="form.ImgUrl"
          alt="Preview"
          class="mt-2 h-32 object-cover rounded border"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="loading"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>Save</span>
      </button>
    </form>

    <!-- Messages -->
    <p v-if="error" class="text-red-600 mt-3">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-3">Updated successfully!</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { useAbout } from "~/composables/useAbout";
import { useUpload } from "~/composables/useUpload";

const { about, getAbout, updateAbout, loading, error } = useAbout();
const { uploadImage } = useUpload();

const form = reactive({
  Description: "",
  NameOfCDO: "",
  PositionOfCDO: "",
  ImgUrl: "",
});

const success = ref(false);
const uploading = ref(false);

// Fetch current About info on mount
onMounted(async () => {
  await getAbout();
  if (about.value) Object.assign(form, about.value);
});

// Keep form in sync if DB data changes
watch(about, (val) => {
  if (val) Object.assign(form, val);
});

const handleFile = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  // Save current image URL to delete after upload
  const oldUrl = form.ImgUrl || undefined;

  // Show local preview immediately
  form.ImgUrl = URL.createObjectURL(file);

  uploading.value = true;
  const url = await uploadImage(file, oldUrl); // <-- pass oldUrl here
  uploading.value = false;

  if (url) form.ImgUrl = url; // replace preview with actual uploaded URL
};

// Submit updated data
const handleSubmit = async () => {
  success.value = false;
  const ok = await updateAbout(form);
  if (ok) success.value = true;
};
</script>
