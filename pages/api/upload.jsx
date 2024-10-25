import { Product } from "../models/product";
import multiparty from "multiparty";
import { google } from "googleapis";
import fs from "fs";

export default async function handle(req, res) {
  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });

  if (files.file.length > 0) {
    try {
      // Get the file data
      const file = files.file[0];

      const apikeys = require("../../keys/next-ecommerge-439407-43f01fd30ece.json");
      const { client_email, private_key } = apikeys;

      // Authenticate with Google Drive API
      const jwtClient = new google.auth.JWT(
        client_email,
        null,
        private_key,
        ["https://www.googleapis.com/auth/drive.file"] // Correct Google Drive API scope
      );

      // Authorize the client
      await jwtClient.authorize();

      // Create the Google Drive instance
      const drive = google.drive({ version: "v3", auth: jwtClient });

      // Upload the file
      const response = await drive.files.create({
        resource: {
          name: file.originalFilename, // File name
          parents: ["1v8M8qpoJ3e6WT2u_VwFJ06pSbeKUix2H"], // Parent folder ID
        },
        media: {
          body: fs.createReadStream(file.path), // File stream for upload
          mimeType: file.headers["content-type"], // Mime type
        },
        fields: "id", // Return the file ID
      });

      const fileId = response.data.id;

      const publicUrl = `https://drive.google.com/thumbnail?id=${fileId}&authuser=0`;

      fs.unlinkSync(file.path);

      // Make the file public
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      // Send response with file ID
      res.status(200).json({ fileId: fileId, publicUrl: publicUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "File upload failed." });
    }
  }

  return res.json("ok");
}

export const config = {
  // Disable Next.js body parsing, using multer
  api: { bodyParser: false },
};
