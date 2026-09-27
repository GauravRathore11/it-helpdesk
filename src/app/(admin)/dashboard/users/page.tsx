"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.roleName !== "ADMIN") {
        router.push("/dashboard");
      }
    } catch {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <p>Only Admin can see this page 👑</p>
    </div>
  );
}
