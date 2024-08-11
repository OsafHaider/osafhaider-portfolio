"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, createContext } from "react";

export const AdminContext = createContext();

export const Admin = ({ children }) => {
  const [admin, setAdmin] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
        });
        const result = await response.json();
        // Filter and set state only if the user role is "admin"
        const adminUser = result.data.find((user) => user.role === "admin");
        if (adminUser) {
          setAdmin(adminUser);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [Object.keys(admin).length === 0, pathname]);

  return (
    <AdminContext.Provider value={{ admin }}>{children}</AdminContext.Provider>
  );
};
