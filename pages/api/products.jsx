import { Product } from "../models/product";
import { mongooseConnect } from "../lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findById({ _id: req.query.id }));
    } else {
      res.json(await Product.find({}));
    }
  }

  if (method === "POST") {
    const { title, description, price, images } = req.body;

    const newProduct = await Product.create({
      title,
      description,
      price,
      images,
    });

    res.json(newProduct);
  }

  if (method === "PUT") {
    const { _id, title, description, price, images } = req.body;
    
    await Product.updateOne({ _id }, { title, description, price, images });

    res.json(true);
  }

  if (method === "DELETE") {
    const { id } = req.query;

    id && (await Product.deleteOne({ _id: id }));

    res.json(true);
  }
}
