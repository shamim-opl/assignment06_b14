"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#1b1b1e",
          color: "#f5f5f5",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: "13px",
        },
        success: { iconTheme: { primary: "#ccff00", secondary: "#0a0a0b" } },
      }}
    />
  );
}
