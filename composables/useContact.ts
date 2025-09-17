// composables/useContact.ts
import { ref } from "vue";

export interface Contact {
  Phone: string;
  Email: string;
  Address: string;
  WorkingTime: string;
  VatNumber: string;
}

const contact = ref<Contact | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useContact() {
  const getContact = async () => {
    loading.value = true;
    error.value = null;

    try {
      contact.value = await $fetch<Contact>("/api/contact");
    } catch (err: any) {
      error.value = err?.statusMessage || "Failed to fetch contact info";
    } finally {
      loading.value = false;
    }
  };

  const updateContact = async (data: Contact) => {
    loading.value = true;
    error.value = null;

    try {
      contact.value = await $fetch<Contact>("/api/contact", {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return true;
    } catch (err: any) {
      error.value = err?.statusMessage || "Failed to update contact info";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    contact,
    loading,
    error,
    getContact,
    updateContact,
  };
}
