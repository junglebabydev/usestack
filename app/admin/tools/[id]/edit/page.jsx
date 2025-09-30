"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import EditProductForm from "@/components/edit-product-form";

export default function EditToolPage() {
  const params = useParams();
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("adminLoggedIn");
    if (adminStatus !== "true") {
      router.push("/");
      return;
    }
    setIsAdminLoggedIn(true);
  }, [router]);

  if (!isAdminLoggedIn) return null;

  const id = Number(params?.id);
  if (!id || Number.isNaN(id))
    return <div className="p-6">Invalid product id.</div>;

  return (
    <AdminLayout>
      <EditProductForm productId={id} />
    </AdminLayout>
  );
}
