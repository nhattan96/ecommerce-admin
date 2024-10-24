import Layout from "@/pages/components/Layout";
import ProductForm from "@/pages/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();

  const [productDetail, setProductDetail] = useState(null);

  // because name of file is [...id] ,
  // if file name is [...test] then router query will be test
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProductDetail((prev) => res.data);
    });

    return () => {};
  }, [id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productDetail && <ProductForm {...productDetail}></ProductForm>}
    </Layout>
  );
}
