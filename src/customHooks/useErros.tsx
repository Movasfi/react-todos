import { useState } from "react";

export function useError() {
  const [isError, setIsError] = useState<boolean>(false);
  return {
    isError,
    setIsError,
  };
}
