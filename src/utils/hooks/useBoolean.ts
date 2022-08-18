import { useState } from "react";

function useBoolean() {
  const [value, setValue] = useState<boolean>(false);

  const toggle = () => {
    setValue(!value);
  };

  return { toggle, value };
}

export default useBoolean;
