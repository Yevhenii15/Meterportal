// composables/useIntroInfo.ts
import { ref } from "vue";

export interface IntroInfo {
  Title: string;
  Slogan?: string;
  MainImgUrl?: string;
  LogoUrl?: string;
  UtilityLink?: string;
  ConsumerLink?: string;
  DownloadAppStore?: string;
  DownloadGooglePlay?: string;
  Description?: string;
}

const introInfo = ref<IntroInfo | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useIntroInfo() {
  const getIntroInfo = async () => {
    loading.value = true;
    error.value = null;

    try {
      introInfo.value = await $fetch<IntroInfo>("/api/introinfo");
    } catch (err: any) {
      error.value = err?.statusMessage || "Failed to fetch intro info";
    } finally {
      loading.value = false;
    }
  };

  const updateIntroInfo = async (data: IntroInfo) => {
    loading.value = true;
    error.value = null;

    try {
      introInfo.value = await $fetch<IntroInfo>("/api/introinfo", {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return true;
    } catch (err: any) {
      error.value = err?.statusMessage || "Failed to update intro info";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    introInfo,
    loading,
    error,
    getIntroInfo,
    updateIntroInfo,
  };
}
