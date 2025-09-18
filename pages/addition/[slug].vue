<template>
  <section class="feature-detail">
    <div class="container">
      <h2>{{ feature.title }}</h2>
      <p v-html="feature.description"></p>
      <div class="images">
        <img v-for="(img, i) in feature.images" :key="i" :src="img" :alt="feature.title" />
      </div>
      <NuxtLink to="/addition" class="back-btn">← Back</NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { additionFeaturesData } from "@/data/additionFeatures.js";

const route = useRoute();
const feature = additionFeaturesData.find((f) => f.slug === route.params.slug) || {
  title: "Not found",
  description: "This feature does not exist.",
  images: [],
};
</script>

<style scoped>
.feature-detail {
  background: #1d1d1d;
  color: #fff;
  padding: 60px 20px;
  min-height: 100vh;
}
.images {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.images img {
  width: 300px;
  border-radius: 20px;
  background: #2a2a2a;
  padding: 10px;
}
.back-btn {
  margin-top: 40px;
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #ee1063;
  border-radius: 50px;
  text-decoration: none;
  color: #fff;
}
</style>
