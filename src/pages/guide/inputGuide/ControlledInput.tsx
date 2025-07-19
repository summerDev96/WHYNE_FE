import React, { useState } from "react";

import Input from "@/components/common/Input";

function ControlledInput() {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <Input
      id="controlled-input"
      type="text"
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
}

export default ControlledInput;
