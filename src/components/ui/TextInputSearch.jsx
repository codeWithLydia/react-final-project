import React from "react";
import { Input } from "@chakra-ui/react";

export const TextInputSearch = ({ value, changeFn, ...props }) => (
  <Input variant="filled" value={value} onChange={changeFn} {...props}></Input>
);
