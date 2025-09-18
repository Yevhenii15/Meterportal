<script setup>
import { useRoute } from "vue-router";
import { featuresData } from "@/data/features.js"; // adjust path

const route = useRoute();
const feature = featuresData.find((f) => f.slug === route.params.slug);
</script>

<template>
  <section v-if="feature" class="feature-page">
    <div class="container">
      <h1>{{ feature.title }}</h1>
      <h2>{{ feature.subtitle }}</h2>
      <p v-html="feature.description"></p>

      <div class="images">
        <img
          v-for="(img, i) in feature.images"
          :key="i"
          :src="img"
          :alt="feature.title"
        />
      </div>
    </div>
  </section>

  <section v-else class="not-found">
    <p>❌ This feature is not found</p>
  </section>
</template>
