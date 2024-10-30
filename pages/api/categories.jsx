import { mongooseConnect } from "../lib/mongoose";
import { Category } from "../models/category";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const categories = await Category.find().sort().populate("parent");

    res.json(categories);
  }

  if (method === "POST") {
    const { name, parent, properties } = req.body;

    const newCategory = await Category.create({ name, parent, properties });

    res.json(newCategory);
  }

  if (method === "PUT") {
    const { _id, name, parent, properties } = req.body;

    await Category.updateOne({ _id }, { name, parent, properties });

    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;

    _id && (await Category.deleteOne({ _id }));

    res.json(true);
  }
}
