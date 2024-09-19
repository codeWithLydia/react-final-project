import { Button as GeneralButton } from "@chakra-ui/react";

export const Button = ({ clickFn, ...props }) => {
  return (
    <GeneralButton
      colorScheme="#086e7d"
      size={{ base: "md", md: "lg" }}
      onClick={clickFn}
      {...props}
    >
      {props.children}
    </GeneralButton>
  );
};
