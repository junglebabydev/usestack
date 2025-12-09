"use client";

import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import EditProductForm from "@/components/edit-product-form";

export default function EditToolPage() {
  const params = useParams();

  const id = Number(params?.id);
  if (!id || Number.isNaN(id))
    return <div className="p-6">Invalid product id.</div>;

  return (
    <AdminLayout>
      <EditProductForm productId={id} />
    </AdminLayout>
  );
}
