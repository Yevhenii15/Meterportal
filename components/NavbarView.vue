<template>
  <nav class="navbar">
    <!-- Left: Logo -->
    <div class="logo">
      <img src="/img/horizontal-color-darkmode.png" alt="Company Logo" class="logo-img" />
    </div>

    <!-- Right: Nav Items -->
    <div class="nav-items">
      <button class="btn utility">
        <span class="dot blue">
            <img src="../public/img/blueLogo.png" alt="">
        </span>
        <span>UTILITY</span>
      </button>

      <button class="btn consumer">
        <span class="dot pink">
            <img src="../public/img/redLogo.png" alt="">
        </span>
        <span>CONSUMER</span>
      </button>

      <button class="lang-btn">
        <img src="/img/languageIcon.png" alt="Language" class="lang-icon" />
      </button>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
/* Navbar container */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
  background: #000;
  color: #fff;
  font-family: "Montserrat", sans-serif;
}

/* Logo */
.logo {
  margin-left: 15px;
}
.logo-img {
  height: 35px; /* adjust to match your screenshot */
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
