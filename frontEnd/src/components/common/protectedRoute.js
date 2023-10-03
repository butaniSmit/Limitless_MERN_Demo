import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    const item = Cookies.get('AuthToken');
    setUser(item);
    if (!item) {
      router.push("/login");
     }
  }, [])
  return <>{user ? children : null}</>
};

export const PrivatetRoute = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState('AuthToken');

  useEffect(() => {
    const item = Cookies.get('AuthToken');
    setUser(item);
    if (item) {
      router.push("/");
    }
  }, [])
  return <>{user ? null : children}</>
};