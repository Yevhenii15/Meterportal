<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">Intro Section</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium">Title</label>
        <input
          v-model="form.Title"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Slogan -->
      <div>
        <label class="block text-sm font-medium">Slogan</label>
        <input
          v-model="form.Slogan"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="form.Description"
          rows="4"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Main Image -->
      <div>
        <label class="block text-sm font-medium">Main Image</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFile('MainImgUrl', $event)"
        />
        <div v-if="uploading" class="text-blue-600 mt-2">Uploading...</div>
        <img
          v-if="form.MainImgUrl"
          :src="form.MainImgUrl"
          alt="Preview"
          class="mt-2 h-32 object-cover rounded border"
        />
      </div>

      <!-- Logo Image -->
      <div>
        <label class="block text-sm font-medium">Logo</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFile('LogoUrl', $event)"
        />
        <img
          v-if="form.LogoUrl"
          :src="form.LogoUrl"
          alt="Logo Preview"
          class="mt-2 h-16 object-contain rounded border"
        />
      </div>

      <!-- Links -->
      <div>
        <label class="block text-sm font-medium">Utility Link</label>
        <input
          v-model="form.UtilityLink"
          type="text"
          class="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Consumer Link</label>
        <input
          v-model="form.ConsumerLink"
          type="text"
          class="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Download App Store</label>
        <input
          v-model="form.DownloadAppStore"
          type="text"
          class="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Download Google Play</label>
        <input
          v-model="form.DownloadGooglePlay"
          type="text"
          class="w-full border p-2 rounded"
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
import { useIntroInfo } from "~/composables/useIntroInfo";
import { useUpload } from "~/composables/useUpload";

const { introInfo, getIntroInfo, updateIntroInfo, loading, error } =
  useIntroInfo();
const { uploadImage } = useUpload();

const form = reactive({
  Title: "",
  Slogan: "",
  Description: "",
  MainImgUrl: "",
  LogoUrl: "",
  UtilityLink: "",
  ConsumerLink: "",
  DownloadAppStore: "",
  DownloadGooglePlay: "",
});

const success = ref(false);
const uploading = ref(false);

// Fetch current IntroInfo on mount
onMounted(async () => {
  await getIntroInfo();
  if (introInfo.value) Object.assign(form, introInfo.value);
});

// Keep form in sync if DB data changes
watch(introInfo, (val) => {
  if (val) Object.assign(form, val);
});

// Handle file uploads
const handleFile = async (field: "MainImgUrl" | "LogoUrl", event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const oldUrl = form[field] || undefined;
  form[field] = URL.createObjectURL(file);

  uploading.value = true;
  const url = await uploadImage(file, oldUrl);
  uploading.value = false;

  if (url) form[field] = url;
};

// Submit updated data
const handleSubmit = async () => {
  success.value = false;
  const ok = await updateIntroInfo(form);
  if (ok) success.value = true;
};
</script>
