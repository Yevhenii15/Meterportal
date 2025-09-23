<template>
  <nav class="navbar">
    <div class="container nav-inner">
      <!-- Left: Logo (dynamic) -->
      <div class="logo">
        <img
          :src="introInfo?.LogoUrl || '/img/horizontal-color-darkmode.png'"
          alt="Company Logo"
          class="logo-img"
        />
      </div>

      <!-- Right: Nav Items -->
      <div class="nav-items">
        <!-- UTILITY button: link dynamic, logo static -->
        <a
          :href="introInfo?.UtilityLink || '#'"
          class="btn utility"
        >
          <span class="dot blue">
            <img src="/img/blueLogo.png" alt="Utility Logo" />
          </span>
          <span>UTILITY</span>
        </a>

        <!-- CONSUMER button: link dynamic, logo static -->
        <a
          :href="introInfo?.ConsumerLink || '#'"
          class="btn consumer"
        >
          <span class="dot pink">
            <img src="/img/redLogo.png" alt="Consumer Logo" />
          </span>
          <span>CONSUMER</span>
        </a>

        <!-- Language icon (static) -->
        <button class="lang-btn">
          <img src="/img/languageIcon.png" alt="Language" class="lang-icon" />
        </button>
      </div>
    </div>

    <!-- Optional loading/error display -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </nav>
</template>



<script setup>
import { onMounted } from "vue";
import { useIntroInfo } from "@/composables/useIntroInfo";

const { introInfo, getIntroInfo, loading, error } = useIntroInfo();

onMounted(() => {
  getIntroInfo();
});

</script>

<style scoped>
/* Navbar container */
.navbar {
  position: fixed;   
  top: 0;           
  left: 0;
  right: 0;
  z-index: 1000;     
  background: #1D1D1D;
  color: #fff;
}


.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0; /* vertical padding only, horizontal handled by container */
}


/* Logo */

.logo-img {
  height: 45px; 
  display: block;
}

/* Right side nav items */
.nav-items {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Buttons */
.btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 18px;
  border: 3px solid #fff;
  border-radius: 9999px; /* pill shape */
  font-size: 13px;
  font-weight: 500;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #fff;
    color: #000;
}

/* Button icons */
.btn-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
}

/* Adjust dot if needed */
.dot {
  width: 11px;
  height: 11px;
  display: flex;
}

/* Language button */


.lang-icon {
  width: 30px;
  height: 30px;
  display: block;
}
</style>
