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

            <p v-if="subSection.text">{{ subSection.text }}</p>

            <!-- Render table if exists -->
            <table v-if="subSection.table" class="responsive-table">
              <thead>
                <tr>
                  <th
                    v-for="(header, hIndex) in subSection.table.headers"
                    :key="hIndex"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, rIndex) in subSection.table.rows"
                  :key="rIndex"
                >
                  <td v-for="(cell, cIndex) in row" :key="cIndex">
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
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

type Table = { headers: string[]; rows: string[][] };
type SubSection = { text?: string; subheading?: string; table?: Table };
type Section = { heading: string; subSections: SubSection[] };

const content: {
  title: string;
  subtitle: string;
  sections: Section[];
} = {
  title: "GDPR Sub-processors",
  subtitle:
    "Below you can see an overview of our sub-processors and what they are used for.",
  sections: [
    {
      heading: "Sub-processors",
      subSections: [
        { text: "Overview of sub-processors for Meterportal ApS" },
        {
          text: "Meterportal ApS uses sub-processors to process personal data. These sub-processors are typically providers of cloud services or other IT hosting services. We ensure that data processing agreements are entered into with all our sub-processors to protect your personal data as best as possible.",
        },
        {
          text: "If sub-processors are located outside the EU, we ensure that a valid transfer basis is in place by, among other things, entering into the EU's Standard Contractual Clauses (SCC). Under each category, you can read what data our sub-processors have access to, what the purpose is, where the data is stored, and what the transfer basis is, if data is transferred to third countries.",
        },
        {
          subheading: "Overview Table",
          table: {
            headers: ["Sub-processor", "Product", "Host location", "Purpose"],
            rows: [
              [
                "Hetzner Online GmbH",
                "Server hosting",
                "Germany",
                "Hetzner hosts Meterportal's applications",
              ],
              [
                "Amazon AWS",
                "SES (Simple Email Service)",
                "Germany",
                "SES supports sending emails generated through Meterportal's applications",
              ],
              [
                "ONLINECITY.IO",
                "GatewayAPI (SMS Gateway)",
                "Germany",
                "GatewayAPI supports sending SMS generated through Meterportal's applications",
              ],
              ["Backblaze", "B2", "Netherlands", "Backup of our applications"],
            ],
          },
        },
        {
          text: "The overview of sub-processors was last updated: 07-12-2023.",
        },
      ],
    },
    {
      heading: "Contact us if you have questions",
      subSections: [
        {
          text: "If you have any questions about our use of sub-processors, you are welcome to reach out to us at gdpr@meterportal.eu.",
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

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.responsive-table th,
.responsive-table td {
  border: 1px solid #444;
  padding: 8px;
}

.responsive-table th {
  background-color: #222;
  color: #ee1063;
}

.responsive-table td {
  background-color: #1b1b1b;
}
</style>
