<template>
  <footer class="footer">
    <div class="footer-top-border"></div>

    <div class="container footer-grid">
      <!-- Column 1: Logo & Contact -->
      <div class="footer-col footer-logo-col">
        <div class="footer-logo">
          <a href="#">
            <img
              src="../public/img/horizontal-color-darkmode.png"
              alt="Måleportal"
            />
          </a>
        </div>

        <div class="footer-contact">
          <template v-if="contact && !loading && !error">
            <p>{{ contact.Address }}</p>
            <p>CVR/SE-nr.: {{ contact.VatNumber }}</p>
            <p>
              {{ contact.Phone }}<br />
              {{ contact.Email }}
            </p>
            <p>Working hours: {{ contact.WorkingTime }}</p>
          </template>

          <template v-else-if="loading">
            <p>Loading contact info...</p>
          </template>

          <template v-else-if="error">
            <p>Error loading contact info</p>
          </template>
        </div>
      </div>

      <!-- Column 2: Policies -->
      <div class="footer-col">
        <h3>Policies</h3>
        <ul>
          <li>
            <button class="link-btn" @click="showPrivacy = true">
              Privacy Policy
            </button>
          </li>
          <li>
            <button class="link-btn" @click="showTerms = true">
              Terms of Trade
            </button>
          </li>
          <li>
            <button class="link-btn" @click="showSecurity = true">
              Security & Operations
            </button>
          </li>
          <li>
            <button class="link-btn" @click="showGDPR = true">
              Sub-processors
            </button>
          </li>
          <li>
            <button class="link-btn" @click="showCookie = true">
              Cookie Policy
            </button>
          </li>
        </ul>
      </div>

      <!-- Column 3: General -->
      <div class="footer-col">
        <h3>General</h3>
        <ul>
          <li>
            <button class="link-btn" @click="scrollToAbout">About Us</button>
          </li>
          <li>
            <button class="link-btn" @click="showContact = true">
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modals -->
    <ContactModal v-model:isOpen="showContact" />
    <PrivacyPolicyModal v-model:isOpen="showPrivacy" />
    <TermsModal v-model:isOpen="showTerms" />
    <SecurityAndOperationsModal v-model:isOpen="showSecurity" />
    <CookiePolicyModal v-model:isOpen="showCookie" />
    <GDPRModal v-model:isOpen="showGDPR" />

    <div class="footer-bottom">
      <p>© MÅLEPORTAL 2025</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useContact } from "@/composables/useContact";

import ContactModal from "~/components/ContactModal.vue";
import PrivacyPolicyModal from "~/components/policies/PrivacyPolicyModal.vue";
import TermsModal from "./policies/TermsModal.vue";
import SecurityAndOperationsModal from "./policies/SecurityAndOperationsModal.vue";
import CookiePolicyModal from "./policies/CookiePolicyModal.vue";
import GDPRModal from "./policies/GDPRModal.vue";

const { contact, loading, error, getContact } = useContact();

const showGDPR = ref(false);
const showCookie = ref(false);
const showSecurity = ref(false);
const showTerms = ref(false);
const showPrivacy = ref(false);
const showContact = ref(false);

const scrollToAbout = () => {
  const aboutSection = document.getElementById("about-us");
  if (aboutSection) {
    const headerOffset = 100; // adjust this value
    const elementPosition = aboutSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  getContact();
});
</script>

<style scoped>
.footer {
  background: #111; /* Darker for modern look */
  color: #e0e0e0;
  padding: 60px 20px 30px;
  font-size: 0.95rem;
  font-family: Arial, sans-serif;
}

.footer-top-border {
  border-top: 2px solid #333;
  width: 100%;
  margin-bottom: 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  max-width: 1200px;
  margin: auto;
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.footer-logo-col {
  gap: 10px;
}

.footer-logo img {
  height: 60px;
  margin-bottom: 15px;
}

.footer-col h3 {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #fff;
  border-bottom: 2px solid #444;
  padding-bottom: 5px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 12px;
}

.link-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  text-align: left;
  transition: color 0.2s ease-in-out;
}

.link-btn:hover {
  color: #fff;
  text-decoration: underline;
}

.footer-contact p {
  margin: 0 0 8px;
}

.footer-bottom {
  border-top: 1px solid #333;
  margin-top: 40px;
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
}

.footer-bottom p {
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1000px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-col {
    align-items: center;
  }

  .footer-col ul {
    padding: 0;
  }

  .footer-contact p {
    text-align: center;
  }
}
</style>
