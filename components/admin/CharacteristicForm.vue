<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-bold mb-4">Features Management</h1>
    <!-- Toast Notification -->
    <div
      v-if="message"
      class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut"
    >
      {{ message }}
    </div>

    <!-- Existing Characteristics -->
    <div
      v-for="(char, index) in characteristics"
      :key="char._id"
      class="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 class="text-xl font-semibold mb-2">
        Edit Feature #{{ index + 1 }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="char.Title"
          placeholder="Title"
          class="border p-2 rounded"
        />
        <input
          v-model="char.SecondTitle"
          placeholder="Second Title"
          class="border p-2 rounded"
        />
        <textarea
          v-model="char.ShortDescription"
          rows="2"
          placeholder="Short Description"
          class="border p-2 rounded"
        ></textarea>
        <textarea
          v-model="char.Description"
          rows="3"
          placeholder="Description"
          class="border p-2 rounded"
        ></textarea>

        <!-- Graphic Upload -->
        <div>
          <label class="block text-sm font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            @change="(e) => handleGraphic(e, char)"
          />
          <div v-if="uploadingGraphic[char._id!]" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="char.GraphicUrl"
            :src="char.GraphicUrl"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-medium">Image 1</label>
          <input
            type="file"
            accept="image/*"
            @change="(e) => handleImg(e, char)"
          />
          <div v-if="uploadingImg[char._id!]" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="char.ImgUrl1"
            :src="char.ImgUrl1"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>
      </div>

      <div class="flex gap-2">
        <button
          @click="updateChar(char)"
          class="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
          :disabled="loading"
        >
          Update
        </button>
        <button
          @click="deleteChar(char)"
          class="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
          :disabled="loading"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- New Feture Form -->
    <div class="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 class="text-2xl font-bold">Add New Feature</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newChar.Title"
          placeholder="Title"
          class="border p-2 rounded"
        />
        <input
          v-model="newChar.SecondTitle"
          placeholder="Second Title"
          class="border p-2 rounded"
        />
        <textarea
          v-model="newChar.ShortDescription"
          rows="2"
          placeholder="Short Description"
          class="border p-2 rounded"
        ></textarea>
        <textarea
          v-model="newChar.Description"
          rows="3"
          placeholder="Description"
          class="border p-2 rounded"
        ></textarea>

        <div>
          <label class="block text-sm font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            @change="handleNewGraphic"
            ref="newGraphicInput"
          />
          <div v-if="uploadingNewGraphic" class="text-blue-600 mt-1">
            Uploading...
          </div>
          <img
            v-if="newChar.GraphicUrl"
            :src="newChar.GraphicUrl"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Image 1</label>
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
            v-if="newChar.ImgUrl1"
            :src="newChar.ImgUrl1"
            class="mt-1 h-24 object-cover rounded border"
          />
        </div>
      </div>

      <button
        @click="createChar"
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        :disabled="loading"
      >
        Add Feature
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {
  useCharacteristics,
  type Characteristic,
} from "~/composables/useCharacteristics";
import { useUpload } from "~/composables/useUpload";

const {
  characteristics,
  getCharacteristics,
  createCharacteristic,
  updateCharacteristic,
  deleteCharacteristic,
  loading,
  error,
} = useCharacteristics();
const { uploadImage } = useUpload();

const newGraphicInput = ref<HTMLInputElement | null>(null);
const newImgInput = ref<HTMLInputElement | null>(null);
// Upload flags
const uploadingGraphic = reactive<Record<string, boolean>>({});
const uploadingImg = reactive<Record<string, boolean>>({});

// Notification message
const message = ref<string | null>(null);

// Show toast notification
const showMessage = (text: string) => {
  message.value = text;
  setTimeout(() => {
    message.value = null;
  }, 3000); // auto-hide after 3 seconds
};
// Fetch characteristics
onMounted(async () => {
  await getCharacteristics();
  characteristics.value.forEach((c) => {
    if (c._id) {
      uploadingGraphic[c._id] = false;
      uploadingImg[c._id] = false;
    }
  });
});

// Handle existing uploads
const handleGraphic = async (e: Event, char: Characteristic) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !char._id) return;

  uploadingGraphic[char._id] = true;
  const url = await uploadImage(file, char.GraphicUrl); // delete old image
  uploadingGraphic[char._id] = false;

  if (url) char.GraphicUrl = url;
};

const handleImg = async (e: Event, char: Characteristic) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !char._id) return;

  uploadingImg[char._id] = true;
  const url = await uploadImage(file, char.ImgUrl1); // delete old image
  uploadingImg[char._id] = false;

  if (url) char.ImgUrl1 = url;
};

// Update existing
const updateChar = async (char: Characteristic) => {
  if (!char._id) return;
  if (!char.Title || !char.ShortDescription || !char.GraphicUrl) {
    alert("Title, Short Description, and Graphic are required");
    return;
  }
  const ok = await updateCharacteristic(char._id, char);
  if (ok) {
    await getCharacteristics();
    showMessage("Characteristic updated successfully!");
  }
};

// Delete existing
const deleteChar = async (char: Characteristic) => {
  if (!char._id) return;

  if (!confirm("Are you sure you want to delete this characteristic?")) return;

  try {
    // Delete old images if any
    const formData = new FormData();
    if (char.GraphicUrl) formData.append("oldUrl", char.GraphicUrl);
    if (char.ImgUrl1) formData.append("oldUrl", char.ImgUrl1);

    await fetch("/api/upload", { method: "POST", body: formData });

    // Delete characteristic in DB
    const ok = await deleteCharacteristic(char._id);
    if (ok) {
      await getCharacteristics();
      showMessage("Characteristic deleted successfully!");
    }
  } catch (err) {
    console.error("Failed to delete characteristic images", err);
  }
};

// New Characteristic
const newChar = reactive<Characteristic>({
  GraphicUrl: "",
  Title: "",
  ShortDescription: "",
  SecondTitle: "",
  Description: "",
  ImgUrl1: "",
});

const uploadingNewGraphic = ref(false);
const uploadingNewImg = ref(false);

const handleNewGraphic = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadingNewGraphic.value = true;
  const url = await uploadImage(file);
  uploadingNewGraphic.value = false;
  if (url) newChar.GraphicUrl = url;
};

const handleNewImg = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadingNewImg.value = true;
  const url = await uploadImage(file);
  uploadingNewImg.value = false;
  if (url) newChar.ImgUrl1 = url;
};

const createChar = async () => {
  if (!newChar.Title || !newChar.ShortDescription || !newChar.GraphicUrl) {
    alert("Title, Short Description, and Graphic are required");
    return;
  }

  const payload: Characteristic = {
    Title: newChar.Title,
    ShortDescription: newChar.ShortDescription,
    GraphicUrl: newChar.GraphicUrl,
    SecondTitle: newChar.SecondTitle,
    Description: newChar.Description,
    ImgUrl1: newChar.ImgUrl1,
  };

  const ok = await createCharacteristic(payload);
  if (ok) {
    // Reset form
    Object.assign(newChar, {
      GraphicUrl: "",
      Title: "",
      ShortDescription: "",
      SecondTitle: "",
      Description: "",
      ImgUrl1: "",
    });
    if (newGraphicInput.value) newGraphicInput.value.value = "";
    if (newImgInput.value) newImgInput.value.value = "";

    await getCharacteristics(); // refresh list
    showMessage("Characteristic created successfully!");
  }
};
</script>
