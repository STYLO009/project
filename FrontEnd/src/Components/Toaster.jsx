// src/components/HealthToaster.jsx
import React from "react";
import { Toaster } from "react-hot-toast";

export default function HealthToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // ✅ Default styles for all toasts
        className: "animate-slide-in-right", // 👈 slide in from right animation
        style: {
          background: "#f0fdf4",
          color: "#166534",
          borderRadius: "10px",
          padding: "10px 16px",
          fontSize: "0.95rem",
          fontWeight: 500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        // ✅ Success style
        success: {
          className: "animate-fade-in", // 👈 fade-in animation for success
          iconTheme: {
            primary: "#16a34a",
            secondary: "#f0fdf4",
          },
          style: {
            background: "#dcfce7",
            color: "#166534",
          },
        },
        // ✅ Error style
        error: {
          className: "animate-fade-in", // 👈 fade-in animation for error
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fef2f2",
          },
          style: {
            background: "#fee2e2",
            color: "#991b1b",
          },
        },
      }}
    />
  );
}
