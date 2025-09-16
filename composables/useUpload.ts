export function useUpload() {
  const uploadImage = async (
    file: File,
    oldUrl?: string
  ): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    // send old URL to backend to delete
    if (oldUrl) formData.append("oldUrl", oldUrl);

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
