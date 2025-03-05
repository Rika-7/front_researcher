"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OfferPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
