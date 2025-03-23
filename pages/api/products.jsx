import { getSession } from "next-auth/react";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/product";
import { IsAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const session = await getSession({ req });
  if (!session || !IsAdminRequest(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "Not an Admin";
  }

  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findById({ _id: req.query.id }));
    } else {
      res.json(await Product.find({}).sort({ _id: -1 }));
    }
  }

  if (method === "POST") {
    const { title, description, price, images, categoryId, properties } =
      req.body;

    const newProduct = await Product.create({
      title,
      description,
      price,
      images,
      categoryId,
      properties,
    });

    res.json(newProduct);
  }

  if (method === "PUT") {
    const { _id, title, description, price, images, categoryId, properties } =
      req.body;

    await Product.updateOne(
      { _id },
      { title, description, price, images, categoryId, properties }
    );

    res.json(true);
  }

  if (method === "DELETE") {
    const { id } = req.query;

    id && (await Product.deleteOne({ _id: id }));

    res.json(true);
  }
}
