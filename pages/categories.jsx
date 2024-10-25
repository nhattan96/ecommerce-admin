import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";

export default function Categories() {
  const [isEdit, setIsEdit] = useState(false);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchCategory();
    return () => {};
  }, []);

  const fetchCategory = () => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();

    await axios.post("/api/categories", { name, parentCategory });

    setName("");
    fetchCategory();
  };

  const handleEditCategory = (category) => {
    setIsEdit(true);
    setName(category.name);
    setParentCategory(category.parent._id);
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={handleSaveCategory}>
        <label htmlFor="category">
          {isEdit ? "Edit" : "New"} Category name
        </label>
        <div className="flex gap-2">
          <input
            id="category"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="m-0 px-1"
          />
          <select
            name="parentCategory"
            id="parentCategory"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="mb-0"
          >
            <option value="0">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <button className="btn-primary">Save</button>
        </div>
      </form>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="btn-primary"
                  >
                    Edit
                  </button>
                  <button className="btn-red">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
