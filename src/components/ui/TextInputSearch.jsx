import React from "react";
import { Input } from "@chakra-ui/react";

export const TextInputSearch = ({ value, changeFn, ...props }) => (
  <Input variant="outline" value={value} onchange={changeFn} {...props}></Input>
);
