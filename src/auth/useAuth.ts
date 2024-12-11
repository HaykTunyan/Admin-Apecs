//  Auth System

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  return { isAuthenticated };
};
