"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";
import Login from "@/components/pages/login";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <Dashboard />
        </Layout>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}
