import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  categoryId: existingCategory,
  properties: existingProductProperties,
}) {
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    existingProductProperties || {}
  );

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));

    return () => {};
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      price,
      images,
      categoryId,
      properties: productProperties,
    };

    if (_id) {
      await axios
        .put("/api/products", { ...data, _id })
        .then(() => router.push("/products"));
    } else {
      await axios
        .post("/api/products", data)
        .then(() => router.push("/products"));
    }
  };

  const handleUploadImage = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      setIsUploading(true);

      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      const imgUrl = await axios
        .post("/api/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data.publicUrl);

      setImages((oldImages) => [...oldImages, imgUrl]);

      setIsUploading(false);
    }
  };

  const handleChangeProperty = (name, value) => {
    setProductProperties((prev) => {
      const newProp = { ...prev };
      newProp[`${name}`] = value;

      if (!value) {
        delete newProp[`${name}`];
      }

      return newProp;
    });
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const propertiesOfCategory = [];

  if (categories.length && categoryId) {
    let category = categories.find((category) => category._id === categoryId);
    console.log(category, "category");

    if (category?.properties) {
      propertiesOfCategory.push(...category.properties);
    }
  }

  return (
    <form onSubmit={handleCreateProduct}>
      <label htmlFor="title">Product name</label>
      <input
        id="title"
        placeholder="Product name"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      />

      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Uncategoried</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>

      {propertiesOfCategory.length > 0 &&
        propertiesOfCategory.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => handleChangeProperty(p.name, ev.target.value)}
              >
                <option value="">
                  Select {p.name[0].toUpperCase() + p.name.substring(1)}
                </option>
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

      <label htmlFor="photo">Photo</label>
      <div className="flex flex-wrap gap-2 items-center">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-2"
        >
          {!!images.length &&
            images.map((links) => (
              <div key={links} className="h-24 border border-gray-200 rounded-lg p-2 bg-gray-100">
                <img src={links} alt="links" />
              </div>
            ))}
        </ReactSortable>

        {isUploading && <Spinner />}
        <label className="cursor-pointer w-24 h-24 border text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-m bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            id="photo"
            onChange={handleUploadImage}
            className="hidden"
            type="file"
            name="photo"
          />
        </label>
        {!images?.length && <div>No photos</div>}
      </div>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        name=""
      ></textarea>

      <label htmlFor="price">Price</label>
      <input
        id="price"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        type="text"
      />

      <button
        onClick={() => router.push("/products")}
        type="button"
        className="btn-default mr-2"
      >
        Back
      </button>

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
