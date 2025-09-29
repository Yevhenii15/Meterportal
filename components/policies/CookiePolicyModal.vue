<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">✕</button>

      <!-- Title -->
      <h2 class="modal-title">{{ content.title }}</h2>

      <!-- Short Description -->
      <p class="modal-subtitle">
        {{ content.subtitle }}
      </p>

      <!-- Long Content -->
      <div class="modal-body">
        <div v-for="(section, index) in content.sections" :key="index">
          <h3>{{ section.heading }}</h3>
          <div
            v-for="(subSection, subIndex) in section.subSections"
            :key="subIndex"
          >
            <h4 v-if="subSection.subheading">{{ subSection.subheading }}</h4>
            <p>{{ subSection.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["update:isOpen"]);

const close = () => emit("update:isOpen", false);

// All the privacy policy text content
type SubSection = { text: string; subheading?: string };
type Section = { heading: string; subSections: SubSection[] };

const content: {
  title: string;
  subtitle: string;
  sections: Section[];
} = {
  title: "Cookie Policy",
  subtitle: "Below you can read about our cookie policy.",
  sections: [
    {
      heading: "Cookie Policy for Meterportal ApS",
      subSections: [
        {
          text: "Meterportal ApS uses cookies to continuously improve your experience of our service on the website,",
        },
      ],
    },
    {
      heading: "What is a cookie?",
      subSections: [
        {
          text: "Cookies are small text files that are stored on your computer and help us with anonymized statistics about how you use our website. By using cookies, we are also able to distinguish between visitors to our website and treat them individually. This allows us to provide you with improved content when you visit our website. Except for the most necessary system cookies, we do not set any cookies without your prior consent.",
        },
      ],
    },
    {
      heading: "How long are cookies stored?",
      subSections: [
        {
          text: "The length of time cookies are stored on your device varies. The time is counted from the last time you visited our website. After expiration, cookies will be automatically deleted.",
        },
      ],
    },
    {
      heading: "Delete cookies",
      subSections: [
        {
          text: "You can always delete your cookies, but we would like to point out that you may lose functionality on the website if you delete the necessary cookies. If you use multiple browsers, you must delete cookies in all of them.",
        },
        {
          text: "If you use a PC, press CTRL + SHIFT + Delete simultaneously.",
        },
        {
          text: "If you use a MAC, press SHIFT + CMD + Delete simultaneously.",
        },
      ],
    },
    {
      heading: "Cookies",
      subSections: [
        {
          text: "Read about cookies on the Danish Business Authority's website: https://erhvervsstyrelsen.dk/cookies/",
        },
      ],
    },
  ],
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: #1d1d1d;
  padding: 50px;
  border-radius: 20px;
  width: 95%;
  max-width: 1000px;
  max-height: 70vh;
  overflow-y: auto;
  color: #fff;
  position: relative;
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  border-left: 5px solid #ee1063;
  padding-left: 12px;
}

.modal-subtitle {
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: #ccc;
}

.modal-body h3 {
  margin-top: 25px;
  font-size: 1.4rem;
  color: #ee1063;
}

.modal-body h4 {
  margin-top: 18px;
  font-size: 1.2rem;
  color: #f0f0f0;
}

.modal-body p {
  margin-top: 8px;
  line-height: 1.6;
  color: #ddd;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 25px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}
</style>
