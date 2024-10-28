import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Categories() {
  const [editedData, setEditedData] = useState(undefined);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchCategory();
    return () => {};
  }, []);

  const fetchCategory = () => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();

    const data = {
      name,
      parentCategory: parentCategory ? parentCategory : null,
    };

    if (editedData) {
      await axios.put("/api/categories", { ...data, _id: editedData._id });
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    setParentCategory("");
    fetchCategory();
  };

  const handleEditCategory = (category) => {
    setEditedData(category);
    setName(category.name);
    setParentCategory(category.parent?._id || 0);
  };

  const handleDeleteCategory = (category) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${category.name}`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete!",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete("/api/categories?_id=" + category._id);
        
        fetchCategory();
      }
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={handleSaveCategory}>
        <label htmlFor="category">
          {editedData ? "Edit" : "New"} Category name
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
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
