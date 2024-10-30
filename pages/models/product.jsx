import { model, models, Schema, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
