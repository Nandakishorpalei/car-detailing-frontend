import React, { createContext } from "react";

export const FilterContext = createContext({
  value: "",
  onSelect: (v: string) => {},
  setOpen: (v: React.SetStateAction<boolean>) => {},
  open: false,
});
