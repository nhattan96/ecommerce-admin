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
    const { name, parent } = req.body;

    const newCategory = await Category.create({ name, parent });

    res.json(newCategory);
  }

  if (method === "PUT") {
    const { _id, name, parent } = req.body;

    await Category.updateOne({ _id }, { name, parent });

    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;

    _id && (await Category.deleteOne({ _id }));

    res.json(true);
  }
}
