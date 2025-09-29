<template>
  <div class="p-6 max-w-3xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold"></h1>
      <button
        @click="goBack"
        class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
      >
        Back
      </button>
    </div>
    <CharacteristicForm />
  </div>
</template>

<script setup lang="ts">
import CharacteristicForm from "~/components/admin/CharacteristicForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.push("/admin");
</script>
