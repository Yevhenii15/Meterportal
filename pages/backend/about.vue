<template>
  <div class="p-6 max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold"></h1>
      <button
        @click="goBack"
        class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
      >
        Back
      </button>
    </div>
    <AboutForm />
    <ContactForm />
  </div>
</template>

<script setup lang="ts">
import AboutForm from "~/components/admin/AboutForm.vue";
import ContactForm from "~/components/admin/ContactForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.push("/admin");
</script>
