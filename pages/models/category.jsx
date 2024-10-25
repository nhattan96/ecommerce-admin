import { model, models, Schema, Types } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Types.ObjectId,
    ref: "Category",
  },
});

export const Category = models.Category || model("Category", CategorySchema);
