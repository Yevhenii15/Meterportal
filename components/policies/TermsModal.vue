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
  title: "Terms of Use – Meterportal App",
  subtitle: "Below you can read about our terms of use for our products.",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      subSections: [
        {
          text: "1.1 The Meterportal app is a consumption overview app owned and operated by Meterportal ApS (hereinafter 'Meterportal').",
        },
        {
          text: "1.2 These terms of use (hereinafter 'Terms') for the use of services on the Meterportal app (hereinafter 'App') govern the relationship regarding the use of the App between you as a user and Meterportal.",
        },
        {
          text: "1.3 It is a condition for using the App that you accept these Terms. Otherwise, unfortunately, you cannot use the App.",
        },
        {
          text: "1.4 For information on how Meterportal processes your personal data, please refer to Meterportal's privacy policy.",
        },
      ],
    },
    {
      heading: "2. About the App",
      subSections: [
        {
          text: "2.1 The App is an application where you can monitor your water, electricity, and heat consumption directly on your phone, and which can notify you of potential problems such as water leaks.",
        },
        {
          text: "2.2 Contact Information Meterportal ApS Bødkervej 1 DK-6710 Esbjerg V CVR no.: 41858591 Email: info@meterportal.dk",
        },
      ],
    },
    {
      heading: "3. Creating a Profile",
      subSections: [
        {
          text: "3.1 To use the App, you must create a profile. You can create a profile by providing your email address, first and last name, and phone number. You will then receive an email for verification as a user of the App. The profile you create is for your own personal use.",
        },
        {
          text: "3.2 Your password is personal, and you are obligated to treat and store the password confidentially, not disclose it to others, or otherwise allow others to access the code. Meterportal stores your password in encrypted form.",
        },
        {
          text: "3.3 If you have forgotten your password, you can request to have your password reset. You will receive an email from Meterportal with a link to reset the password.",
        },
        {
          text: "3.4 If you experience misuse of your password or user profile, you should immediately contact Meterportal using our contact information.",
        },
      ],
    },
    {
      heading: "4. Communication Between Meterportal and User",
      subSections: [
        {
          text: "4.1 Necessary Communications",
        },
        {
          text: "4.1.1 Meterportal may continuously inform you about important technical and legal information, e.g., about changes to the Terms or similar via the email address you provide when creating your profile, via messages in the App, or via push notifications.",
        },
        {
          text: "4.2 Voluntary Communications",
        },
        {
          text: "4.2.1 Meterportal may send you information about new functionality and other material regarding Meterportal to your email address, via messages in the App and/or push notifications, provided you have given your consent to this.",
        },
        {
          text: "4.2.2 You can at any time withdraw one or more of the consents you have given to Meterportal. See also section 8.",
        },
      ],
    },
    {
      heading: "5. Rights and Licenses",
      subSections: [
        {
          text: "5.1 Rights",
        },
        {
          text: "5.1.1 Meterportal has all rights, including copyrights and trademark rights, etc., to the App.",
        },
        {
          text: "5.2 License",
        },
        {
          text: "5.2.1 By accepting the Terms, you obtain a limited, non-exclusive, non-transferable license with the possibility of termination to download, install, and use the App for personal use and in accordance with these Terms.",
        },
        {
          text: "5.2.2 Your license to use the App is at all times conditional upon you maintaining a user relationship with Meterportal. If you no longer wish to be registered as a user, you unfortunately can no longer use the App.",
        },
      ],
    },
    {
      heading: "6. Operation",
      subSections: [
        {
          text: "6.1 Meterportal always seeks to avoid errors, deficiencies, and operational disturbances on the App, but these may occur. Meterportal welcomes information about such conditions and will always seek to remedy such issues as soon as convenient.",
        },
        {
          text: "6.2 Meterportal is in no way responsible to its users in the event of errors, deficiencies, operational disturbances, or removal of functionality.",
        },
      ],
    },
    {
      heading: "7. Access to the App",
      subSections: [
        {
          text: "7.1 The App requires that the phone has an internet connection for you to use the App's functionalities. The App's quality, in terms of speed and user-friendliness, may vary depending on the phone model and network speed. Meterportal assumes no responsibility for the possible impact of your internet connection and phone subscription on the usability of the App.",
        },
      ],
    },
    {
      heading: "8. Withdrawal of Consent",
      subSections: [
        {
          text: "8.1 You can at any time withdraw one or more of the consents you have given to Meterportal. Withdrawal can be done in the App under 'Settings', and you can also withdraw your consent by contacting us.",
        },
        {
          text: "8.2 If you withdraw one or more of your consents, you will still have access to your user profile on the App, but there may be certain functions that you cannot use.",
        },
      ],
    },
    {
      heading: "9. Liability",
      subSections: [
        {
          text: "9.1 Meterportal can at no time be held responsible for your use of the App, including, but not limited to, actions or omissions made based on information from the App. Your use of the App is at all times at your own risk and responsibility.",
        },
        {
          text: "9.2 For example, Meterportal cannot be held responsible for:",
        },
        {
          text: "9.2.1 Cases of breach, loss, delay, or errors in data transmissions.",
        },
        {
          text: "Any form of direct or indirect damage that occurs as a result of the inability to use the App, including in particular the loss of data on your system. Any form of damage caused by you, your devices, and data stored on these devices, or the consequences that may arise regarding your use of the App. Messages and/or data that are sent to a false, incorrect, or incomplete address. Cases where data for whatever reason does not arrive, or where the received data is unreadable or unmanageable. Cases where you, for whatever reason, cannot access the App, including cases of maintenance, updates, or technical improvements. Cases where the connection is interrupted for whatever reason.",
        },
        {
          text: "9.3 Furthermore, Meterportal cannot be held responsible for cases of incorrect use of the App and/or accidents in connection with the use of the App. Meterportal is in no way responsible for damages of any kind to you, your devices, or data stored on these devices or for consequences that may arise as a result thereof.",
        },
        {
          text: "9.4 Meterportal is not responsible for non-compliance with the Terms, damage, or loss in the event of force majeure, including but not limited to virus or hacker attacks, breakdowns or errors in communication systems, power failures, subcontractors' force majeure, and other unforeseen circumstances that Meterportal could not reasonably foresee or avoid.",
        },
      ],
    },
    {
      heading: "10. Termination and Deletion",
      subSections: [
        {
          text: "10.1 If you disagree with the Terms or for any other reason no longer wish to use the App, you can delete your profile at any time. If you wish to delete your user profile, this can be done under 'Settings' in the App.",
        },
        {
          text: "10.2 Meterportal can at any time and without notice terminate your agreement on the use of the App and possibly delete your user profile. If Meterportal terminates your agreement on the use of the App, Meterportal will contact you via the App or the email address you provided when creating your profile.",
        },
        {
          text: "10.3 When deleting your user profile, all data registered on your user profile in the App is permanently deleted or anonymized and cannot be recovered. You cannot make any claims against Meterportal if your account is deleted.",
        },
        {
          text: "10.4 After deletion of your user profile, it can no longer be used.",
        },
      ],
    },
    {
      heading: "11. Disputes",
      subSections: [
        {
          text: "11.1 If disputes arise between you and Meterportal, these shall, to the extent legally possible, be handled according to Danish law, without regard to Danish law's rules on international choice of law and forum, by the ordinary Danish courts, at Meterportal's current place of jurisdiction.",
        },
      ],
    },
    {
      heading: "12. Changes",
      subSections: [
        {
          text: "12.1 Meterportal can at any time and without notice change these Terms. The latest version is always available under 'Settings' in the App.",
        },
        {
          text: "12.2 You are informed about changes to the Terms via the email address you provided in your user profile, as a message in the App, or via push notification. If you do not accept the changed terms, you can no longer use the App, and Meterportal is entitled to delete your profile.",
        },
      ],
    },
    {
      heading: "13. Version",
      subSections: [
        {
          text: "13.1 These Terms were last updated in March 2025 and replace all previously applicable terms.",
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
