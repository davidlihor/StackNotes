import { useState, useEffect } from "react";

const usePersist = (): [string | boolean, React.Dispatch<React.SetStateAction<string | boolean>>] => {
  const [persist, setPersist] = useState<string | boolean>(() => {
    const storedPersist = localStorage.getItem("persist");
    return storedPersist ? JSON.parse(storedPersist) : false;
  });

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
