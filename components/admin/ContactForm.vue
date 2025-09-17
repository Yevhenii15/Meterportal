<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">Contact Section</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Phone -->
      <div>
        <label class="block text-sm font-medium">Phone</label>
        <input
          v-model="form.Phone"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium">Email</label>
        <input
          v-model="form.Email"
          type="email"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Address -->
      <div>
        <label class="block text-sm font-medium">Address</label>
        <input
          v-model="form.Address"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Working Time -->
      <div>
        <label class="block text-sm font-medium">Working Time</label>
        <input
          v-model="form.WorkingTime"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- VAT Number -->
      <div>
        <label class="block text-sm font-medium">VAT Number</label>
        <input
          v-model="form.VatNumber"
          type="text"
          class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
import { useContact } from "~/composables/useContact";

const { contact, getContact, updateContact, loading, error } = useContact();

const form = reactive({
  Phone: "",
  Email: "",
  Address: "",
  WorkingTime: "",
  VatNumber: "",
});

const success = ref(false);

// Fetch current contact info on mount
onMounted(async () => {
  await getContact();
  if (contact.value) Object.assign(form, contact.value);
});

// Keep form in sync if DB data changes
watch(contact, (val) => {
  if (val) Object.assign(form, val);
});

// Submit updated data
const handleSubmit = async () => {
  success.value = false;
  const ok = await updateContact(form);
  if (ok) success.value = true;
};
</script>
