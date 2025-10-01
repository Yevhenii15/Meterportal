<template>
  <section class="download-section">
    <div class="container text-center"> 
      <h2 class="headline">Ready to take charge of your energy?</h2>
      <p class="subtext">
        Download now and get consumption info fast and easy
      </p>

      <div class="store-links">
        <!-- Google Play -->
        <a
          href="https://play.google.com/store/apps/details?id=dk.vdoc.meterportal.consumer&hl=da&pli=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../public/img/googlePlay.png" alt="Get it on Google Play" />
        </a>

        <!-- Company Logo -->
        <div class="logo-wrapper">
          <a href="https://www.meterportal.eu/en">
            <img src="../public/img/verticalLogo.png" alt="Måleportal" />
          </a>

        </div>

        <!-- App Store -->
        <a
          href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/fi/app/meterportal/id1667480418&ved=2ahUKEwiXl5WVwr6PAxW6_gIHHRY4A9IQFnoECB0QAQ&usg=AOvVaw19KRus9QHKxwDP64Pshxtr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../public/img/appStore.png" alt="Download on the App Store" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download-section {
  background: #1d1d1d;
  color: #fff;
  padding: 0 0 100px 0;
  text-align: center;
}

.headline {
  font-size: 2.8rem; 
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.subtext {
  font-size: 1.5rem; 
  margin-bottom: 3rem;
  color: #e0e0e0;
}

.store-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px; 
  flex-wrap: wrap;
}

.store-links img {
  height: 80px; 
  transition: transform 0.3s ease;
}

.store-links img:hover {
  transform: scale(1.08);
}

.logo-wrapper img {
  height: 70px;
}

/* --- Responsive --- */
@media (max-width: 1000px) {
  .headline {
    font-size: 2.4rem;
  }

  .subtext {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
  }

  .store-links {
    gap: 40px;
  }

  .store-links img {
    height: 70px;
  }

  .logo-wrapper img {
    height: 60px;
  }
}

@media (max-width: 600px) {
  .headline {
    font-size: 2rem;
  }

  .subtext {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .store-links {
    gap: 25px;
  }

  .store-links img {
    height: 60px;
  }

  .logo-wrapper img {
    height: 50px;
  }
}
</style>

