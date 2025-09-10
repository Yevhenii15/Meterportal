<template>
  <div class="footer">
    <!-- Top border -->
    <div class="footer-top-border"></div>

    <div class="container footer-grid">
      <!-- Company Info -->
      <div class="footer-col">
        <div class="footer-logo">
          <a href="#"><img src="../public/img/horizontal-color-darkmode.png" alt="Måleportal" /></a>
        </div>
        <p>Måleportal ApS<br />Bødkervej 1<br />6710 Esbjerg V</p>
        <p>CVR/SE-nr.: 41858591</p>
        <p>(+45) 46 97 50 75<br />info@meterportal.eu</p>
      </div>

      <!-- Consumer App -->
      <div class="footer-col">
        <h3>Consumer App</h3>
        <ul>
          <li>An app for your meter</li>
          <li>Fixed network</li>
          <li>Drive-by</li>
          <li>Warnings and messages</li>
          <li>Updated master data</li>
        </ul>
      </div>

      <!-- Utility Tools -->
      <div class="footer-col">
        <h3>Utility Tools</h3>
        <ul>
          <li>Innovative solution</li>
          <li>Effective communication</li>
          <li>Meter alarms</li>
          <li>Meter replacement etc.</li>
        </ul>
      </div>

      <!-- Policies -->
      <div class="footer-col">
        <h3>Policies</h3>
        <ul>
          <li>Privacy policy</li>
          <li>Terms of trade and use</li>
          <li>Security and operations</li>
          <li>Sub-processors</li>
          <li>Cookie policy</li>
        </ul>
      </div>

      <!-- General -->
      <div class="footer-col">
        <h3>General</h3>
        <ul>
          <li>About us</li>
          <li>Contact us</li>
        </ul>
      </div>
    </div>

    <!-- Bottom border with text -->
    <div class="footer-bottom">
      <p>© MÅLEPORTAL 2025</p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: #1d1d1d;
  color: #fff;
  padding: 60px 20px 30px;
  font-size: 0.95rem;
}

/* Top border */
.footer-top-border {
  border-top: 1px solid #444;
  width: 100%;
  margin-bottom: 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
}

.footer-col h3 {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 10px;
  color: #d0d0d0;
}

.footer-logo img {
  height: 50px;
  margin-bottom: 15px;
}

/* Bottom full-width border */
.footer-bottom {
  border-top: 1px solid #444;
  margin-top: 40px;
  padding: 20px 0 0 0;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
  width: 100%;
}

/* Responsive */
@media (max-width: 1000px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-col {
    margin-bottom: 20px;
  }
}
</style>
