<template>
  <div>
    <Navbar />
    <Hero />
    <WeAre />
    <Statistic />
    <Features />
    <AlsoGet />
    <WhoAreWe />
    <WhyWe />
    <Reviews />
    <Download />
    <Foot />
  </div>
</template>

<script setup>
import Navbar from "~/components/NavbarView.vue";
import Hero from "~/components/HeroView.vue";
import WeAre from "~/components/WeAreView.vue";
import Statistic from "~/components/StatisticView.vue";
import WhoAreWe from "~/components/WhoAreWeView.vue";
import WhyWe from "~/components/WhyWeView.vue";
import Download from "~/components/DownloadView.vue";
import Foot from "~/components/FooterView.vue";
import Reviews from "~/components/ReviewsView.vue";
import AlsoGet from "~/components/AlsoGetView.vue";
import Features from "~/components/FeaturesView.vue";
</script>

<style>
.container {
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;
}
</style>
