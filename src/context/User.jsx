"use client";
import ky from "ky";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, createContext } from "react";

export const UserContext = createContext();

export const User = ({ children }) => {
  const [user, setUser] = useState({});
  const pathname = usePathname();

  async function getUser() {
    try {
      const req = await ky.get("/api/user/profile");
      const res = await req.json();
      if (res.success) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      getUser();
    }
  }, [pathname, user]); // Dependency array only includes pathname

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
