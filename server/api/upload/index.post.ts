import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  // Ensure uploads folder exists
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
  });

  const data = await new Promise<{ url: string }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) return reject(err);

      let file: File;
      if (Array.isArray(files.file)) {
        file = files.file[0];
      } else if (files.file) {
        file = files.file as File;
      } else {
        return reject(new Error("No file uploaded"));
      }

      // Return path accessible from frontend
      const fileUrl = `/uploads/${path.basename(file.filepath)}`;
      resolve({ url: fileUrl });
    });
  });

  return data; // Nuxt will serialize as JSON
});
