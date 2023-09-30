import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("userId");

    if (!stored) {
      const newUserId = uuid();
      setUserId(newUserId);
      localStorage.setItem("userId", newUserId);
    } else {
      setUserId(stored);
    }
  }, []);

  return userId;
};

export default useUserId;
