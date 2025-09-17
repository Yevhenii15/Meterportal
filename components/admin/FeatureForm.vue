<template>
  <div class="max-w-5xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-bold mb-4">Features Management</h1>

    <!-- Toast -->
    <div
      v-if="message"
      class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut"
    >
      {{ message }}
    </div>

    <!-- Existing Features -->
    <div
      v-for="(feature, index) in features"
      :key="feature._id"
      class="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 class="text-xl font-semibold mb-2">Edit Feature #{{ index + 1 }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="feature.Title"
          placeholder="Title"
          class="border p-2 rounded"
        />
        <input
          v-model="feature.SecondTitle"
          placeholder="Second Title"
          class="border p-2 rounded"
        />

        <textarea
          v-model="feature.ShortDescription"
          rows="2"
          placeholder="Short Description"
          class="border p-2 rounded"
        ></textarea>
        <textarea
          v-model="feature.Description"
          rows="3"
          placeholder="Description"
          class="border p-2 rounded"
        ></textarea>

        <!-- Main Image -->
        <div>
          <label class="block text-sm font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            @change="(e) => handleMainImg(e, feature)"
          />
          <div v-if="uploadingMain[feature._id!]" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="feature.MainImgUrl"
            :src="feature.MainImgUrl"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>

        <!-- Extra Images -->
        <div>
          <label class="block text-sm font-medium">Image 1</label>
          <input
            type="file"
            accept="image/*"
            @change="(e) => handleImg1(e, feature)"
          />
          <div v-if="uploadingImg1[feature._id!]" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="feature.ImgUrl1"
            :src="feature.ImgUrl1"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>

        <div class="flex gap-2">
          <button
            @click="updateFeat(feature)"
            class="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
            :disabled="loading"
          >
            Update
          </button>
          <button
            @click="deleteFeat(feature)"
            class="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
            :disabled="loading"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <!-- ✅ Close v-for loop here -->

    <!-- New Feature Form -->
    <div class="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 class="text-2xl font-bold">Add New Feature</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newFeat.Title"
          placeholder="Title"
          class="border p-2 rounded"
        />
        <input
          v-model="newFeat.SecondTitle"
          placeholder="Second Title"
          class="border p-2 rounded"
        />
        <textarea
          v-model="newFeat.ShortDescription"
          rows="2"
          placeholder="Short Description"
          class="border p-2 rounded"
        ></textarea>
        <textarea
          v-model="newFeat.Description"
          rows="3"
          placeholder="Description"
          class="border p-2 rounded"
        ></textarea>

        <!-- New Uploads -->
        <div>
          <label class="block text-sm font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            @change="handleNewMain"
            ref="newMainInput"
          />
          <div v-if="uploadingNewMain" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="newFeat.MainImgUrl"
            :src="newFeat.MainImgUrl"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Image 1</label>
          <input
            type="file"
            accept="image/*"
            @change="handleNewImg1"
            ref="newImg1Input"
          />
          <div v-if="uploadingNewImg1" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="newFeat.ImgUrl1"
            :src="newFeat.ImgUrl1"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>
      </div>

      <button
        @click="createFeat"
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        :disabled="loading"
      >
        Add Feature
      </button>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useFeatures, type Feature } from "~/composables/useFeatures";
import { useUpload } from "~/composables/useUpload";

const {
  features,
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  loading,
  error,
} = useFeatures();
const { uploadImage } = useUpload();

const newMainInput = ref<HTMLInputElement | null>(null);
const newImg1Input = ref<HTMLInputElement | null>(null);

const uploadingMain = reactive<Record<string, boolean>>({});
const uploadingImg1 = reactive<Record<string, boolean>>({});

const uploadingNewMain = ref(false);
const uploadingNewImg1 = ref(false);

const message = ref<string | null>(null);
const showMessage = (text: string) => {
  message.value = text;
  setTimeout(() => (message.value = null), 3000);
};

// Fetch
onMounted(async () => {
  await getFeatures();
  features.value.forEach((f) => {
    if (f._id) {
      uploadingMain[f._id] = false;
      uploadingImg1[f._id] = false;
    }
  });
});

// Existing Upload Handlers
const handleMainImg = async (e: Event, feat: Feature) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !feat._id) return;
  uploadingMain[feat._id] = true;
  const url = await uploadImage(file, feat.MainImgUrl);
  uploadingMain[feat._id] = false;
  if (url) feat.MainImgUrl = url;
};

const handleImg1 = async (e: Event, feat: Feature) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !feat._id) return;
  uploadingImg1[feat._id] = true;
  const url = await uploadImage(file, feat.ImgUrl1);
  uploadingImg1[feat._id] = false;
  if (url) feat.ImgUrl1 = url;
};

// CRUD
const updateFeat = async (feat: Feature) => {
  if (!feat._id) return;
  if (!feat.Title || !feat.ShortDescription || !feat.MainImgUrl) {
    alert("Title, Short Description, and Main Image are required");
    return;
  }
  const ok = await updateFeature(feat._id, feat);
  if (ok) {
    await getFeatures();
    showMessage("Feature updated successfully!");
  }
};

const deleteFeat = async (feat: Feature) => {
  if (!feat._id) return;
  if (!confirm("Are you sure you want to delete this feature?")) return;
  try {
    const formData = new FormData();
    if (feat.MainImgUrl) formData.append("oldUrl", feat.MainImgUrl);
    if (feat.ImgUrl1) formData.append("oldUrl", feat.ImgUrl1);
    await fetch("/api/upload", { method: "POST", body: formData });
    const ok = await deleteFeature(feat._id);
    if (ok) {
      await getFeatures();
      showMessage("Feature deleted successfully!");
    }
  } catch (err) {
    console.error("Failed to delete feature images", err);
  }
};

// New Feature
const newFeat = reactive<Feature>({
  Title: "",
  ShortDescription: "",
  MainImgUrl: "",
  SecondTitle: "",
  Description: "",
  ImgUrl1: "",
});

const handleNewMain = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadingNewMain.value = true;
  const url = await uploadImage(file);
  uploadingNewMain.value = false;
  if (url) newFeat.MainImgUrl = url;
};

const handleNewImg1 = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadingNewImg1.value = true;
  const url = await uploadImage(file);
  uploadingNewImg1.value = false;
  if (url) newFeat.ImgUrl1 = url;
};

const createFeat = async () => {
  if (!newFeat.Title || !newFeat.ShortDescription || !newFeat.MainImgUrl) {
    alert("Title, Short Description, and Main Image are required");
    return;
  }
  const payload: Feature = { ...newFeat };
  const ok = await createFeature(payload);
  if (ok) {
    Object.assign(newFeat, {
      Title: "",
      ShortDescription: "",
      MainImgUrl: "",
      SecondTitle: "",
      Description: "",
      ImgUrl1: "",
    });
    if (newMainInput.value) newMainInput.value.value = "";
    if (newImg1Input.value) newImg1Input.value.value = "";
    await getFeatures();
    showMessage("Feature created successfully!");
  }
};
</script>
