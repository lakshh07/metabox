import React from "react";
import Main from "./Main";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
import NftsSection from "./NftsSection";

function Marketplace() {
  return (
    <Box bg={"#19191D"}>
      <Navbar />
      <Main />
      <NftsSection />
    </Box>
  );
}

export default Marketplace;
