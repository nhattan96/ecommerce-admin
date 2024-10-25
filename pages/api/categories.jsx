import { mongooseConnect } from "../lib/mongoose";
import { Category } from "../models/category";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const categories = await Category.find().populate("parent");

    res.json(categories);
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;

    const newCategory = await Category.create({ name, parent: parentCategory });

    res.json(newCategory);
  }
}
