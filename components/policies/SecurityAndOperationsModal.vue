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
  title: "Security and Operations",
  subtitle: "Below you can read about our security and operations policies.",
  sections: [
    {
      heading: "Securing and availability of your data",
      subSections: [
        {
          text: "Meterportal ApS and our applications are hosted in the cloud by Hetzner. Hetzner is one of the largest providers of private cloud solutions. Physically, files and data are hosted on servers in Germany. All uploaded files and data are simultaneously mirrored and also stored on servers in Denmark.",
        },
      ],
    },
    {
      heading: "SSL secure connection",
      subSections: [
        {
          text: "All communication between you and vdoc's applications is encrypted, so your data cannot be intercepted en route. This is the same technology used for online banking and NemID.",
        },
      ],
    },
    {
      heading: "Guaranteed uptime of 99.9%",
      subSections: [
        {
          text: "Hetzner guarantees an uptime of 99.9%, but of course, operational irregularities may occur when we update and improve the system.",
        },
      ],
    },
    {
      heading: "Fully automatic backup",
      subSections: [
        {
          text: "All data on our applications is continuously backed up on geographically separated servers. If an accident occurs, your data can be recovered.",
        },
      ],
    },
    {
      heading: "Certifications",
      subSections: [
        {
          text: "Hetzner is certified according to DIN ISO/IEC 27001 declarations, ensuring that your data is in safe hands, always available, and backed up in all the right ways.",
        },
        {
          text: "This is one of the most recognized certifications that includes control of: Physical access and security, Hardware, Data security, Logical security, Guard procedures, Network, Documentation",
        },
        {
          text: "You can read more at Hetzner's website, where DIN ISO/IEC 27001 certificates can also be requested.",
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
