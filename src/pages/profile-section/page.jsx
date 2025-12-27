"use client";

import React from "react";
import HomePage from "./Home";
import withAuth from "@/components/hoc/withAuth"; // 🔹 correct import path

function Page() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

// ✅ Wrap with authentication HOC
export default withAuth(Page);
