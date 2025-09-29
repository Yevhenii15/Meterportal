<script setup lang="ts">
import { onMounted } from "vue";
import { useContact } from "~/composables/useContact";

const isOpen = defineModel<boolean>("isOpen");
const { contact, loading, error, getContact } = useContact();

onMounted(() => {
  if (!contact.value) {
    getContact();
  }
});
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="isOpen = false">
    <div class="modal-content">
      <button class="close-btn" @click="isOpen = false">✕</button>

      <div class="modal-body">
        <div class="modal-text">
          <div class="modal-heading">
            <h2>Contact Information</h2>
          </div>

          <div v-if="loading" class="text-gray-400">Loading...</div>
          <div v-else-if="error" class="text-red-500">{{ error }}</div>

          <div v-else-if="contact" class="space-y-4">
            <p><strong>Phone:</strong> {{ contact.Phone }}</p>
            <p><strong>Email:</strong> {{ contact.Email }}</p>
            <p><strong>Address:</strong> {{ contact.Address }}</p>
            <p><strong>Working Time:</strong> {{ contact.WorkingTime }}</p>
            <p><strong>VAT Number:</strong> {{ contact.VatNumber }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background: #1d1d1d;
  padding: 70px; /* even bigger padding */
  border-radius: 30px;
  width: 95%;
  max-width: 1000px; /* wide modal */
  position: relative;
  text-align: left;
  overflow-y: auto;
  max-height: 85vh;
  color: #fff;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 35px;
  background: rgba(0, 0, 0, 0.45);
  padding: 50px; /* larger inner padding */
  border-radius: 25px;
}

.modal-heading {
  border-left: 5px solid #ee1063;
  padding-left: 15px;
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 2rem; /* larger heading */
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: transparent;
  border: none;
  font-size: 2.2rem;
  color: #fff;
  cursor: pointer;
}

.space-y-4 p {
  margin: 14px 0;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #ccc;
}
</style>
