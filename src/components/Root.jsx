import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Root = () => {
  return (
    <Box>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </Box>
  );
};
