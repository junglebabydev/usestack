"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import NewProductForm from "@/components/new-product-form";

export default function NewToolPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem("adminLoggedIn");
    if (adminStatus !== "true") {
      router.push("/");
      return;
    }
    setIsAdminLoggedIn(true);
  }, [router]);

  if (!isAdminLoggedIn) return null;

  return (
      <NewProductForm />
  );
}
