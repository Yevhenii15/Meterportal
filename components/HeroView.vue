<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="container hero-content">
      <h1>WELCOME TO MÅLERPORTAL</h1>

      <div class="bottom-row">
        <div class="left">
          <div class="accent"></div>
          <p>From Operations to Homes – 
            <br>
            We Keep Utilities in Your Hands.</p>
        </div>

        <div class="buttons">
          <a href="https://www.meterportal.eu/en" class="btn-primary">DOWNLOAD APP</a>
         <a href="#" class="btn-link" @click.prevent="scrollToFeatures">See How It Works</a>
        </div>
      </div>
    </div>
    <!-- Add this inside your hero-content, at the end -->
<div class="scroll-down">
  <span></span>
  <span></span>
  <span></span>
</div>

  </section>
</template>

<script setup>
function scrollToFeatures() {
  const el = document.getElementById("features");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
</script>



<style scoped>
.hero {
  position: relative;
  height: 105vh;
  display: flex;
  align-items: center;
  background: url("../public/img/maalerportal.jpg") center/cover no-repeat;
  color: #fff;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.674);
}

.hero-content {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  text-align: center;
}

.hero-content h1 {
  font-size: 3.7rem;
  font-weight: 500;
  margin-bottom: 2rem;
  white-space: nowrap;
  transform: translateY(-150%); /* slight upward shift */
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  transform: translateY(+150%); /* slight upward shift */
}

.left {
  text-align: left;
  max-width: 600px;
}

.accent {
  width: 550px;
  height: 4px;
  background: #ee1063;
  margin-bottom: 1.5rem;
  border-radius: 2px;
}

.left p {
  font-size: 2rem;
  line-height: 1.6;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 52px;
  max-width: 500px;
  margin-bottom: 40px;
}

.btn-primary {
  padding: 10px 38px;
  border: 2px solid #ee1063;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #ee1063;
}

.btn-link {
  font-size: 1.25rem;
  color: #fff;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}


.scroll-down {
  transform: translateX(-70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.scroll-down span {
  display: block;
  width: 25px;
  height: 25px;
  border-bottom: 5px solid #fff;
  border-right: 5px solid #fff;
  opacity: 0;
  animation: arrow-pulse 1.5s infinite;
}

/* stagger the animation for each arrow */
.scroll-down span:nth-child(1) {
  animation-delay: 0.6s;
}
.scroll-down span:nth-child(2) {
  animation-delay: 0.9s;
}
.scroll-down span:nth-child(3) {
  animation-delay: 1.2s;
}

@keyframes arrow-pulse {
  0% {
    transform: rotate(45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    transform: rotate(45deg) translate(0,0);
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) translate(0, 0);
    opacity: 0;
  }
}

</style>
