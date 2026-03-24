import React from "react";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "24px", background: "#f7f7f7" }}>
        {children}
      </main>
    </div>
  );
}
