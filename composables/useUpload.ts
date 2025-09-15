export function useUpload() {
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      return data.url;
    } catch (err) {
      console.error("Upload failed", err);
      return null;
    }
  };

  return { uploadImage };
}
