import React, { useState, useEffect } from "react";

function useTestHook(cost) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(total + cost);
  }, []);

  return total;
}

export default useTestHook;
