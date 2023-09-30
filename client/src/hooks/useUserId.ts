import { v4 as uuid } from "uuid";
import useLocalStorage from "./useLocalStorage";

const useUserId = () => {
  const [userId, setUserId] = useLocalStorage("userId", "");

  const defineUserId = () => {
    if (!userId) {
      const newUserId = uuid();
      setUserId(newUserId);
      return newUserId;
    }
  };

  return { userId, defineUserId };
};

export default useUserId;
