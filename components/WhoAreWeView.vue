<template>
  <section class="who-are-we">
    <div class="container who-are-we__grid">
      <!-- Left Column: Text -->
      <div class="who-are-we__content">
        <h2 class="section-title">Who are we?</h2>
        <p>
          We are Måleportal – a team dedicated to making your water and
          electricity consumption easy to understand, track, and control. Our
          platform is built for one purpose: to give you full transparency and
          peace of mind when it comes to your usage.
        </p>
        <p>
          By working hand-in-hand with utility providers, we ensure you get
          accurate, real-time data right where you need it – on your phone or
          computer. This means you can make informed decisions, avoid surprises
          on your bills, and respond quickly to any issues like leaks or unusual
          consumption.
        </p>
        <p>
          Your trust matters to us. That’s why we protect your data with the
          highest security standards and never share it without your consent.
        </p>
      </div>

      <!-- Right Column: Person + CTA -->
      <div class="who-are-we__profile">
        <h3 class="profile-name">Lasse Opstrup</h3>
        <p class="profile-role">CDO, Måleportal</p>
        <button class="cta-button">CALL US NOW</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.who-are-we {
  background: #1d1d1d;
  color: #fff;
  padding: 0 0 100px 0;
}

.who-are-we__grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr; /* right side a bit bigger */
  gap: 40px;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.who-are-we__content p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #e0e0e0;
}

/* Profile column */
.who-are-we__profile {
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertical centering */
  align-items: center;     /* horizontal centering */
  text-align: center;
}

.profile-name {
  font-size: 3.3rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.profile-role {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 35px;
  color: #d0d0d0;
}

.cta-button {
  padding: 16px 45px;
  border: 2px solid #e91e63;
  border-radius: 50px;
  background: transparent;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #e91e63;
  color: #fff;
}

/* Responsive */
@media (max-width: 900px) {
  .who-are-we__grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .who-are-we__profile {
    margin-top: 40px;
  }
}
</style>
