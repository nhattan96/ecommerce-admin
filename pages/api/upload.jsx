import { Product } from "../models/product";
import multiparty from "multiparty";

export default async function handle(req, res) {
  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });

  if (files.file.length > 0) {
    console.log(files.file[0]);
  }

  return res.json("ok");
}

export const config = {
  // Disable Next.js body parsing, using multer
  api: { bodyParser: false },
};
