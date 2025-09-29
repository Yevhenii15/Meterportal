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
  title: "Privacy Policy for Meterportal - App",
  subtitle:
    "This privacy policy describes how Meterportal ApS processes personal data in connection with your use of the Meterportal App, which can be used to monitor your water, electricity, and heat consumption directly on your phone and notify you of potential issues such as water leaks.",
  sections: [
    {
      heading: "1. Data Controller and Contact Information",
      subSections: [
        {
          text: "The Meterportal app (hereinafter 'App') is provided by Meterportal ApS, which is the data controller for the processing of your personal data in the App. Our contact details are: Meterportal ApS, Bødkervej 1, DK-6710 Esbjerg V, CVR no.: 41858591, Email: gdpr@meterportal.eu (hereinafter 'we', 'our').",
        },
      ],
    },
    {
      heading: "2. Description of Processing",
      subSections: [
        {
          subheading: "2.1. Login and Verification",
          text: "We process your personal data in connection with your login to the App to ensure that the App can only be accessed by users who are registered. We process the following personal data about you: your email address, first and last name, address, and phone number. We collect the personal data directly from you through your use of the App and the information you enter in the App. We process your personal data based on GDPR Article 6(1)(b), as the processing is necessary for the performance of a contract to which you are a party, as you have requested to register as a user of the App to monitor your water, electricity, and heat consumption. We retain the above personal data about you as long as you actively use the App and for 6 months thereafter.",
        },
        {
          subheading: "2.2. Ongoing Use of the App",
          text: "We process your personal data in connection with your ongoing use of the App in order to provide you with a functional app. We process the following personal data about you: IP address, device ID, device platform, device model, device OS, user ID, session ID, app version, rejection or acceptance of push notifications, acceptance of terms of use of the App, rejection or acceptance of cookies, profile and contact information, including name, address, phone number and email. We collect personal data directly from you through your use of the App and based on your input of your personal data in the App. We process your personal data based on GDPR Article 6(1)(b), as the processing is necessary for the performance of a contract to which you are a party, as you want to use the App to monitor your water, electricity, and heat consumption. We retain the above personal data about you as long as you actively use the App and for 6 months thereafter.",
        },
        {
          subheading: "2.3. Communication",
          text: "We process your personal data in connection with sending general technical communication about the App and our services, including in connection with updates, functionality changes, outages, or similar. We process the following personal data about you: name, email, and phone number to send technical information to you. We process your personal data based on GDPR Article 6(1)(f) based on a balancing of interests to keep you informed about the App's functionality and get technical updates when relevant. We retain the above personal data about you as long as you actively use the App and for 6 months thereafter.",
        },
        {
          subheading: "2.4. Specifically About Support Functionality",
          text: "We process your personal data in connection with your use of the support function in the App, where you have the opportunity to ask questions about our App and services. We process the following personal data about you: user ID, session ID, and content of your support inquiry, including both questions and answers. We collect personal data directly from you through your use of the App's support function. We process your personal data based on GDPR Article 6(1)(b), as the processing is necessary for the performance of a contract to which you are a party, as you want to use the App to monitor your water, electricity, and heat consumption, and thus related functionalities need to function correctly. We retain the above personal data about you as long as necessary to resolve your support question and for 6 months thereafter.",
        },
        {
          subheading: "2.5. Specifically About Analysis and Statistics",
          text: "We process your personal data, including information about your interaction with the App, when you use the App. The processing is done to optimize, adapt, and develop the App and possibly other related products. The processing of your personal data for this purpose is only carried out if you have given your specific consent. We process the following personal data about you: IP address, device ID, device platform, device model, device OS, user ID, session ID, app version, status for acceptance of cookies, and the associated processing of your personal data. We collect personal data directly from you via cookie-like technologies. We process your personal data based on GDPR Article 6(1)(a), as the placement of cookie-like technologies, the collection of information about your use of the App, and the associated processing of information for statistical and analytical purposes is based on your consent. We retain the above personal data about you for up to two years, after which the information is either deleted or irreversibly anonymized. If you withdraw your consent, personal data is anonymized immediately.",
        },
        {
          subheading: "2.6. Security and Logging",
          text: "When you use the App, we log information about your use of the App. The processing is done to be able to troubleshoot and correct in connection with any breakdowns or similar technical errors, just as the processing is necessary to maintain an appropriate level of security. We process the following personal data about you: IP address, device ID, device platform, device model, device OS, user ID, session ID, app version, your significant actions in the App. We collect personal data directly from you. We process these personal data pursuant to GDPR Article 6(1)(c), as we are required by law, including as a result of GDPR Article 32, to maintain an appropriate level of security, including ensuring the integrity, availability, and confidentiality of personal data about you. We retain the above personal data in our log for 6 months.",
        },
      ],
    },
    {
      heading: "3. Recipients of Personal Data",
      subSections: [
        {
          text: "We do not share your personal data with anyone unless it is necessary for us to pursue a legitimate interest, e.g., in connection with disputes where the information may be disclosed to advisors, authorities, and legal bodies. However, your personal data is entrusted to external partners and suppliers, including IT and support providers, for the operation, development, and hosting of our IT systems and platforms. We may also use external partners for other purposes, such as statistics and marketing. These suppliers and partners are data processors for us and only process your personal data according to our instructions and to fulfill our purposes based on a data processing agreement and as described in this privacy policy.",
        },
      ],
    },
    {
      heading: "4. Transfers to Countries Outside the EU/EEA",
      subSections: [
        {
          text: "As a rule, personal data will only be processed within the EU/EEA. If we transfer personal data to third countries outside the EU/EEA, we will ensure that a transfer basis has been established for this transfer and that appropriate security measures have been taken, including using the EU Commission's standard contractual clauses for the transfer of personal data to third countries outside the EU/EEA, cf. GDPR Article 46(2)(c). You can obtain a copy of the relevant transfer basis or information on where it has been made available by contacting us at gdpr@meterportal.eu.",
        },
      ],
    },
    {
      heading: "5. Your Rights",
      subSections: [
        {
          text: "You have the right at any time to know what personal data we process about you, for what purpose, where we obtained your personal data, and who receives your personal data. You have the right to have your personal data rectified if it is incorrect or misleading. In certain cases, you have the right to have your personal data deleted if we no longer have a purpose for processing your personal data or if you object to the processing of your personal data. In certain cases, you have the right to obtain restriction of the processing of your personal data, e.g., if you dispute the accuracy of the personal data collected about you, or if you have objected to the processing of your personal data based on legitimate interests, or if the processing of your personal data is contrary to your consent. In such cases, we will only store your personal data until your objection has been assessed. If we lift the restriction on our processing of your personal data, you will be notified in advance. In certain cases, you have the right to receive your personal data in a structured, commonly used, and machine-readable format and to have this data transferred from one data controller to another. This right only applies when the processing of your personal data is based on a contract under GDPR Article 6(1)(b) or your consent under GDPR Article 6(1)(a). You have the right not to be subject to a decision based solely on automated processing, including profiling. We do not carry out such automated processing. To the extent that we process your personal data based on your consent, you may withdraw your consent at any time. This can be done at any time by contacting us.",
        },
      ],
    },
    {
      heading: "6. Complaint Access",
      subSections: [
        {
          text: "If you wish to complain about the processing of your personal data, we would very much like to hear from you. We can be contacted via the contact options in section 1. You also have the option to lodge a complaint with the Danish Data Protection Agency, Carl Jacobsens Vej 35, DK-2500 Valby, or via the Data Protection Agency's website.",
        },
      ],
    },
    {
      heading: "7. Changes to the Privacy Policy",
      subSections: [
        {
          text: "We reserve the right to update this privacy policy on an ongoing basis. In the event of significant changes, we will notify you by email or via a message through the App. It is your responsibility to stay informed about the current version.",
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
