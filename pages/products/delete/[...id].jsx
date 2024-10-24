import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();

  const [productInfo, setProductInfo] = useState(null);

  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((res) => setProductInfo(res.data));

    return () => {};
  }, [id]);

  const handleGoBack = () => {
    router.push("/products");
  };

  const handleDeleteProduct = () => {
    console.log(id,'idddd')
    axios
      .delete("/api/products?id=" + id)
      .then((res) => router.push("/products"));
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete <br /> "{productInfo?.title}"
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={handleDeleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={handleGoBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
