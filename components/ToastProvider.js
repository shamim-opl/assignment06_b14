"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{ top: 76, zIndex: 9999 }}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#1b1b1e",
          color: "#f5f5f5",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: "13px",
          fontWeight: 600,
          padding: "10px 16px",
        },
        success: { iconTheme: { primary: "#ccff00", secondary: "#0a0a0b" } },
      }}
    />
  );
}
