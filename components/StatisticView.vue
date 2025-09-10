<template>
  <section class="statistics">
    <div class="container">
      <!-- Section Header -->
      <h2 class="section-title">Our clients trust us</h2>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <!-- Card 1 -->
        <div class="stat-card">
          <div class="icon">
            <img src="../public/img/building.png" alt="Utility providers" />
          </div>
          <h3>200+</h3>
          <p>Utility providers connected</p>
        </div>

        <!-- Card 2 -->
        <div class="stat-card">
          <div class="icon">
            <img src="../public/img/drop.png" alt="Households tracking water" />
          </div>
          <h3>25,000+</h3>
          <p>Households tracking their water</p>
        </div>

        <!-- Card 3 -->
        <div class="stat-card">
          <div class="icon">
            <img src="../public/img/thunder.png" alt="Users monitoring electricity" />
          </div>
          <h3>15,000+</h3>
          <p>Users monitoring electricity</p>
        </div>

        <!-- Card 4 -->
        <div class="stat-card">
          <div class="icon">
            <img src="../public/img/high-quality.png" alt="Years in the industry" />
          </div>
          <h3>20+</h3>
          <p>Years in the industry</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.statistics {
  padding: 0 0 100px 0;
  background: #1d1d1d;
  color: #fff;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #F0532D, #91063A);
  border-radius: 20px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  min-height: 260px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-6px);
  background: linear-gradient(135deg, #c1411e, #70032b); /* darker hover */
}

.icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.icon img {
  width: 110px;
  height: 110px;
  object-fit: contain;
}

.stat-card h3 {
  font-size: 2.2rem;   
  font-weight: 900;   
  margin-bottom: 10px;
  color: #fff;         
}

.stat-card p {
  font-size: 1rem;
  font-weight: 400;
  color: #fff;         
}
</style>
